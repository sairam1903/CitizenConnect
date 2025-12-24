import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issue in React-Leaflet:
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function ComplaintDetail() {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/complaint/${id}`);
        setComplaint(res.data);
      } catch (error) {
        console.error("Error fetching complaint:", error);
      }
    };
    fetchComplaint();
  }, [id]);

  const handleResolve = async () => {
    try {
      await axios.post(`http://localhost:3000/complaint/${id}/resolve`);
      alert("Email sent to user. Complaint marked as viewed.");
    } catch (err) {
      console.error("Failed to resolve complaint:", err);
    }
  };

  if (!complaint) return <div className="p-6 text-center">Loading...</div>;

  // Format date nicely
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getFullYear()} ${date.getHours().toString().padStart(2,"0")}:${date.getMinutes().toString().padStart(2,"0")}`;
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800 border-b pb-3">Complaint Details</h1>

      <div className="space-y-4 text-gray-700">
        {/* Existing details */}
        <div>
          <h2 className="font-semibold text-lg">Category</h2>
          <p className="text-gray-900">{complaint.category}</p>
        </div>

        <div>
          <h2 className="font-semibold text-lg">Complaint Description</h2>
          <p className="whitespace-pre-wrap">{complaint.complaint}</p>
        </div>

        <div>
          <h2 className="font-semibold text-lg">Location (Address)</h2>
          <p>{complaint.location}</p>
        </div>

        {/* Leaflet Map */}
        {complaint.coordinates && complaint.coordinates.lat && complaint.coordinates.lng && (
          <div className="my-6 h-64 rounded overflow-hidden">
            <MapContainer
              center={[complaint.coordinates.lat, complaint.coordinates.lng]}
              zoom={15}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[complaint.coordinates.lat, complaint.coordinates.lng]}>
                <Popup>{complaint.location}</Popup>
              </Marker>
            </MapContainer>
          </div>
        )}

        <div>
          <h2 className="font-semibold text-lg">Priority</h2>
          <p
            className={`inline-block px-3 py-1 rounded text-white ${
              complaint.priority === "High"
                ? "bg-red-600"
                : complaint.priority === "Medium"
                ? "bg-yellow-500 text-black"
                : "bg-green-600"
            }`}
          >
            {complaint.priority}
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-lg">Status</h2>
          <p>{complaint.status || "Pending"}</p>
        </div>

        <div>
          <h2 className="font-semibold text-lg">Email</h2>
          <p className="break-all">{complaint.email}</p>
        </div>

        <div>
          <h2 className="font-semibold text-lg">Name</h2>
          <p>{complaint.name}</p>
        </div>

        <div>
          <h2 className="font-semibold text-lg">Date Submitted</h2>
          <p>{formatDate(complaint.createdAt)}</p>
        </div>
      </div>

      <button
        onClick={handleResolve}
        className="mt-8 w-full bg-green-600 hover:bg-green-700 transition-colors duration-300 text-white py-3 rounded-lg font-semibold shadow-md"
      >
        Mark as Resolved
      </button>
    </div>
  );
}
