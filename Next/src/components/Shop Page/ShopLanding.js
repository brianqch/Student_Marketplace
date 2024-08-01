import Image from "next/image";
import ImageCarousel from "./ImageCarousel";

const SchoolLanding = ({ school }) => {
    // Aspect ratio calculation (height / width * 100)
    const aspectRatio = (1996 / 2951) * 100; // Adjust with your image dimensions

    return (
        <div className="relative mx-[-25px] my-[-95px] min-w-[758px] bg-[#BACC69]">
            {/* Background Image Container */}
            <div
                className="relative w-full"
                style={{
                    paddingTop: `${aspectRatio}%`, // Maintains aspect ratio
                }}
            >
                <Image
                    src={school.image}
                    priority={true}
                    alt="Picture of an animated Berkeley background."
                    placeholder="blur"
                    style={{ objectFit: "cover" }}
                    fill={true}
                    className="absolute inset-0" // Background image behind everything
                />
                {/* Content */}
                <div className="absolute top-1/4 left-0 flex flex-col text-white px-[13%] pt-[8%] z-10 ">

                    <div className="flex flex-row items-center mb-2">
                        <img
                            src="/location_icon.svg"
                            className="h-[clamp(20px, 0.875vw, 40px)] sm:h-10 -ml-2 mr-2"
                            alt="Location Icon"
                        />
                        <span className="font-palanquin text-[clamp(14px,1vw,1.125rem)] ">
                            {school.location}
                        </span>
                    </div>

                    <h1 className="text-[clamp(2rem,5vw,3.5rem)] leading-none mb-4 max-h-[550px]">
                        NOW SHOPPING <br />
                        {school.name}
                    </h1>
                    <p className="text-[clamp(12px,1vw,1rem)] pr-[10%] mb-2 w-[65%] lg:w-[550px]">
                        <strong>Fiat Lux!</strong> {school.description}
                    </p>
                </div>
            </div>

            {/* Curved Rectangle */}
            <div className="relative mb-10">
                <img
                    src="/curvedRectangle.png"
                    alt="Curved Background"
                    className="relative w-full object-cover"
                    style={{
                        top: `${aspectRatio - 10}px`, // Maintains aspect ratio
                    }}
                />

                {/* Text Inside Curved Rectangle */}
                <div className="absolute flex flex-row justify-evenly top-1/2 left-1/2 w-full transform -translate-x-1/2 -translate-y-1/4 pl-[10%] hidden md:flex z-20">
                    <div className="flex flex-row pr-4">
                        <img src="/stars.svg" alt="Stars" className="h-8 w-8" />
                        <span className="font-palanquin font-medium text-2xl text-black pl-2">
                            RECENT LISTINGS
                        </span>
                    </div>
                    <ImageCarousel />
                </div>
            </div>
        </div>
    );
};

export default SchoolLanding;
