'use client';  // Ensure this is a Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Header from '../../../components/header';  // Import the Header component

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in both fields');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });

      localStorage.setItem('access_token', response.data.access_token);  // Store JWT token
      localStorage.setItem('vendor_email', email);  // Store email in localStorage

      router.push('/vendor/verify-otp');  // Redirect to dashboard

    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (

    <>
    <Header/>
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Vendor Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full  border-black bg-[#b16316]  no-underline text-white p-2 rounded"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
          {/* Create New Vendor Link */}
        <div className="mt-4 text-center">
          <a
            onClick={() => router.push('/vendor/register')} // Redirect to Create Vendor page
            className="text-blue-500 cursor-pointer hover:text-blue-700"
          >
            Create New Vendor
          </a>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
