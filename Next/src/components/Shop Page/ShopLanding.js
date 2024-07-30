const SchoolShopContent = ({ school }) => {
    return (
        <>
            <div className="relative mx-[-25px] my-[-90px] z-[-1] pb-[550px]">
                {/* Background Image */}
                <img
                    src="/images/berkbackground.png"
                    alt="Background"
                    className="w-full object-cover"
                />

                {/* Curved SVG */}
                <div className="absolute left-0 w-full ">
                    <img
                        src="/curvedRec.svg"
                        alt="Curved Background"
                        className="w-full"
                        style={{ marginTop: '-100px' }} // Adjust this value to control overlap
                    />
                </div>


                {/* Your Content */}
            </div>


        </>
    );
};



export default SchoolShopContent;
