"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FcGoogle,  } from "react-icons/fc";
import { FaListCheck } from "react-icons/fa6";
import supabase from "../../lib/supabase";

const Onboarding4 = ({ firstName, setFirstName, lastName, setLastName, email, setEmail, password, setPassword, setStep, setError, handlePrevious }) => {
    const router = useRouter();
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
        if (e.target.value.length === 0) {
            setFirstNameError('*Please enter a first name.');
        } else {
            setFirstNameError('');
        }
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
        if (e.target.value.length === 0) {
            setLastNameError('*Please enter a last name.');
        } else {
            setLastNameError('');
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (e.target.value.length === 0) {
            setEmailError('*Please enter an email.');
        } else {
            setEmailError('');
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (e.target.value.length === 0) {
            setPasswordError('*Please enter a password.');
        } else {
            setPasswordError('');
        }
    };



    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match.");
            return;
        }
        if (!agreedToTerms) {
            setError("You must agree to the terms.");
            return;
        }
        
        const { user, error } = await supabase.auth.signUp({
            email,
            password,
        }, {
            data: {
                first_name: firstName,
                last_name: lastName,
            }
        });

        if (error) {
            setError(error.message);
        } else {
            console.log("User signed up:", user);
            setStep(step + 1); // Move to the next step if needed
        }
    };

    const handleGoogleSignUp = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });

        if (error) {
            console.log(error);
            setError(error.message);
        }
    };

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user }, error: userError } = await supabase.auth.getUser();

            if (userError) {
                console.log(userError);
                setError(userError.message);
                return;
            }

            if (user) {
                if (user.email.endsWith('.edu')) {
                    console.log('User has a .edu email:', user.email);
                    router.push('/next-step');  // Redirect to the next step in the onboarding process
                } else {
                    console.log('User does not have a .edu email:', user.email);
                    setError('Please sign up with a .edu email address.');

                    // Sign out the user immediately
                    await supabase.auth.signOut();
                    setLoading(false);
                }
            }
        };

        // Run the check when the component mounts
        checkUser();
    }, [router]);
    
    

    return (
        <div className="flex flex-col">
            <h1 className="flex text-2xl font-rammetto gap-3 items-center"><FaListCheck/> Almost there...</h1>
            <p className="font-palanquin text-lg mt-2 mb-4">Let's make you an account!</p>
            
            <button onClick={handleGoogleSignUp} className="flex py-4 px-4 rounded border-gray-200 border items-center justify-center gap-3 w-full hover:shadow-md transition-colors duration-100 text-[#3c4043]">
            <FcGoogle />
            Sign up with Google (.edu)
            </button>
            <span className="flex items-center justify-center bg-white py-3 text-gray-400">or</span>
            
            <form onSubmit={handleSignUp} className="flex flex-col gap-3 w-full max-w-md">
                <input
                    type="text"
                    value={firstName}
                    placeholder="First Name *"
                    className={`p-0 py-2 border-0 border-b-2 border-black focus:ring-0 focus:bg-yamber focus:border-black transition-colors duration-200 font-palanquin ${firstNameError && `bg-red-200`}` }
                    onChange={handleFirstNameChange}
                />
                <input
                    type="text"
                    value={lastName}
                    placeholder="Last Name *"
                    className={`p-0 py-2 border-0 border-b-2 border-black focus:ring-0 focus:bg-yamber focus:border-black transition-colors duration-200 font-palanquin ${lastNameError && `bg-red-200`}` }
                    onChange={handleLastNameChange}
                />
                <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Edu Email *"
                    className={`p-0 py-2 border-0 border-b-2 border-black focus:ring-0 focus:bg-yamber focus:border-black transition-colors duration-200 font-palanquin ${emailError && `bg-red-200`}` }                />
                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Password *"
                    className={`p-0 py-2 border-0 border-b-2 border-black focus:ring-0 focus:bg-yamber focus:border-black transition-colors duration-200 font-palanquin ${passwordError && `bg-red-200`}` }                />
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password *"
                    className={`p-0 py-2 border-0 border-b-2 border-black focus:ring-0 focus:bg-yamber focus:border-black transition-colors duration-200 font-palanquin ${passwordError && `bg-red-200`}` }
                />
            </form>
            <div className="flex items-center py-5">
                    <input
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={() => setAgreedToTerms(!agreedToTerms)}
                        className="mr-2"
                    />
                    <span>By continuing, you agree to our terms and conditions.</span>
            </div>
            <br/>
            <div className="flex justify-between">
                <button type="submit" className=" bg-white px-4 py-2 w-fit text-nowrap border-black border-2 transition-colors duration-100" onClick={handlePrevious}>
                    BACK
                </button>
                {(firstName && lastName && email && password && confirmPassword) ? <button type="submit" className=" bg-blue-500 text-white px-4 py-2 w-fit text-nowrap border-black border-2 transition-colors duration-100">
                    LET'S GO
                </button> : <button type="submit" className=" bg-blue-200 text-white px-4 py-2 w-fit text-nowrap border-black border-2 transition-colors duration-100">
                    LET'S GO
                </button>}
            </div>
        </div>
    );
};

export default Onboarding4;
