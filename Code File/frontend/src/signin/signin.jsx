import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("citizen");
  const roles = ["Citizen", "Admin"];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signing up with", name, email, password);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 to-blue-500 p-4">
      <div className="p-8 bg-white shadow-lg rounded-xl w-96 transform transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">Create an Account</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            placeholder="Full Name" 
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />

          <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />

          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />

          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)} 
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {roles.map((role, index) => (
              <option key={index} value={role.toLowerCase()}>{role}</option>
            ))}
          </select>

          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold transition duration-300 hover:bg-green-600 focus:ring-2 focus:ring-green-300"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account? 
          <Link to="/login" className="text-blue-600 font-semibold hover:underline ml-1">Login</Link>
        </p>
      </div>
    </div>
  );
}
