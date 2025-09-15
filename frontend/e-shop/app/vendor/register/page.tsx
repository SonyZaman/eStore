"use client"

import { useState } from "react";
import axios from "axios";
import Link from "next/link";  // Import the Link component

export default function VendorRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    storeName: "",
    contactNumber: "",
    address: "",
    storeDescription: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Make sure you're sending the request to the correct endpoint
      const response = await axios.post("http://localhost:3000/vendors", formData);
      setSuccess("Vendor registered successfully!");
      setError(null);  // Clear any previous errors
      setFormData({
        name: "",
        email: "",
        password: "",
        storeName: "",
        contactNumber: "",
        address: "",
        storeDescription: "",
      });
    } catch (err) {
      setError("Failed to register vendor.");
      setSuccess(null);  // Clear any success message
      console.error(err);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-5">
      <h1 className="text-2xl font-bold text-center mb-6">Vendor Registration</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Store Name</label>
          <input
            type="text"
            name="storeName"
            value={formData.storeName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Store Description</label>
          <input
            type="text"
            name="storeDescription"
            value={formData.storeDescription}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full  border-black bg-[#b16316]  no-underline text-white p-2 rounded"
        >
          Register
        </button>
      </form>

        <div className="mt-4 text-center">
        <p>
          Already have an account?{" "}
          <Link
            href="/vendor/login"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}



{/* <button
          type="submit"
          className="w-full  border-black bg-[#b16316]  no-underline text-white p-2 rounded"
        >
          Register
        </button> */}