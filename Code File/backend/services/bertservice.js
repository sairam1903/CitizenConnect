const axios = require("axios");

const HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english";
const HUGGINGFACE_API_TOKEN = process.env.HUGGINGFACE_API_TOKEN;

async function classifyPriority(text) {
  try {
    const response = await axios.post(
      HUGGINGFACE_API_URL,
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Hugging Face response:", response.data);
    console.log("Assigned Priority:", priority);
    console.log("HF API Token:", process.env.HUGGINGFACE_API_TOKEN);



    return response.data; // Array of labels + scores
  } catch (error) {
    console.error("Hugging Face API error:", error.response?.data || error.message);
    return null;
  }
}

module.exports = { classifyPriority };
