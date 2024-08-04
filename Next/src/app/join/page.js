"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import Onboarding1 from "../../components/Onboarding/Onboarding1";
import Onboarding2 from "../../components/Onboarding/Onboarding2";
import Onboarding3 from "../../components/Onboarding/Onboarding3";
import Onboarding4 from "../../components/Onboarding/Onboarding4";
import ProgressBar from "../../components/Onboarding/ProgressBar";

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
    type: "spring",
    damping: 10,
    stiffness: 100,
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
    const [firstName, setFirstName] = useState('');
    const [school, setSchool] = useState('');
    const [error, setError] = useState('');
    const [area, setArea] = useState('');
    const previousStep = usePrevious(step) ?? step;

    // Determine the direction based on step indices
    const direction = step > previousStep ? 'forward' : 'back';

    // Array of onboarding components
    const onboardingComponents = [
        <Onboarding1 key="onboarding1" step={step} setStep={setStep} firstName={firstName} setFirstName={setFirstName} error={error} setError={setError}/>,
        <Onboarding2 key="onboarding2" step={step} setStep={setStep} firstName={firstName} school={school} setSchool={setSchool} error={error} setError={setError} />,
        <Onboarding3 key="onboarding3" step={step} setStep={setStep} school={school} area={area} setArea={setArea} error={error} setError={setError}/>,
        <Onboarding4 key="onboarding4" step={step} setStep={setStep} />,
    ];

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
                className="w-full flex justify-center items-center"
            >
                {onboardingComponents[step]}
            </motion.div>
            <div className="absolute bottom-20 w-[80%]">
                <ProgressBar step={step} setStep={setStep} handleNext={handleNext} handlePrevious={handlePrevious} error={error} setError={setError} />
            </div>
        </div>
    );
}
