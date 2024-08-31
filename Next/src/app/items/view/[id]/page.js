"use client"
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import supabase from '../../../../lib/supabase';
import styles from '../../../../styles/ProductDetail.module.css'

const DescriptionDiv = ({ label, labelInfo }) => {
    return (
        <div className="flex flex-row text-wrap w-full">
            <span className="w-1/2 text-gray-400">{label}</span>
            <span className="w-1/2 break-words"> {labelInfo} </span>
        </div>
    )
}

const ViewItem = ({ params }) => {
    const id = params.id;
    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [seller, setSeller] = useState('');


    const [form, setForm] = useState({
        title: "",
        price: "",
        location: "",
        category: "",
        condition: "",
        description: "",
        brand: "",
        items_images: [],
        user_id: ""
    });

    const handleThumbnailClick = (image, index) => {
        setSelectedImage(image);
        setCurrentIndex(index);
    };

    const handleProfileClick = () => {
        if (form.user_id) {
            router.push(`/profile/${form.user_id}`);
        }
    };


    const handleNext = () => {
        const nextIndex = (currentIndex + 1) % form.items_images[0].image_url_arr.length;
        setCurrentIndex(nextIndex);
        setSelectedImage(form.items_images[0].image_url_arr[nextIndex]);
    };

    const handlePrev = () => {
        const prevIndex = (currentIndex - 1 + form.items_images[0].image_url_arr.length) % form.items_images[0].image_url_arr.length;
        setCurrentIndex(prevIndex);
        setSelectedImage(form.items_images[0].image_url_arr[prevIndex]);
    };

    useEffect(() => {
        async function fetchData() {
            if (id) {
                const { data: item, error } = await supabase
                    .from('items')
                    .select(`
                        id,
                        title,
                        price,
                        location,
                        category,
                        condition,
                        description,
                        created_at,
                        brand,
                        items_images (
                            image_url_arr
                        ),
                        user_id
                    `)
                    .eq('id', id)
                    .single();

                if (error) {
                    console.error('Error fetching item:', error);
                    // router.push("/"); // Redirect to home or error page
                    return;
                }
                setForm(item);
                setSelectedImage(item.items_images[0].image_url_arr[0]);

                if (item.user_id) {
                    // Fetch user information
                    const { data: user, error: userError } = await supabase
                        .from('users')
                        .select('name')
                        .eq('id', item.user_id)
                        .single();
                
                    if (userError) {
                        console.error('Error fetching user:', userError);
                    } else {
                        setSeller(user);
                
                        // Fetch review ratings for this user
                        const { data: reviews, error: reviewsError } = await supabase
                            .from('reviews')
                            .select('rating')
                            .eq('review_for', item.user_id);
                
                        if (reviewsError) {
                            console.error('Error fetching reviews:', reviewsError);
                        } else {
                            // Handle the reviews data, for example, calculating the average rating
                            const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
                            // console.log('Average rating:', averageRating);

                            setSeller({
                                ...user,
                                averageRating
                            })
                        }
                    }
                }
                

            } else {
                // Handle case when id is null or undefined
                console.log('ID is null or undefined');
            }
        }
        fetchData();
    }, [id, router]);

    return (
        <section className="py-8 font-palanquin flex flex-col sm:flex-row justify-center">
            <div className="px-4 sm:px-6 lg:px-8 lg:w-[35vw] max-w-[700px] max-h-[700px]">
                <span className="text-sm text-gray-500">
                    <a href="/" className="hover:underline">HOME</a>
                    <span> / </span>
                    <a href="/shop" className="hover:underline">SHOP</a>
                    <span> / </span>
                    <a href={`/shop/${form.category}`} className="hover:underline">{form.category.toUpperCase()}</a>
                </span>

                <div className="gap-8 lg:gap-16">
                    <div className="pro-detail w-full flex flex-col justify-center order-last lg:order-none max-lg:max-w-[608px] max-lg:mx-auto border-2 border-slate-900">

                        <div className='border-b-2 border-slate-900	w-full h-full px-4 py-5'>
                            <span className="text-2xl text-gray-900">{form.title}</span>
                            <div className="flex flex-col sm:flex-row sm:items-center">
                                <span className="text-2xl leading-9 text-gray-900 pr-5 mr-5">
                                    ${form.price}
                                </span>

                            </div>
                            <p className="font-palanquin text-gray-900 text-base font-normal mt-2">
                                {form.description}
                            </p>
                        </div>

                        <div className="flex w-full h-full">
                            <div className="flex flex-row w-full relative px-6 pt-4 pb-6">
                                {/* Details */}
                                <div className="flex flex-col gap-1 w-7/12 justify-center">
                                    <span>DETAILS</span>
                                    <DescriptionDiv label={"Condition"} labelInfo={form.condition} />
                                    <DescriptionDiv label={"Category"} labelInfo={form.category} />
                                    <DescriptionDiv label={"Region"} labelInfo={form.location} />
                                    <DescriptionDiv label={"Brand"} labelInfo={form.brand} />

                                </div>

                                {/* Separator */}
                                <div className="absolute inset-y-0 pr-2 left-[58.333333%] border-r-2 border-slate-900"></div>

                                {/* Seller */}
                                <div className="flex flex-col w-5/12 pl-10 gap-3">
                                    <span>SELLER</span>
                                    <div className="flex flex-row gap-2" onClick={handleProfileClick}>
                                        <img className="rounded-full w-10 h-10 aspect-square" src="/images/missing.jpg">
                                        </img>
                                        <div className="flex flex-col overflow-hidden">
                                            <span className="text-sm">{seller.name}</span>
                                            <span className="text-xs">Usertag</span>
                                        </div>
                                    </div>
                                    {/* Rating */}
                                    <div className="flex items-center gap-2 overflow-y-auto">
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, index) => (
                                                <svg
                                                    key={index}
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="stroke-black" // Add a class for styling the stroke
                                                >
                                                    <path
                                                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                                        fill={index < 4 ? "#FBBF24" : "#F3F4F6"}
                                                        stroke="black" // Add stroke color
                                                        strokeWidth="1" // Adjust stroke width as needed
                                                    />
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="font-normal leading-7 text-gray-500 text-sm overflow-hidden">(1624)</span>
                                    </div>



                                    <button className="px-2 py-1 bg-uni-blue text-white text-xs border-2 border-gray-900 hover:bg-uni-blue transition-colors duration-150 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        Ask a question
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="Flex flex-row w-full border-t-2 border-gray-900">
                            <button className="border-r-2 w-1/2 px-10 py-4 border-gray-900 hover:bg-uni-blue transition-colors duration-150"
                            >
                                BUY NOW
                            </button>
                            <button className="w-1/2 px-10 py-4 border-gray-900 hover:bg-uni-blue transition-colors duration-150"
                            >
                                SEND OFFER
                            </button>
                        </div>

                        <button className="border-t-2 border-gray-900 w-full px-10 py-4 bg-uni-blue text-white hover:bg-blue-500 transition-colors duration-150"
                        >
                            ADD TO CART
                        </button>




                        {/* <div className="block w-full">
                            <p className="font-medium text-lg leading-8 text-gray-900 mb-4">Bag Color</p>
                            <div className="flex items-center justify-start gap-3 md:gap-6 relative mb-6">
                                {["#10B981", "#FBBF24", "#F43F5E", "#2563EB"].map((color, index) => (
                                    <button key={index} className={`p-2.5 border border-gray-200 rounded-full transition-all duration-300 hover:border-${color.replace('#', '')}`}>
                                        <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="20" cy="20" r="20" fill={color} />
                                        </svg>
                                    </button>
                                ))}
                            </div>
                            <div className="block w-full mb-6">
                                <p className="font-medium text-lg leading-8 text-gray-900 mb-4">Bag size</p>
                                <div className="grid grid-cols-2 min-[400px]:grid-cols-3 gap-3">
                                    {["56 cm (S)", "67 cm (M)", "77 cm (L)"].map((size, index) => (
                                        <button key={index}
                                            className="border border-gray-200 text-gray-900 text-lg py-2 rounded-full px-1.5 sm:px-6 w-full font-semibold whitespace-nowrap shadow-sm shadow-transparent transition-all duration-300 hover:shadow-gray-300 hover:bg-gray-50 hover:border-gray-300">
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                                <div className="flex items-center justify-center w-full">
                                    <button className="group py-4 px-6 border border-gray-400 rounded-l-full shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-300 hover:bg-gray-50">
                                        <svg className="stroke-gray-700 transition-all duration-500 group-hover:stroke-black" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16.8 11.4L11.8 15.4L6.8 11.4L11.8 7.4L16.8 11.4Z" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>

            <div>
                <div className="flex flex-col">
                    <div className="flex flex-col lg:flex-row gap-2 mt-1 pt-5">
                        {/* Image Preview */}
                        {(form.items_images.length > 0 && form.items_images[0].image_url_arr.length > 0) ?
                            <div className="relative aspect-square sm:w-[30vw] max-w-[700px] max-h-[700px] bg-gray-100 flex items-center justify-center">
                                <img
                                    src={selectedImage}
                                    alt="preview"
                                    className="w-full h-full object-cover"
                                />
                                {/* Arrows */}
                                <button
                                    onClick={handlePrev}
                                    className="absolute text-4xl left-0 top-1/2 transform -translate-y-1/2 text-white p-2"
                                >
                                    &lt;
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="absolute text-4xl right-0 top-1/2 transform -translate-y-1/2 text-white p-2"
                                >
                                    &gt;
                                </button>
                            </div>
                            :
                            <img
                                src='/images/missing.jpg'
                                alt="preview"
                                className="w-full h-full object-cover aspect-square sm:w-[30vw] max-w-[700px] max-h-[700px]"
                            />

                        }

                        {/* Thumbnails */}
                        <div className="flex flex-row sm:flex-col gap-2">
                            {form.items_images.length > 0 ? (
                                form.items_images[0].image_url_arr.map((image, index) => (
                                    <div key={index} className="relative w-20 h-20">
                                        <img
                                            src={image}
                                            alt={`preview-${index}`}
                                            className={`w-full h-full aspect-square object-cover hover:cursor-pointer ${index === currentIndex ? 'border-2 border-uni-blue' : ''}`}
                                            onClick={() => handleThumbnailClick(image, index)}
                                        />
                                    </div>
                                ))
                            ) : (
                                <img
                                    src='/images/missing.jpg'
                                    alt="preview"
                                    className="relative w-20 h-20 bg-gray-100 border border-gray-300 flex items-center justify-center text-2xl text-gray-500"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ViewItem;
