"use client";
import React, { useState } from "react";
import { PiHandWavingFill } from "react-icons/pi";
import { AiOutlineShop, AiOutlineShoppingCart } from "react-icons/ai";

export default function Onboarding1({ step, setStep, firstName, setFirstName, error, setError, activeButton, setActiveButton }) {

    const handleClick = (buttonId) => {
        setActiveButton(buttonId);
    };


    const handleNextStep = () => {
        if (firstName.length === 0) {
            setError("*Please enter your first name.")
        } else {
            setError('');
            setStep(step + 1);
        }
    };

    const handleNameChange = (e) => {
        setFirstName(e.target.value);
        if (e.target.value.length > 0) {
            setError('');
        }
    };

    return (
        <>
            <div className="flex flex-col justify-center">
                <div className="flex flex-col sm:flex-row gap-3">
                    <PiHandWavingFill className="w-10 h-10" />
                    <span className="flex flex-col sm:flex-row font-rammetto text-2xl gap-5 sm:items-center min-w-fit text-nowrap">Hey there,
                        <input className="text-2xl border-0 border-b-4 border-dashed border-black focus:ring-0 focus:bg-yamber focus:border-black transition-colors duration-200 p-0 w-full" type="text" value={firstName} onChange={handleNameChange} placeholder="First Name" />!
                    </span>
                </div>
                <span className="font-palanquin mt-2">What can we help out with?</span>
                <br />
                <div className="flex flex-col sm:flex-row gap-5 justify-between items-center font-palanquin">
                    <button
                        onClick={() => handleClick(1)}
                        className={`flex grow sm:w-auto w-full items-center px-4 py-4 border border-black transition-colors duration-100 focus:outline-none focus:ring-blue-500 ${activeButton === 1
                            ? 'bg-blue-500 text-white'
                            : 'hover:bg-gray-100'
                            }`}
                    >
                        <AiOutlineShoppingCart className="w-6 h-6" />
                        <span className="flex grow justify-center text-xl">
                            I want to buy!
                        </span>
                    </button>
                    <button
                        onClick={() => handleClick(2)}
                        className={`flex grow sm:w-auto w-full items-center px-4 py-4 border border-black transition-colors duration-100 focus:outline-none focus:ring-blue-500 ${activeButton === 2
                            ? 'bg-blue-500 text-white'
                            : 'hover:bg-gray-100'
                            }`}
                    >
                        <AiOutlineShoppingCart className="w-6 h-6" />
                        <span className="flex grow justify-center text-xl">
                            I'm here to sell!
                        </span>
                    </button>

                </div>
                {error && <span className="text-red-500 mt-2">{error}</span>}
                <br />
                <div className="flex justify-end">
                    {activeButton && firstName ? <button type="submit" className=" bg-blue-500 text-white px-4 py-2 w-fit text-nowrap border-black border-2 transition-colors duration-100" onClick={handleNextStep}>
                        NEXT
                    </button> : <button type="submit" className=" bg-blue-200 text-white px-4 py-2 w-fit text-nowrap border-black border-2 transition-colors duration-100" onClick={handleNextStep}>
                        NEXT
                    </button>}
                </div>

            </div>
        </>
    )
}