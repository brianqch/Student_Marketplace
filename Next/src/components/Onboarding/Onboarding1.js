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
                <span className="flex font-rammetto text-2xl gap-5 items-center"> Hey there,
                    <input className="border-0 border-b-4 border-dashed border-black p-0 focus:outline-none" type="text" value={name} onChange={handleNameChange} placeholder="First name" />!
                </span>
                <span className="font-palanquin">What can we help out with?</span>
                <br/>
                <div className="flex gap-5 justify-between items-center font-palanquin">
                    <button className="flex grow items-center px-4 py-2 border border-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={handleNextStep}>
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                        Buying
                    </button>
                    <button className="flex grow items-center px-4 py-2 border border-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={handleNextStep}>
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                        Selling
                    </button>

                </div>
            </div>
        </>
    )
}