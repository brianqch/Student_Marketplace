import { useState } from "react";
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

export default function LoginPage() {
    const [showSignup, setShowSignup] = useState(false);

    const switchToSignup = () => setShowSignup(true);
    const switchToLogin = () => setShowSignup(false);

    return showSignup ? (
        <SignupForm switchToLogin={switchToLogin} />
    ) : (
        <LoginForm switchToSignup={switchToSignup} />
    );
}
