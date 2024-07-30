"use client";

import { useState } from 'react';
import LoginForm from '../../components/Login Components/LoginForm';
import SignupForm from '../../components/Login Components/SignupForm';
import Onboarding1 from '@/components/Onboarding/Onboarding1';

export default function JoinPage() {
    const [step, setStep] = useState(0);

    return (
        <div className="flex w-full h-full justify-center align-middle">
            <Onboarding1/>
        </div>
    )
}
