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
                <div className="absolute top-1/4 left-0 flex flex-col text-white pl-20 sm:pl-20 md:pl-40 lg:pl-48 3xl:pl-80 md:pt-28 3xl:pt-44 z-10">
                    <div className="flex flex-row items-center mb-2">
                        <img src="/location_icon.svg" className="h-10 w-10 -ml-2 mr-2" alt="Location Icon" />
                        <span className="font-palanquin text-md md:text-lg">{school.location}</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl mb-2">
                        NOW SHOPPING <br />
                        {school.name}
                    </h1>
                    <p className="pt-2 sm:pt-4 md:pt-8 font-sitara text-sm sm:text-md md:text-lg w-[300px] md:w-[600px]"> <strong>Fiat Lux!</strong> {school.description}</p>
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
