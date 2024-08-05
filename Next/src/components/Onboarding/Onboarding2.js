import React, { useState } from "react";
import SchoolDropdown from "./SchoolDropdown";
import { IoHappyOutline } from "react-icons/io5";

export default function Onboarding2({step, setStep, error, setError, firstName, school, setSchool, handlePrevious}) {
    const [selectedSchool, setSelectedSchool] = useState('');

    const schools = [
        "University of California, Berkeley",
    ];

    const handleNextStep = () => {
        console.log(schools.indexOf(school));
        if (schools.indexOf(selectedSchool) === -1 && schools.indexOf(school) === -1) {
            setError("*Please choose your school.");
        } else {
            setError('');
            setStep(step + 1);
        }
        console.log("Step: ", step);
    };

    return (
        <>
            <div className="flex flex-col">
                <span className="flex font-rammetto text-2xl justify-center items-center gap-3"><IoHappyOutline className="w-10 h-10"/>Nice to meet you, { firstName}! </span>
                <span className="font-palanquin">Now, where do you go?</span>
                <br/>
                <SchoolDropdown school={school} setSchool={setSchool} error={error} setError={setError} step={step} setStep={setStep} schools={schools} selectedSchool={selectedSchool} setSelectedSchool={setSelectedSchool}/>
                {error && <span className="text-red-500 mt-2">{error}</span>}
                <br/>
                <div className="flex justify-between">
                    <button type="submit" className=" bg-white px-4 py-2 w-fit text-nowrap border-black border-2 transition-colors duration-100" onClick={handlePrevious}>
                        BACK
                    </button>
                    {school ? <button type="submit" className=" bg-blue-500 text-white px-4 py-2 w-fit text-nowrap border-black border-2 transition-colors duration-100" onClick={handleNextStep}>
                        NEXT
                    </button> : <button type="submit" className=" bg-blue-200 text-white px-4 py-2 w-fit text-nowrap border-black border-2 transition-colors duration-100" onClick={handleNextStep}>
                        NEXT
                    </button>}
                </div>
            </div>
        </>
    )
}