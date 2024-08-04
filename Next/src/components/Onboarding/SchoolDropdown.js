"use client"; // Mark this as a client component
import { useState, useRef, useEffect } from 'react';

const SchoolDropdown = ({ error, setError, step, setStep, school, setSchool }) => {
    const schools = [
        "University of California, Berkeley",
    ];

    const [showSchoolDropdown, setShowSchoolDropdown] = useState(false);

    const handleNextStep = (selectedSchool) => {
        if (schools.indexOf(selectedSchool) === -1) {
            setError("*Please choose your school.");
        } else {
            setError('');
            setStep(step + 1);
        }
        console.log("Step: ", step);
    };

    const schoolDropdownRef = useRef(null);

    const filteredSchools = schools.filter((item) =>
        item.toLowerCase().includes(school.toLowerCase())
    );

    const handleSchoolInputChange = (e) => {
        setSchool(e.target.value);
        setShowSchoolDropdown(true);
    };

    const handleSchoolItemClick = (item) => {
        setSchool(item);
        setShowSchoolDropdown(false);
        console.log("Get to next step");
        handleNextStep(item);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (schoolDropdownRef.current && !schoolDropdownRef.current.contains(event.target)) {
                setShowSchoolDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative flex flex-col">
            <div className="" ref={schoolDropdownRef}>
                <div className="relative flex items-center">
                    <input
                        type="text"
                        value={school}
                        onChange={handleSchoolInputChange}
                        placeholder="Select your university..."
                        className="flex-1 border-black border-2 p-3"
                        onFocus={() => setShowSchoolDropdown(true)}
                    />
                    <svg className="w-5 h-5 ml-2 absolute right-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </div>

                {showSchoolDropdown && filteredSchools.length > 0 && (
                    <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 shadow-lg overflow-y-auto max-h-32">
                        {filteredSchools.map((op, index) => (
                            <li
                                key={index}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleSchoolItemClick(op)}
                            >
                                {op}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SchoolDropdown;
