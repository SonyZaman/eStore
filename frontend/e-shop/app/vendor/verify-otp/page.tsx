'use client';  // Ensure this is a Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Header from '../../../components/header';  // Import the Header component

const VerifyOtp = () => {
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = localStorage.getItem('vendor_email');  // Retrieve the email from localStorage
    console.log(email);
    if (!email) {
      setError('Email not found. Please log in again.');
      return;
    }

    if (!otp) {
      setError('Please enter the OTP');
      return;
    }

   

    try {
      setLoading(true);
      setError('');

      const response = await axios.post('http://localhost:3000/auth/verify-otp', {
        email,
        otp,
      });

      localStorage.setItem('access_token', response.data.token);  // Store the token
      router.push('/vendor/dashboard');  // Redirect to the vendor dashboard

    } catch (err) {
      setError('Invalid OTP');
    } finally {
      setLoading(false);
    }


     
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md p-8">
          <h1 className="text-2xl font-bold text-center mb-6">Verify OTP</h1>
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">OTP</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your OTP"
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full border-black bg-[#b16316] no-underline text-white p-2 rounded"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default VerifyOtp;
