import { useState } from 'react';
import supabase from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function LoginForm({ switchToSignup }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignIn = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({ email, password });

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
                                onSubmit={handleSignIn}
                                className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl"
                            >
                                <h3 className="mb-3 text-4xl font-extrabold text-gray-900">Sign In</h3>
                                <p className="mb-4 text-gray-700">Enter your email and password</p>
                                <a
                                    className="flex items-center justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-gray-900 bg-gray-300 hover:bg-gray-400 focus:ring-4 focus:ring-gray-300"
                                    href="#"
                                >
                                    <img
                                        className="h-5 mr-2"
                                        src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                                        alt=""
                                    />
                                    Sign in with Google
                                </a>
                                <div className="flex items-center mb-3">
                                    <hr className="h-0 border-b border-solid border-gray-500 grow" />
                                    <p className="mx-4 text-gray-600">or</p>
                                    <hr className="h-0 border-b border-solid border-gray-500 grow" />
                                </div>
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
                                    Password*
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-gray-400 placeholder-gray-700 bg-gray-200 text-gray-900 rounded-2xl"
                                />
                                <div className="flex flex-row justify-between mb-8">
                                    <label className="relative inline-flex items-center mr-3 cursor-pointer select-none">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-5 h-5 bg-white border-2 rounded-sm border-gray-500 peer peer-checked:border-0 peer-checked:bg-indigo-500">
                                            <img
                                                src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/icons/check.png"
                                                alt="tick"
                                            />
                                        </div>
                                        <span className="ml-3 text-sm font-normal text-gray-900">Keep me logged in</span>
                                    </label>
                                    <a href="javascript:void(0)" className="mr-4 text-sm font-medium text-indigo-500">
                                        Forget password?
                                    </a>
                                </div>
                                <button className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-indigo-600 focus:ring-4 focus:ring-indigo-100 bg-indigo-500">
                                    Sign In
                                </button>
                                <p className="text-sm leading-relaxed text-gray-900">
                                    Not registered yet?{' '}
                                    <a href="javascript:void(0)" className="font-bold text-gray-700" onClick={switchToSignup}>
                                        Create an Account
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
