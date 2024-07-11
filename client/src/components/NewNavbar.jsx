import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';

export default function NewNavbar() {
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

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
        navigate('/');

        setUser(null);
    };

    const handleRedirectToDashboard = () => {
        navigate('/dashboard');
    }

    return (
        <nav>
            <div>
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center space-x-8">
                        <h1 className="text-xl lg:text-2xl font-bold cursor-pointer" onClick={handleRedirectToDashboard}>Student Marketplace</h1>
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <a href="/dev" className="hover:text-indigo-600 text-gray-700">Dev</a>
                                <a href="/createNewItem" className="hover:text-indigo-600 text-gray-700">Sell</a>
                                <a href="#" className="hover:text-indigo-600 text-gray-700">Profile</a>
                                

                                <button onClick={handleLogout} className="hover:text-indigo-600 text-gray-700">Logout</button>
                            </div>
                        ) : (
                            <div className="hidden md:flex justify-around space-x-4">
                                <a href="#" className="hover:text-indigo-600 text-gray-700">Home</a>
                                <a href="#" className="hover:text-indigo-600 text-gray-700">About Us</a>
                            </div>
                        )}
                    </div>
                    {!user && (
                        <div className="flex space-x-4 items-center">
                            <a href="/login" className="text-gray-800 text-sm">LOGIN</a>
                            <a href="/signup" className="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-500 text-sm">SIGNUP</a>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};