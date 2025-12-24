import React, { useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    category: "Roads",
    complaint: "",
    location: "", // textual location (landmark/area)
  });

  const [geoLocation, setGeoLocation] = useState({ lat: null, lng: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "phone" ? Number(value) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeoLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        alert("Unable to retrieve your location");
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      coordinates: {
        lat: geoLocation.lat,
        lng: geoLocation.lng,
      },
    };

    try {
      await axios.post("http://localhost:3000/complaint", dataToSend);
      alert("Complaint submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Error submitting complaint");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">Submit a Complaint</h2>

      <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required className="w-full border p-2 rounded" />
      <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required className="w-full border p-2 rounded" />
      <input type="number" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required className="w-full border p-2 rounded" />
      <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required className="w-full border p-2 rounded" />

      <select name="category" value={formData.category} onChange={handleChange} required className="w-full border p-2 rounded">
        <option value="Roads">Roads</option>
        <option value="Sanitation">Sanitation</option>
        <option value="Water Supply">Water Supply</option>
        <option value="Electricity">Electricity</option>
        <option value="Garbage Collection">Garbage Collection</option>
        <option value="Other">Other</option>
      </select>

      <textarea name="complaint" placeholder="Describe your complaint" value={formData.complaint} onChange={handleChange} required className="w-full border p-2 rounded" />

      <input type="text" name="location" placeholder="Location (e.g., Landmark, Area)" value={formData.location} onChange={handleChange} required className="w-full border p-2 rounded" />

      <button type="button" onClick={handleGetLocation} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
        Get Current Location
      </button>

      {geoLocation.lat && geoLocation.lng && (
        <MapContainer center={[geoLocation.lat, geoLocation.lng]} zoom={15} style={{ height: "300px", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[geoLocation.lat, geoLocation.lng]}>
            <Popup>Your Current Location</Popup>
          </Marker>
        </MapContainer>
      )}

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Submit Complaint
      </button>
    </form>
  );
};

export default ComplaintForm;
