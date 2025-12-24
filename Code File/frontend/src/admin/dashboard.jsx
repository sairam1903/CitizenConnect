import { useEffect, useState } from "react";
import axios from "axios";

const priorityColors = {
  High: "bg-red-500 text-white",
  Medium: "bg-yellow-500 text-black",
  Low: "bg-green-500 text-white",
};

export default function Dashboard() {
  const [complaints, setComplaints] = useState([]);
  const [selectedTab, setSelectedTab] = useState("all");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get("http://localhost:3000/complaint");
        setComplaints(response.data);
      } catch (err) {
        console.error("Failed to fetch complaints:", err);
      }
    };

    fetchComplaints();
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getFullYear()}`;
  };

  // Normalize priority string to match keys in priorityColors
  const getPriorityClass = (priority) => {
    if (!priority) return "bg-gray-300 text-black";
    const key = priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase();
    return priorityColors[key] || "bg-gray-300 text-black";
  };

  // Filter complaints by selected priority tab, or show all if 'all'
  const filteredComplaints = complaints.filter((complaint) => {
    if (selectedTab === "all") return true;
    if (!complaint.priority) return false;
    return complaint.priority.toLowerCase() === selectedTab.toLowerCase();
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin Complaint Dashboard</h1>

      <div className="flex gap-4 mb-4">
        {["all", "high", "medium", "low"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-lg ${
              selectedTab === tab
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-black"
            }`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab === "all"
              ? "All Complaints"
              : `${tab.charAt(0).toUpperCase() + tab.slice(1)} Priority`}
          </button>
        ))}
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">Category</th>
              <th className="p-2">Complaint</th>
              <th className="p-2">Location</th>
              <th className="p-2">Priority</th>
              <th className="p-2">Date</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredComplaints.length > 0 ? (
              filteredComplaints.map((complaint) => (
                <tr key={complaint._id} className="border-b">
                  <td className="p-2">{complaint.category}</td>
                  <td className="p-2">{complaint.complaint}</td>
                  <td className="p-2">{complaint.location}</td>
                  <td className={`p-2 rounded ${getPriorityClass(complaint.priority)}`}>
                    {complaint.priority || "Unassigned"}
                  </td>
                  <td className="p-2">{formatDate(complaint.createdAt)}</td>
                  <td className="p-2">
                    <button
                      onClick={() =>
                        (window.location.href = `/complaints/${complaint._id}`)
                      }
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No complaints found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
