// src/components/NewNavbar.js
"use client"; // Mark this component as a client component

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Updated import for useRouter in Next.js 13+
import supabase from '../lib/supabase';
import Link from 'next/link'; // Use Link component for client-side navigation

export default function NewNavbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/'); // Redirect to home page after logout

    setUser(null);
  };

  const handleRedirectToDashboard = () => {
    if (user) {
      router.push('/'); // Redirect to dashboard if user is logged in
    } else {
      router.push('/'); // Redirect to home page if user is not logged in
    }
  };

  return (
    <nav>
      <div>
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-8">
            <h1 
              className="text-xl lg:text-2xl font-bold cursor-pointer" 
              onClick={handleRedirectToDashboard}
            >
              Student Marketplace
            </h1>
            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/dev" className="hover:text-indigo-600 text-gray-700">Dev</Link>
                <Link href="/items/create" className="hover:text-indigo-600 text-gray-700">Sell</Link>
                <Link href="#" className="hover:text-indigo-600 text-gray-700">Profile</Link>
                <button 
                  onClick={handleLogout} 
                  className="hover:text-indigo-600 text-gray-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden md:flex justify-around space-x-4">
                <Link href="/" className="hover:text-indigo-600 text-gray-700">Home</Link>
                <Link href="#" className="hover:text-indigo-600 text-gray-700">About Us</Link>
              </div>
            )}
          </div>
          {!user && (
            <div className="flex space-x-4 items-center">
              <Link 
                href="/login" 
                className="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-500 text-sm"
              >
                GET STARTED
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
