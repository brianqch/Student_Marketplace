import React from "react";

const ProgressBar = ({ step, setStep, totalSteps }) => {
    const handleNext = () => {
        if (step < 4) {
            setStep(step + 1);
        }
    };

    const handlePrevious = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    const renderProgressSegments = () => {
        const segments = [];
        for (let i = 0; i < 4; i++) {
            segments.push(
                <div
                    key={i}
                    className={`h-full transition-all duration-300 ${i <= step ? 'bg-blue-500' : 'bg-gray-200'} rounded-full`}
                    style={{ width: `${100 / 4}%` }}
                ></div>
            );
        }
        console.log(segments);
        return segments;
    };

    return (
        <div className="flex items-center justify-center w-full h-8 mt-4">
            <button onClick={handlePrevious} className="mr-2">
                &lt;
            </button>
            <div className="flex items-center w-full h-2 gap-5 rounded-full">
                {renderProgressSegments()}
            </div>
            <button onClick={handleNext} className="ml-2">
                &gt;
            </button>
        </div>
    );
};

export default ProgressBar;
