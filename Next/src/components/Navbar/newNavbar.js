"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '../../lib/supabase';
import Link from 'next/link';
import { IoPersonOutline } from "react-icons/io5";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GoBell } from "react-icons/go";
import SearchBar from './SearchBar';
import Modal from './Modal'; // Import a modal component

export default function NewNavbar() {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
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
    router.push(user ? '/' : '/');
  };

  const handleRedirectToCreateListing = () => {
    router.push(user ? '/items/create' : '/');
  };

  const handleSignInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) {
      console.error('OAuth sign-in error:', error);
    }
  };

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (data?.session?.user) {
        const email = data.session.user.email;
        
        if (email && email.endsWith('.edu')) {
          setUser(data.session.user);
        } else {
          await supabase.auth.signOut();
          setShowModal(true); // Show modal if email is not valid
        }
      }
    };

    handleOAuthCallback();
  }, [router]);

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
              <Link href="/notifications">
                <GoBell className="h-7 w-7" />
              </Link>
              <Link href="/cart">
                <AiOutlineShoppingCart className="h-7 w-7" />
              </Link>
              <Link href="/profile">
                <IoPersonOutline className="h-7 w-7" />
              </Link>
              {/* Divider */}
              <div className="h-7 border-l-2 border-gray-300 mx-2"></div>
              {/* Divider */}
              <button className="border-2 border-slate-950 bg-[#432d2d] p-2 text-white text-sm sm:text-base min-w-[100px]" onClick={handleRedirectToCreateListing}>SELL NOW</button>
              <button onClick={handleLogout} className="border-2 border-slate-950 bg-[#432d2d] p-2 text-white text-sm sm:text-base min-w-[100px]">Logout</button>
            </>
          ) : (
            <>
              <div className="hidden items-center md:flex space-x-4">
                <Link href="#" className="hover:text-indigo-600 text-gray-700">About Us</Link>
                {/* Divider */}
                <div className="h-7 border-l-2 border-gray-300 mx-2"></div>
                {/* Divider */}
                <Link href="/login" className="hover:text-indigo-600 text-gray-700">Log In</Link>
                <button 
  className="border-2 border-slate-950 bg-[#432d2d] text-white flex items-center justify-center whitespace-nowrap min-w-[100px] px-4 py-2 text-sm sm:text-base"
  onClick={handleSignInWithGoogle}
>
  SIGN UP
</button>


              </div>
              {/* <div className="flex space-x-4 items-center md:hidden">
                <Link href="/login" className="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-500 text-sm">GET STARTED</Link>
              </div> */}
            </>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2 className="text-lg font-semibold">Access Denied</h2>
          <p className="mt-2">Only .edu email addresses are allowed to sign in. Please use a valid .edu email.</p>
          <button
            className="mt-4 px-4 py-2 bg-uni-blue text-white"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </Modal>
      )}
    </nav>
  );
}
