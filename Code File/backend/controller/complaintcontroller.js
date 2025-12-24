const Complaint = require("../models/complaintmodel");
const nodemailer = require("nodemailer");

// ✅ Rule-based priority classification function
function determinePriority(complaintText) {
  const text = complaintText.toLowerCase();

  const highKeywords = ["sewage", "leak","damage","blockage", "fire","heavy", "electric", "accident","severe", "injury", "burst", "flood", "gas", "explosion",2,3,4,5];
  const mediumKeywords = ["garbage","please", "trash", "waste", "noise", "pothole", "smell", "stray", "unclean", "mosquito", "rats"];

  if (highKeywords.some(word => text.includes(word))) {
    return "High";
  } else if (mediumKeywords.some(word => text.includes(word))) {
    return "Medium";
  } else {
    return "Low";
  }
}

exports.createcomplaint = async (req, res, next) => {
  try {
    const { complaint: complaintText, name, email, category,coordinates } = req.body;

    // ✅ Use rule-based method instead of AI
    const priority = determinePriority(complaintText);

    const complaint = new Complaint({
      ...req.body,
      priority,
    });

    await complaint.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Complaint Registered - Citizen Connect",
      html: `
        <p>Hi <strong>${name}</strong>,</p>
        <p>Your complaint under <strong>${category}</strong> has been registered with priority <strong>${priority}</strong>.</p>
        <p><strong>Details:</strong> ${complaintText}</p>
        <p>We will address it as soon as possible based on priority.</p>
        <p>Thank you,<br/>Citizen Connect Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Confirmation email sent to:", email);

    res.status(201).json(complaint);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};



exports.getcomplaints = async (req, res, next) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getcomplaint = async (req, res, next) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    res.status(200).json(complaint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.resolveComplaint = async (req, res, next) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.status = "Viewed";
    await complaint.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: complaint.email,
      subject: "Your Complaint Has Been Viewed",
      text: `Dear user,

Your complaint titled "${complaint.complaint}" has been viewed by the admin.
Action will be taken very soon.

Thank you for using Citizen Connect.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Complaint marked as viewed and email sent." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
