"use client";
import React, {useState} from "react";
import { FaCartShopping } from "react-icons/fa6";

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
                        <FaCartShopping className="w-5 h-5" />

                        <span className="flex grow justify-center text-xl">I want to buy!</span>
                    </button>
                    <button className="flex grow items-center px-4 py-4 border border-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-50" onClick={handleNextStep}>
                        <svg className="w-6 h-6" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.671875" y="0.111328" width="31" height="30" fill="url(#pattern0_256_1901)" />
                            <defs>
                                <pattern id="pattern0_256_1901" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlinkHref="#image0_256_1901" transform="matrix(0.00967742 0 0 0.01 0.016129 0)" />
                                </pattern>
                                <image id="image0_256_1901" width="100" height="100" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC0ElEQVR4nO2dvWoUYRiFH9BKEWux86/2DxERYqXewIKaSkstIjbeQbBUkjsQm4i/oKXpcgGiWCiICgYrFfxBBV8Z/ErNTnazM+d79zxwmjTzzfvMycxmd/OBMcYYY4wxxkwPe4ErwCKwJJLFsqY9TBH7gIdAiOdBuWhScxr4LDDsaJlPwCmScgD4KjDkWGe+AUdIxibgucBwY8S8ADaTiHMCQ40xc5ZE3BMYaIyZOyTincBAY8y8IRE/hpzsisBrkJUha2zOIQ3Drr5B3wvk7xqGrTMNFiKGhYhhIWJYiBgWIoaFiGEhQpwQeJUdG5QZErAsMMjYoDyhco4LDDHckpztiNpbkrEdUfO9JGM7otaWZG5H1NiSzO2I2loy0+JkvgOz5T0IxcyWNaZoSZt2XEefGxla0ube0Vx5O9FnR/lMVtUtydKOFC3J1I4ULcnWjqpbkrEdVbckazuqbMnRFottMifw+mIwYuZanmMziyo+YDYtGSCAhWAhIdAGN4T+B24h9D9kC6H/wVqIwDDDQvofYGQU0oYaTmTQYp1psBAxLEQMCxHDQsSwEDEsRAwLEcNCxLAQMSxEDAsRw0LEsBAxLEQMCxHDQsSwEDEsRAwLqUzIVeBQz2nW4PfUK0sa+h5kWIiFSDOpK/Z3+ebSfMly+Zkb0oOQ98Cx/3zfcdW/sroV8hPYv8bxDgK/fA/pTsjNYZUEbllId0LOtxBywUK6E3KmhZBmRxw/9nYkZL6FkGsW0l1DVoFtaxxvO/DBQroTEsAjYMs/jrUVeDyhY07Nlkej5iVwsTzmNrkEvJrQsVJtefR2QkOKDvOaRNwVGGiMmdskYhKPoNFx2jxqV7X16jOBocaIeVrOIRXN356+CAw31pnmn5cdJikny5bYUUk+ljWnptk0/r7AsGNImv17dzNFNCd7GVgQ2HZ1qWShrGlX38MxxhhjjDHGGDriD0tMlxrLHnNcAAAAAElFTkSuQmCC" />
                            </defs>
                        </svg>


                        <span className="flex grow justify-center text-xl">I'm here to sell!</span>
                    </button>

                </div>
            {error && <span className="text-red-500 mt-2">{error}</span>}

            </div>
        </>
    )
}