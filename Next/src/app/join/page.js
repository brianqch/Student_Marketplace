"use client";

import { useState } from 'react';
import LoginForm from '../../components/Login Components/LoginForm';
import SignupForm from '../../components/Login Components/SignupForm';
import ProgressBar from '@/components/Onboarding/ProgressBar';
import Onboarding1 from '@/components/Onboarding/Onboarding1';
import Onboarding2 from '@/components/Onboarding/Onboarding2';
import Onboarding3 from '@/components/Onboarding/Onboarding3';
import Onboarding4 from '@/components/Onboarding/Onboarding4';

export default function JoinPage() {
    const [step, setStep] = useState(0);
    const [name, setName] = useState("");
    const [school, setSchool] = useState("");

    const renderOnboardingComponent = () => {
        switch (step) {
            case 0:
                return <Onboarding1 step={step} setStep={setStep} name={name} setName={setName} />;
            case 1:
                return <Onboarding2 step={step} setStep={setStep} name={name} setSchool={setSchool} />;
            case 2:
                return <Onboarding3 step={step} setStep={setStep}  />;
            case 3:
                return <Onboarding4 step={step} setStep={setStep}  />;
            default:
                return <Onboarding1 step={step} setStep={setStep}  />;
        }
    };

    return (
        <div className="flex flex-col w-full h-screen justify-center items-center">
            {renderOnboardingComponent()}
            <ProgressBar step={step} setStep={setStep}/>
        </div>
    )
}
