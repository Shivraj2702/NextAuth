'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const router = useRouter();

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = async () => {
    try {
      setLoading(true);
      const response = await axios.post('api/users/login', user);
      console.log('Login success', response.data);
      toast.success('Login successful');
      router.push('/profile');
    } catch (error) {
      console.log('Login failed', error);
      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email.length > 0 && user.password.length > 0));
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Welcome back!</h1>

      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <label htmlFor="email" className="block mb-2 font-semibold">Email</label>
        <input
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter your email"
          className="input-field"
        />

        <label htmlFor="password" className="block mt-4 mb-2 font-semibold">Password</label>
        <input
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter your password"
          className="input-field"
        />

        <button
          onClick={login}
          className={`w-full py-3 mt-6 rounded-md bg-blue-500 text-white font-semibold ${buttonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
          disabled={buttonDisabled}
        >
          {loading ? 'Processing...' : 'Login'}
        </button>

        <p className="mt-4 text-sm text-center text-gray-600">Don't have an account? <Link href="/signup" className="text-blue-500">Sign up here</Link></p>
      </div>
    </div>
  );
}
