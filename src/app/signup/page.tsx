'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Signup() {
  const [user, setUser] = useState({
    email: '',
    password: '',
    username: '',
  });

  const router = useRouter();

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const signup = async () => {
    try {
      setLoading(true);
      const response = await axios.post('api/users/signup', user);
      console.log('Signup success', response.data);
      toast.success('Signup successful');
      router.push('/login');
    } catch (error) {
      console.log('Signup failed', error);
      toast.error('Signup failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password && user.username));
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Sign Up</h1>
      <hr className="w-full mb-6" />

      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <label htmlFor="username" className="block mb-2 font-semibold text-black">Username</label>
        <input
         className="text-black"
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Enter your username"
        
        />

        <label htmlFor="email" className="block mt-4 mb-2 font-semibold text-black">Email</label>
        <input
        className="text-black "
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter your email"
         
        />

        <label htmlFor="password" className="block mt-4 mb-2 font-semibold text-black">Password</label>
        <input
           className="text-black "
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter your password"
         
        />

        <button
          onClick={signup}
          className={`w-full py-3 mt-6 rounded-md bg-blue-500 text-white font-semibold ${buttonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
          disabled={buttonDisabled}
        >
          {loading ? 'Processing...' : 'Sign Up'}
        </button>

        <p className="mt-4 text-sm text-center text-gray-600">Already have an account? <Link href="/login" className="text-blue-500">Log in here</Link></p>
      </div>
    </div>
  );
}
