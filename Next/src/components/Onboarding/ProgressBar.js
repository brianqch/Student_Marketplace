import React from "react";

export default function ProgressBar({ step, setStep, handleNext, handlePrevious }) {

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
            {step === 3 
            ? 
            <button type="submit" className=" bg-blue-500 text-white py-2 ml-5 w-fit text-nowrap px-3 border-black border-2">
                LET'S GO!
            </button> 
            : 
            <button onClick={handleNext} className="ml-2">
                &gt;
            </button>}
        </div>
    );
};