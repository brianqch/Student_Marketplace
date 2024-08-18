"use client"
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import supabase from '../../../../lib/supabase';
import styles from '../../../../styles/ProductDetail.module.css'

const ViewItem = ({ params }) => {
    const id = params.id;
    const router = useRouter();
    const [form, setForm] = useState({
        title: "",
        price: "",
        location: "",
        category: "",
        condition: "",
        description: "",
        brand: ""
    });

    useEffect(() => {
        async function fetchData() {
            if (id) {
                const { data: item, error } = await supabase
                    .from('items')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) {
                    console.error('Error fetching item:', error);
                    // router.push("/"); // Redirect to home or error page
                    return;
                }
                setForm(item);
            } else {
                // Handle case when id is null or undefined
                console.log('ID is null or undefined');
            }
        }
        fetchData();
    }, [id, router]);

    return (
        <section className="py-10 lg:py-24 relative">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <p className="font-medium text-lg text-indigo-600 ">Travel / Menswear</p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    <div className="pro-detail w-full flex flex-col justify-center order-last lg:order-none max-lg:max-w-[608px] max-lg:mx-auto border-2">

                        <div className='border-b-2 w-full h-full px-4 py-6'>
                            <h2 className="mb-2 font-manrope font-bold text-3xl leading-10 text-gray-900">{form.title}</h2>
                            <div className="flex flex-col sm:flex-row sm:items-center mb-6">
                                <h6 className="font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 mr-5">
                                    ${form.price}
                                </h6>
                                {/* <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, index) => (
                                        <svg key={index} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_12029_1640)">
                                                <path
                                                    d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                                                    fill={index < 4 ? "#FBBF24" : "#F3F4F6"} />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_12029_1640">
                                                    <rect width="20" height="20" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    ))}
                                </div>
                                <span className="pl-2 font-normal leading-7 text-gray-500 text-sm">1624 reviews</span>
                            </div> */}
                            </div>
                            <p className="text-gray-500 text-base font-normal">
                                the perfect companion for your next adventure! Embrace the spirit of sunny escapades with this
                                vibrant and versatile bag designed to cater to your travel needs while adding a pop of color to
                                your journey.
                            </p>
                        </div>

                        <div className='border-b-2 w-full h-full px-4 py-6'>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-gray-200 p-4">Column 1</div>
                                <div className="bg-gray-300 p-4">Column 2</div>
                            </div>
                            <p className="text-gray-500 text-base font-normal mb-8">
                                the perfect companion for your next adventure! Embrace the spirit of sunny escapades with this
                                vibrant and versatile bag designed to cater to your travel needs while adding a pop of color to
                                your journey.
                            </p>
                        </div>
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
        </section>
    );
};

export default ViewItem;
