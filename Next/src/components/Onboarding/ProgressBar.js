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
            <div className="flex items-center w-full h-2 gap-5 rounded-full">
                {renderProgressSegments()}
            </div>
        </div>
    );
};