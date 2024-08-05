import { useEffect } from 'react';

const Onboarding3 = ({ step, setStep, school, area, setArea, setError, handlePrevious }) => {
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

    const handleAreaClick = (area) => {
        setArea(area);
    };

    const handleNextStep = () => {
        if (area) {
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
            <div className="flex flex-col sm:grid grid-cols-3 gap-2">
                {areas["University of California, Berkeley"].map((a) => (
                    <button
                        key={a}
                        className={area == a ? `border border-black px-4 sm:px-8 py-4 sm:py-8 font-palanquin bg-blue-500 text-white`: `border border-black px-4 sm:px-8 py-4 sm:py-8 font-palanquin` }
                        onClick={() => handleAreaClick(a)}
                    >
                        {a}
                    </button>
                ))}
            </div>
            <br/>
            <div className="flex justify-between">
                <button type="submit" className=" bg-white px-4 py-2 w-fit text-nowrap border-black border-2 transition-colors duration-100" onClick={handlePrevious}>
                    BACK
                </button>
                {area ? <button type="submit" className=" bg-blue-500 text-white px-4 py-2 w-fit text-nowrap border-black border-2 transition-colors duration-100" onClick={handleNextStep}>
                    NEXT
                </button> : <button type="submit" className=" bg-blue-200 text-white px-4 py-2 w-fit text-nowrap border-black border-2 transition-colors duration-100" onClick={handleNextStep}>
                    NEXT
                </button>}
            </div>
        </div>
    );
};

export default Onboarding3;
