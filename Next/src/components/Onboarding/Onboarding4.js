import { useState } from 'react';
import { FcGoogle,  } from "react-icons/fc";
import { FaListCheck } from "react-icons/fa6";
import supabase from "../../lib/supabase";

const Onboarding4 = ({ firstName, setFirstName, lastName, setLastName, email, setEmail, password, setPassword, setStep, setError }) => {
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
            setError(error.message);
        }
    };

    return (
        <div className="flex flex-col">
            <h1 className="flex text-2xl font-bold gap-3 items-center"><FaListCheck/> Almost there...</h1>
            <p className="text-lg mt-2 mb-4">Let's make you an account!</p>
            
            <button onClick={handleGoogleSignUp} className="flex py-4 px-4 rounded border-gray-200 border items-center justify-center gap-3 w-full hover:shadow-md transition-colors duration-100 text-[#3c4043]">
            <FcGoogle />
            Sign up with Google
            </button>
            <span className="flex items-center justify-center bg-white py-3 text-gray-400">or</span>
            
            <form onSubmit={handleSignUp} className="flex flex-col gap-3 w-full max-w-md">
                <input
                    type="text"
                    value={firstName}
                    placeholder="First Name *"
                    className="p-0 py-2 border-0 border-b-2 border-black focus:ring-0 focus:bg-yamber focus:border-black transition-colors duration-200 font-palanquin"
                    onChange={handleFirstNameChange}
                />
                {firstNameError && <span className="text-red-500">{firstNameError}</span>}
                <input
                    type="text"
                    value={lastName}
                    placeholder="Last Name *"
                    className="p-0 py-2 border-0 border-b-2 border-black focus:ring-0 focus:bg-yamber focus:border-black transition-colors duration-200 font-palanquin"
                    onChange={handleLastNameChange}
                />
                {lastNameError && <span className="text-red-500">{lastNameError}</span>}
                <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Email *"
                    className="p-0 py-2 border-0 border-b-2 border-black focus:ring-0 focus:bg-yamber focus:border-black transition-colors duration-200 font-palanquin"
                />
                {emailError && <span className="text-red-500">{emailError}</span>}
                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Password *"
                    className="p-0 py-2 border-0 border-b-2 border-black focus:ring-0 focus:bg-yamber focus:border-black transition-colors duration-200 font-palanquin"
                />
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password *"
                    className="p-0 py-2 border-0 border-b-2 border-black focus:ring-0 focus:bg-yamber focus:border-black transition-colors duration-200 font-palanquin"
                />
                {passwordError && <span className="text-red-500">{passwordError}</span>}
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
        </div>
    );
};

export default Onboarding4;
