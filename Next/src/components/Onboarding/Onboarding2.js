import React, { useEffect } from "react";
import SchoolDropdown from "./SchoolDropdown";
import { IoHappyOutline } from "react-icons/io5";

export default function Onboarding2({step, setStep, error, setError, firstName, school, setSchool}) {

    return (
        <>
            <div className="flex flex-col">
                <span className="flex font-rammetto text-2xl justify-center items-center gap-3"><IoHappyOutline className="w-10 h-10"/>Nice to meet you, { firstName}! </span>
                <span className="font-palanquin">Now, where do you go?</span>
                <br/>
                <SchoolDropdown school={school} setSchool={setSchool} error={error} setError={setError} step={step} setStep={setStep}/>
                {error && <span className="text-red-500 mt-2">{error}</span>}
            </div>
        </>
    )
}