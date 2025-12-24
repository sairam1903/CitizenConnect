import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with", email, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700 relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute w-72 h-72 bg-blue-400 rounded-full opacity-50 top-10 left-10 blur-3xl"></div>
      <div className="absolute w-80 h-80 bg-blue-500 rounded-full opacity-40 bottom-10 right-10 blur-3xl"></div>
      
      <div className="p-8 bg-white shadow-2xl rounded-2xl w-full max-w-sm border border-gray-300 relative z-10">
        <h2 className="text-3xl font-extrabold text-blue-900 drop-shadow-lg text-center">Login</h2>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" onClick={() => {
    // Later you can validate and send data here before navigation
    navigate("/complaint"); // Replace with your actual dashboard route
  }} className="w-full py-3 px-5 text-lg font-semibold text-white bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950 rounded-lg shadow-lg transform hover:scale-105 transition-all">
            Login
          </button>
        </form>
        <p className="text-sm mt-4 text-center text-gray-700">
          Don't have an account? {" "}
          <Link to="/signin"  className="text-blue-600 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}