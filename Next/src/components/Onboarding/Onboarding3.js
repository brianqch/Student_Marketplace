import { useEffect } from 'react';

const Onboarding3 = ({ step, setStep, school, area, setArea, setError }) => {
    const areas = {
        "University of California, Berkeley": [
            "Southside",
            "Northside",
            "Downtown",
            "Elmwood",
            "Oakland",
            "Other"
        ],
    };

    const handleAreaClick = (selectedArea) => {
        setArea(selectedArea);
        console.log(selectedArea);
        if (selectedArea) {
            setError('');
            setStep(step + 1);
        } else {
            setError('*Please select an area.');
        }
    };

    useEffect(() => {
        if (school !== "University of California, Berkeley") {
            setError('*School not supported.');
        }
    }, [school, setError]);

    return (
        <div className="flex flex-col">
            <h1 className="text-2xl font-rammetto">Go bears!</h1>
            <p className="text-lg mt-2 mb-4 font-palanquin">Which part of town are you in?</p>
            <div className="grid grid-cols-3 gap-2">
                {areas["University of California, Berkeley"].map((area) => (
                    <button
                        key={area}
                        className="border border-black px-5 py-4 font-palanquin"
                        onClick={() => handleAreaClick(area)}
                    >
                        {area}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Onboarding3;
