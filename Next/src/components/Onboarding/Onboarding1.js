"use client";
import React, { useState } from "react";
import { AiOutlineShop, AiOutlineShoppingCart } from "react-icons/ai";

export default function Onboarding1({ step, setStep, firstName, setFirstName, error, setError }) {


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
            <div className="flex flex-col justify-center w-auto">
                <span className="flex font-rammetto text-2xl gap-5 items-center"> Hey there,
                    <input className="text-2xl border-0 border-b-4 border-dashed border-black focus:ring-0 focus:bg-yamber focus:border-black transition-colors duration-200" type="text" value={firstName} onChange={handleNameChange} placeholder="First Name" />!
                </span>
                <span className="font-palanquin">What can we help out with?</span>
                <br />
                <div className="flex gap-5 justify-between items-center font-palanquin">
                    <button className="flex grow items-center px-4 py-4 border border-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={handleNextStep}>
                        <AiOutlineShoppingCart className="w-6 h-6" />

                        <span className="flex grow justify-center text-xl">I want to buy!</span>
                    </button>
                    <button className="flex grow items-center px-4 py-4 border border-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-50" onClick={handleNextStep}>
                        <AiOutlineShop className="w-6 h-6" />

                        <span className="flex grow justify-center text-xl">I'm here to sell!</span>
                    </button>

                </div>
                {error && <span className="text-red-500 mt-2">{error}</span>}

            </div>
        </>
    )
}