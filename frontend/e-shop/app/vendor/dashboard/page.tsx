'use client'; // 1. Client Component বানাচ্ছে

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // 2. next/navigation ব্যবহার

const Dashboard = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      router.push('/vendor/login'); // যদি লগইন না থাকে, redirect
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Vendor Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      {/* এখানে তুমি অন্য Dashboard components add করতে পারো */}
    </div>
  );
};

export default Dashboard;
