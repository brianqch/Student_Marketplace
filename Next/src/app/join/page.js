"use client";

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion';
// import Onboarding1 from "../../components/Onboarding/Onboarding1";
// import Onboarding2 from "../../components/Onboarding/Onboarding2";
// import Onboarding3 from "../../components/Onboarding/Onboarding3";
// import Onboarding4 from "../../components/Onboarding/Onboarding4";
import ProgressBar from "../../components/Onboarding/ProgressBar";

const LazyOnboarding1 = dynamic(() => import('../../components/Onboarding/Onboarding1'));
const LazyOnboarding2 = dynamic(() => import('../../components/Onboarding/Onboarding2'));
const LazyOnboarding3 = dynamic(() => import('../../components/Onboarding/Onboarding3'));
const LazyOnboarding4 = dynamic(() => import('../../components/Onboarding/Onboarding4'));

const variants = {
    initial: (direction) => ({
        opacity: 0,
        y: direction === 'forward' ? '100%' : '-100%',
    }),
    animate: {
        opacity: 1,
        y: '0%',
    },
    exit: (direction) => ({
        opacity: 0,
        y: direction === 'forward' ? '-100%' : '100%',
    }),
};

const pageTransition = {
    type: "easeInOut",
    duration: 0.55
};

const usePrevious = (val) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = val;
    });
    return ref.current;
};

export default function JoinPage() {
    const [step, setStep] = useState(0);
    const [activeButton, setActiveButton] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [school, setSchool] = useState('');
    const [error, setError] = useState('');
    const [area, setArea] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const previousStep = usePrevious(step) ?? step;

    // Determine the direction based on step indices
    const direction = step > previousStep ? 'forward' : 'back';

    const handleNext = () => {
        if (firstName.length === 0) {
            setError("*Please enter your first name.");
        } else if (school.length === 0) {
            setError("*Please choose a school.");
        } else if (error.length === 0 && step < onboardingComponents.length - 1) { // Allow forward navigation if less than last index
            setStep(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (step > 0) { // Allow backward navigation if greater than 0
            setStep(prev => prev - 1);
        }
    };

    // Array of onboarding components
    const onboardingComponents = [
        <LazyOnboarding1 key="onboarding1" step={step} setStep={setStep} firstName={firstName} setFirstName={setFirstName} error={error} setError={setError} activeButton={activeButton} setActiveButton={setActiveButton}/>,
        <LazyOnboarding2 key="onboarding2" step={step} setStep={setStep} firstName={firstName} school={school} setSchool={setSchool} error={error} setError={setError} handlePrevious={handlePrevious} />,
        <LazyOnboarding3 key="onboarding3" step={step} setStep={setStep} school={school} area={area} setArea={setArea} error={error} setError={setError} handlePrevious={handlePrevious}/>,
        <LazyOnboarding4 key="onboarding4" step={step} setStep={setStep} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} error={error} setError={setError} email={email} setEmail={setEmail} password={password} setPassword={setPassword} handlePrevious={handlePrevious}/>,
    ];

    return (
        <div className="relative flex flex-col w-full h-screen justify-center items-center -mt-16">
            <motion.div
                key={step} // Ensure this key is unique to force re-render
                custom={direction}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
                className="w-full h-[90%] flex flex-col justify-center items-center"
            >
                {onboardingComponents[step]}
            </motion.div>
            <div className="w-full sm:w-[80%] h-[10%]">
                <ProgressBar step={step} setStep={setStep} handleNext={handleNext} handlePrevious={handlePrevious} error={error} setError={setError} />
            </div>
        </div>
    );
}
