import React from "react";

export default function Onboarding1({ step, setStep, name, setName }) {

    const handleNextStep = () => {
        setStep(step + 1);
        console.log(step);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    return (
        <>
            <div className="flex flex-col justify-center">
                <span>Hey there,  <input type="text" value={name} onChange={handleNameChange} placeholder="First name" /></span>
                <span>What can we help out with?</span>
                <div className="flex justify-between items-center">
                    <button onClick={handleNextStep}>Buying</button>
                    <button onClick={handleNextStep}>Selling</button>
                </div>
            </div>
        </>
    )
}