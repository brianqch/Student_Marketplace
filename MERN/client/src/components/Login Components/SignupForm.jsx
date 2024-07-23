import { useState } from 'react';
import supabase from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function SignupForm({ switchToLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignUp = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        const { error } = await supabase.auth.signUp({ email, password });

        if (error) {
            setError(error.message);
        } else {
            navigate('/dashboard');
        }

        setLoading(false);
    };

    return (
        <div className="bg-white rounded-lg py-5">
            <div className="container flex flex-col mx-auto bg-white rounded-lg pt-12 my-5">
                <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
                    <div className="flex items-center justify-center w-full lg:p-12">
                        <div className="flex items-center xl:p-10">
                            <form
                                onSubmit={handleSignUp}
                                className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl"
                            >
                                <h3 className="mb-3 text-4xl font-extrabold text-gray-900">Sign Up</h3>
                                <p className="mb-4 text-gray-700">Create your account</p>
                                <label htmlFor="email" className="mb-2 text-sm text-start text-gray-900">
                                    Email*
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex items-center w-full px-5 py-4 mb-7 mr-2 text-sm font-medium outline-none focus:bg-gray-400 placeholder-gray-700 bg-gray-200 text-gray-900 rounded-2xl"
                                />
                                <label htmlFor="password" className="mb-2 text-sm text-start text-gray-900">
                                    Create Password*
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-gray-400 placeholder-gray-700 bg-gray-200 text-gray-900 rounded-2xl"
                                />
                                <label htmlFor="confirmPassword" className="mb-2 text-sm text-start text-gray-900">
                                    Confirm Password*
                                </label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-gray-400 placeholder-gray-700 bg-gray-200 text-gray-900 rounded-2xl"
                                />
                                <button
                                    className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-indigo-600 focus:ring-4 focus:ring-indigo-100 bg-indigo-500"
                                >
                                    Sign Up
                                </button>
                                <p className="text-sm leading-relaxed text-gray-900">
                                    Already have an account?{' '}
                                    <a href="javascript:void(0)" className="font-bold text-gray-700" onClick={switchToLogin}>
                                        Sign In
                                    </a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
