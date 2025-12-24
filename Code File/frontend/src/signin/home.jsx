import React from "react";
import { Link } from "react-router-dom";
import Login from "./login";
import SignIn from "./signin";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 to-blue-500 relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute w-72 h-72 bg-blue-300 rounded-full opacity-50 top-10 left-10 blur-3xl"></div>
      <div className="absolute w-80 h-80 bg-blue-400 rounded-full opacity-40 bottom-10 right-10 blur-3xl"></div>
      
      <div className="text-center bg-white shadow-2xl rounded-2xl p-10 w-full max-w-lg border border-gray-300 relative z-10">
        <h1 className="text-4xl font-extrabold text-blue-800 drop-shadow-lg">Welcome to Citizen Connect</h1>
        <p className="mt-3 text-gray-700 text-lg">A platform to voice your concerns and make a difference!</p>
        
        <div className="mt-8 space-y-4">
          <Link to="/login" className="block w-full py-3 px-5 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 rounded-xl shadow-lg transform hover:scale-105 transition-all">Login</Link>
          <Link to="/signin" className="block w-full py-3 px-5 text-lg font-semibold text-blue-700 border border-blue-700 hover:bg-blue-100 rounded-xl shadow-lg transform hover:scale-105 transition-all">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}