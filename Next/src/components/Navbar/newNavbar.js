// src/components/NewNavbar.js
"use client"; // Mark this component as a client component

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Updated import for useRouter in Next.js 13+
import supabase from '../../lib/supabase';
import Link from 'next/link'; // Use Link component for client-side navigation
import { IoPersonOutline } from "react-icons/io5";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GoBell } from "react-icons/go";

import SearchBar from './SearchBar';



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

  const handleRedirectToCreateListing = () => {
    if (user) {
      router.push('/items/create'); // Redirect to dashboard if user is logged in
    } else {
      router.push('/'); // Redirect to home page if user is not logged in
    }
  };

  return (
    <nav className="relative px-14 z-40">

        <div className="flex justify-between h-16 items-center px-10 rounded-full border-2 border-gray-200 bg-white bg-opacity-50">
  
          {/* Left */}
          <div className="flex items-center space-x-2 max-w-3xl w-full">
            <h1
              className="font-rammetto text-2xl text-uni-blue font-bold cursor-pointer"
              onClick={handleRedirectToDashboard}
            >
              UNIMART
            </h1>
            <SearchBar />
          </div>

          
  
          {/* Right */}
          <div className="items-center space-x-4 hidden sm:flex">
            {user ? (
              <>
                <Link href="/notifications" className="">
                <GoBell className="h-7 w-7" />
              </Link>
              <Link href="/cart" className="">
                <AiOutlineShoppingCart className="h-7 w-7" />
              </Link>
              <Link href="/profile" className="">
                <IoPersonOutline className="h-7 w-7" />
              </Link>
                {/* Divider */}
                <div className="h-7 border-l-2 border-gray-300 mx-2"></div> 
                {/* Divider */}
                <button className="border-2 border-slate-950 bg-[#432d2d] p-2 text-white text-sm sm:text-base min-w-[100px]" onClick={handleRedirectToCreateListing}>SELL NOW</button>



                {/* <Link href="/dev" className="hover:text-indigo-600 text-gray-700">Dev</Link>
                <Link href="/items/create" className="hover:text-indigo-600 text-gray-700">Sell</Link>
                <button
                  onClick={handleLogout}
                  className="hover:text-indigo-600 text-gray-700"
                >
                  Logout
                </button> */}
              </>
            ) : (
              <>
                <div className="hidden items-center md:flex space-x-4">
                {/* <GoBell className="h-7 w-7" />
                <AiOutlineShoppingCart className="h-7 w-7" />
                <IoPersonOutline className="h-7 w-7" /> */}
                  {/* <Link href="/" className="hover:text-indigo-600 text-gray-700">Home</Link> */}
                  {/* <Link href="/shop" className="hover:text-indigo-600 text-gray-700">Shop</Link> */}
                  <Link href="#" className="hover:text-indigo-600 text-gray-700">About Us</Link>
                {/* Divider */}
                <div className="h-7 border-l-2 border-gray-300 mx-2"></div> 
                {/* Divider */}
                <Link href="/" className="hover:text-indigo-600 text-gray-700">Log In</Link>
                <button className="border-2 border-slate-950 bg-[#432d2d] p-2 text-white" >SIGN UP</button>
                </div>
                <div className="flex space-x-4 items-center md:hidden">
                  <Link
                    href="/login"
                    className="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-500 text-sm"
                  >
                    GET STARTED
                  </Link>
                </div>
              </>
            )}
          </div>
  
        </div>

    </nav>
  );
  
}
