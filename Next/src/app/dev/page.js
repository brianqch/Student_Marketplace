// "use client"
// // src/app/dev/page.js or src/pages/dev.js
// // import supabase from '../../lib/supabase'; // Adjust the path as needed
// // import ProductCard from '../../components/Shop Page/ProductCard'; // Adjust the path as needed
// // import React, { useState, useEffect, useRef } from 'react';

// // async function fetchItems() {
// //     const { data: items, error } = await supabase.from('items').select('*');
// //     if (error) {
// //         console.error('Error fetching items:', error);
// //         return [];
// //     }
// //     return items;
// // }

// // export default async function DevPage() {
// //     const items = await fetchItems();

// //     return (
// //         <div className="bg-white">
// //             <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
// //                 <h2 className="text-2xl font-bold tracking-tight text-gray-900">Shop</h2>

// //                 <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
// //                     {items.map((item) => (
// //                         <ProductCard
// //                             item={item}
// //                             key={item.id}
// //                         />
// //                     ))}
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }


// export async function getServerSideProps() {
//   // Fetch data from external API
//   const res = await fetch('https://api.github.com/repos/vercel/next.js')
//   const repo = await res.json()
//   // Pass data to the page via props
//   return { props: { repo } }
// }

// export default ImageCarousel;

// const GuideBlockButton = ({ link, isLeft, text }) => {
//   return (

//     <div className={`flex flex-row items-center justify-between max-w-40 bg-white border border-gray-500 rounded-full pl-4 w-full h-8`}>
//       <div className="flex flex-col justify-center">
//         <span className="text-sm font-semibold text-blue-700 ">{text}</span>
//       </div>
//       <button className="flex items-center justify-center aspect-square h-full bg-blue-500 rounded-full text-white text-xl font-bold">
//         &gt;
//       </button>
//     </div>



//   )
// }

// const GuideBlock = ({ text, textColor, buttonText, buttonTextColor, heightType, isLeft }) => {
//   const lines = text.split('\n').map((line, index) => (
//     <React.Fragment key={index}>
//       {line}
//       {index < text.split('\n').length - 1 && <br />}
//     </React.Fragment>
//   ));
//   return (
//     <div className={`${isLeft ? 'justify-start' : 'justify-end'} flex flex-row ${heightType === 'tall' ? 'h-60' : 'h-48'} bg-gray-300 border border-gray-500 rounded-lg p-6`}>
//         <div className="flex flex-col justify-end h-full w-full">
//             <span className={`text-xl sm:text-2xl md:text-3xl font-bold text-gray-700 break-words overflow-hidden ${isLeft ? 'text-left' : 'text-right'}`}>
//                 {lines}
//             </span>
//             <GuideBlockButton isLeft={isLeft} text={buttonText}></GuideBlockButton>
//         </div>
//     </div>
// );
// }

// export default function LandingPage() {
//   return (
//     <>
//       <div className="flex flex-col items-center justify-center">
//         {/* IMAGE CAROUSEL */}
//         <ImageCarousel></ImageCarousel>
//       </div>

//       {/* GUIDE BLOCKS */}
//       <div className="flex flex-col flex-wrap justify-center gap-5 md:px-52">
//         <div className="flex flex-col md:flex-row w-full gap-5">
//           <div className="md:basis-1/2 w-full gap-5">
//             <GuideBlock className="w-full" text={"NEW YEAR, \n NEW YOU"} buttonText={"Shop clothes"} heightType={"short"} isLeft={true} />
//           </div>
//           <div className="md:basis-1/2 w-full gap-5">
//             <GuideBlock className="w-full" text={"TECH FOR LESS"} buttonText={"Shop electronics"} heightType={"short"} isLeft={false} />
//           </div>
//         </div>
//         <div className="flex flex-col md:flex-row w-full gap-5">
//           <div className="md:basis-3/4 w-full">
//             <GuideBlock className="w-full" text={"THE MOVE-IN \n EDITION"} buttonText={"Shop home"} heightType={"tall"} isLeft={true} />
//           </div>
//           <div className="md:basis-1/4 w-full">
//             <GuideBlock className="w-full" text={"SOMETHING \n ELSE?"} buttonText={"Shop everything else"} heightType={"tall"} isLeft={false} />
//           </div>
//         </div>
//       </div>

//     </>

//   )
// }




// import React from 'react';



// CurvedBackground component with custom layout
// const SchoolShopContent = ({school}) => {
//   return (
//     <>
//       <div className="relative mx-[-25px] my-[-90px] z-[-1]">
//         {/* Image */}
//         <img src="/images/berkbackground.png"></img>


//         {/* Curved SVG */}
//         <img src="/curvedRec.svg" alt="Icon" className="my-[-60px]" />

//         {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 426"><path fill="#e4f0d4" d="M0 192.007v192.031l2.25-.489c12.01-2.612 74.544-4.649 142.75-4.65 147.416-.001 321.054 9.104 545.5 28.606 239.551 20.814 421.572 23.015 579 7.001 66.585-6.773 146.74-21.058 168-29.942l3.5-1.462V-.091l-3.25.545c-10.842 1.818-304.499 35.891-319.25 37.042-60.814 4.747-138.971 9.174-222 12.574-117.423 4.809-305.428.375-510.5-12.039C360.819 36.507 24.342 3.485 3.75.517L0-.024v192.031m.49.493c0 105.6.117 148.652.26 95.67.143-52.981.143-139.381 0-192C.607 43.552.49 86.9.49 192.5" fill-rule="evenodd"/></svg> */}

//         {/* Your Content */}
//       </div>
//       <div className="relative z-10 p-8 text-center text-white">
//         <h1 className="text-3xl font-bold">Your Content</h1>
//         <p className="text-md">Some description or other content.</p>
//       </div>

//     </>
//   );
// };

// Adding getLayout to CurvedBackground

// export default CurvedBackground;














"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import s3 from '../../lib/aws'; // Import the configured S3 instance
import supabase from '../../lib/supabase'; // Ensure you have Supabase client configured
// import { v4 as uuidv4 } from 'uuid'; // To generate unique IDs for S3 keys
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import imageCompression from 'browser-image-compression'; // Import the image compression library
import { NextResponse } from 'next/server';

const CreateItem = ({ params }) => {
    const [form, setForm] = useState({
        title: "",
        price: "",
        location: "",
        category: "",
        condition: "",
        description: ""
    });
    const [images, setImages] = useState([]);
    const [categoryVal, setCategoryVal] = useState('');
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [showConditionDropdown, setShowConditionDropdown] = useState(false);

    const router = useRouter();
    const { id } = params;
    const conditions = ["New", "Used - Like New", "Used - Good", "Used - Fair"];
    const categories = [
        "Antiques & Collectibles",
        "Arts & Crafts",
        "Auto Parts & Accessories",
        "Baby Products",
        "Books, Movies & Music",
        "Cell Phones & Accessories",
        "Clothing, Shoes & Accessories",
        "Computers & Tablets",
        "Electronics",
        "Furniture",
        "Health & Beauty",
        "Home & Garden",
        "Jewelry & Watches",
        "Musical Instruments",
        "Office Supplies",
        "Pet Supplies",
        "Sports & Outdoors",
        "Tools & Home Improvement",
        "Toys & Hobbies",
        "Video Games & Consoles"
    ];

    const categoryDropdownRef = useRef(null);
    const conditionDropdownRef = useRef(null);


    const filteredCategories = categories.filter((item) =>
        item.toLowerCase().includes(form.category.toLowerCase())
    );

    const handleCategoryInputChange = (e) => {
        form.category = e.target.value;
        setCategoryVal(e.target.value);
        setShowCategoryDropdown(true);
    };

    const handleCategoryItemClick = (item) => {
        form.category = item;
        setCategoryVal(item);
        setShowCategoryDropdown(false);
    };

    const handleConditionToggleDropdown = () => {
        setShowConditionDropdown((prev) => !prev);
    };

    const handleConditionItemClick = (item) => {
        form.condition = item;
        setShowConditionDropdown(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                categoryDropdownRef.current &&
                !categoryDropdownRef.current.contains(event.target)
            ) {
                setShowCategoryDropdown(false);
            }
            if (
                conditionDropdownRef.current &&
                !conditionDropdownRef.current.contains(event.target)
            ) {
                setShowConditionDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    function updateForm(value) {
        setForm(prev => ({ ...prev, ...value }));
    }

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        // Compress new files
        const compressedFiles = await Promise.all(
            files.map(file => compressImage(file))
        );
        // Merge new compressed files with existing images
        setImages(prevImages => [...prevImages, ...compressedFiles]);
    };

    const compressImage = async (file) => {
        const options = {
            maxSizeMB: 1, // Maximum size in MB
            maxWidthOrHeight: 800, // Maximum width or height
            useWebWorker: true, // Use web workers for faster compression
        };
        try {
            const compressedBlob = await imageCompression(file, options);
            const compressedFile = new File([compressedBlob], file.name, { type: file.type });
            return compressedFile;
        } catch (error) {
            console.error("Error compressing image:", error);
            return file; // Return original file if compression fails
        }
    };

    const handleImageRemove = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };







    const getPresignedUrl = async (fileName, contentType, timestamp) => {
        const response = await fetch(`/api/presigned?fileName=${encodeURIComponent(fileName)}&contentType=${encodeURIComponent(contentType)}&timestamp=${encodeURIComponent(timestamp)}`);
        const data = await response.json();
        return data.signedUrl;
    };

    const uploadImagesToS3 = async (images) => {
        const imageUrls = [];

        for (const file of images) {
            if (!(file instanceof File)) {
                throw new Error('Item in images array is not a File object');
            }

            const fileName = file.name;
            const contentType = file.type;

            try {
                const timestamp = Date.now();
                // Get a pre-signed URL from your server
                const presignedUrl = await getPresignedUrl(fileName, contentType, timestamp);
                console.log("presignedUrl", presignedUrl)
                // Upload the file using the pre-signed URL
                const response = await fetch(presignedUrl, {
                    method: 'PUT',
                    body: file,
                    headers: {
                        'Content-Type': contentType,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to upload ${fileName}: ${response.statusText}`);
                }

                // Construct the URL to access the file
                const bucketName = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME;
                const region = process.env.NEXT_PUBLIC_AWS_REGION;
                const imageUrl = `https://${bucketName}.s3.${region}.amazonaws.com/items-images/${timestamp}_${fileName}`;

                imageUrls.push(imageUrl);
            } catch (error) {
                console.error('Error uploading image:', error);
                throw error;
            }
        }

        return imageUrls;
    };









    // Function to upload images to S3 using pre-signed URLs

    //   const uploadImagesToS3 = async (images) => {
    //     const bucketName = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME;
    //     const imageUrls = [];
    //     const region = process.env.NEXT_PUBLIC_AWS_REGION; // Ensure this is set


    //     if (!bucketName || !region) {
    //       throw new Error('Bucket name or region is not defined');
    //     }

    //     if (!Array.isArray(images)) {
    //       throw new Error('Images parameter is not an array');
    //     }

    //     console.log('Type of images:', typeof images);
    //     console.log('Is images an array?', Array.isArray(images));
    //     console.log('Images content:', images);

    //     try {
    //       for (const file of images) {
    //         if (!(file instanceof File)) {
    //           throw new Error('Item in images array is not a File object');
    //         }

    //         const params = {
    //           Bucket: bucketName,
    //           Key: `items-images/${Date.now()}_${file.name}`,
    //           Body: file,
    //           ContentType: file.type,
    //         };

    //         const command = new PutObjectCommand(params);
    //         await s3.send(command);

    //         const imageUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${params.Key}`;
    //         imageUrls.push(imageUrl);
    //       }
    //     } catch (error) {
    //       console.error('Error uploading images to S3:', error);
    //       throw error;
    //     }

    //     return imageUrls;
    //   };








    // const fetchPresignedUrl = async (file) => {
    //     // const response = await getFile(filename);
    //     // const filename = file.name;
    //     // const fileType = file.type;
    //     // const response = await fetch(
    //     //     `/api/get-presigned-url?file=${filename}&fileType=${fileType}`
    //     //   );
    //     // // if (!response.ok) {
    //     // //   throw new Error('Error fetching presigned URL');
    //     // // }
    //     // const { url } = await response.json();
    //     //   console.log(url);
    //     // return url;

    //     const presignedURL = new URL('/api/presigned', window.location.href);
    //     presignedURL.searchParams.set('fileName', file.name);
    //     presignedURL.searchParams.set('contentType', file.type);

    //     fetch(presignedURL.toString())
    //         .then((res) => res.json())
    //         .then((res) => {
    //             const url = res.signedUrl;
    //             console.log('Presigned URL:', url);

    //             // You can return the URL here or do whatever you need with it
    //             return url;
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching presigned URL:', error);
    //         });
    // };


    // const uploadImagesToS3 = async (images) => {
    //     const imageUrls = [];

    //     try {
    //         for (const file of images) {
    //             console.log(file)
    //             const presignedUrl = await fetchPresignedUrl(file);

    //             //   console.log(presignedUrl)
    //             const response = await fetch(presignedUrl, {
    //                 method: 'PUT',
    //                 body: file,
    //                 headers: {
    //                     'Content-Type': file.type,
    //                 },
    //             });

    //             if (!response.ok) {
    //                 throw new Error('Error uploading image');
    //             }

    //             // Construct the image URL
    //             const imageUrl = presignedUrl.split('?')[0];
    //             imageUrls.push(imageUrl);
    //         }
    //     } catch (error) {
    //         console.error('Error uploading images to S3:', error);
    //         throw error;
    //     }

    //     return imageUrls;
    // };


    const onSubmit = async (e) => {
        e.preventDefault();
        const newItem = { ...form };
        try {
            // Insert item data into Supabase
            const { data, error } = await supabase
                .from('items')
                .insert(newItem)
                .select();

            if (error) throw error;

            console.log(data)
            const itemId = data[0].id; // Get the newly inserted item's ID
            console.log(images.length)
            // Handle image uploads
            if (images.length > 0) {
                console.log(images)
                const imageUrls = await uploadImagesToS3(images);
                console.log('Image URLs:', imageUrls);
                const { error } = await supabase
                    .from('items_images')
                    .insert([{ item_id: itemId, image_url_arr: imageUrls }]);


                if (error) {
                    console.error('Error inserting image data:', error);
                } else {
                    console.log('Data inserted successfully');
                }

            }

            router.push("/");
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <>
            <h2 className="text-xl font-semibold p-4">Product Listing</h2>
            <form onSubmit={onSubmit} className="border rounded-lg p-4">
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
                    <div className="grid max-w-2xl grid-cols-1 gap-x-6  ">


                        {/* Product Name */}
                        <div className="sm:col-span-4">
                            <div className="flex flex-col gap-1 mt-2">
                                <span className="">Product Name</span>
                                <div className="flex sm:max-w-md border-solid border-2 border-black">
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        placeholder="e.g. Brand New Couch"
                                        className="block flex-1 border-0 bg-transparent pl-2 p-3 text-slate-900 focus:ring-4 focus-within:ring-uni-blue text-md sm:leading-6"
                                        value={form.title}
                                        onChange={(e) => updateForm({ title: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Price */}
                        <div className="sm:col-span-4">
                            <div className="flex flex-col gap-1 mt-2">
                                <label htmlFor="price" className="text-sm font-medium text-slate-900">Price</label>
                                <div className="relative flex sm:max-w-md border-solid border-2 border-black">
                                    <input
                                        type="number"
                                        name="price"
                                        placeholder="Enter price"
                                        id="price"
                                        min="0"
                                        className="block flex-1 border-0 bg-transparent pl-6 p-3 text-slate-900 text-md sm:leading-6 focus:ring-4 focus-within:ring-uni-blue"
                                        value={form.price}
                                        onChange={(e) => updateForm({ price: e.target.value })}
                                    />
                                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-2">
                                        <span className="text-md text-slate-900">$</span>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* Description */}
                        <div className="sm:col-span-4">
                            <div className="flex flex-col gap-1 mt-2">
                                <span className="">Description</span>
                                <div className="flex sm:max-w-md border-solid border-2 border-black pl-0.5">
                                    <textarea
                                        name="description"
                                        id="description"
                                        className="block w-full border-0 bg-transparent pl-2 p-3 text-slate-900  focus:ring-4 focus:ring-uni-blue text-md h-32 sm:leading-6 resize-none"
                                        placeholder="Describe the item, condition, and any special features..."
                                        value={form.description}
                                        onChange={(e) => updateForm({ description: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="sm:col-span-4">
                            <div className="flex flex-col gap-1 mt-2">
                                <span className="">Location</span>
                                <div className="flex sm:max-w-md border-solid border-2 border-black pl-0.5">
                                    <input
                                        type="text"
                                        name="location"
                                        id="location"
                                        className="block flex-1 border-0 bg-transparent pl-2 p-3 text-slate-900 focus:ring-4 focus:ring-uni-blue text-md sm:leading-6"
                                        placeholder="Northside, southside, etc."
                                        value={form.location}
                                        onChange={(e) => updateForm({ location: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Category */}
                        <div className="sm:col-span-4 max-w-md">
                            <div className="relative flex flex-col gap-1 mt-2">
                                <label
                                    htmlFor="category"
                                    className="block text-md leading-6 text-slate-900"
                                >
                                    Category
                                </label>
                                <div className="" ref={categoryDropdownRef}>
                                    <div className="relative flex items-center">
                                        <input
                                            type="text"
                                            value={categoryVal}
                                            onChange={handleCategoryInputChange}
                                            placeholder="Category"
                                            className="flex-1 shadow-sm text-md border-2 border-black focus:ring-2 focus:ring-uni-blue p-3 cursor-pointer"
                                            onClick={() => setShowCategoryDropdown(true)}
                                        />
                                        <svg className="z-0 w-5 h-5 ml-2 absolute right-3 top-1/2 transform -translate-y-1/2 hover:cursor-pointer" fill="none" onClick={() => setShowCategoryDropdown(true)} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </div>


                                    {showCategoryDropdown && filteredCategories.length > 0 && (
                                        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 shadow-lg overflow-y-auto max-h-32">
                                            {filteredCategories.map((op, index) => (
                                                <li
                                                    key={index}
                                                    className="px-4 py-2 text-md hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => handleCategoryItemClick(op)}
                                                >
                                                    {op}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Condition */}
                        <div className="sm:col-span-4 max-w-md ">
                            <div className="relative flex flex-col gap-1 mt-2" ref={conditionDropdownRef}>
                                <label
                                    htmlFor="condition"
                                    className="block text-md leading-6 text-slate-900"
                                >
                                    Condition
                                </label>
                                <div className="relative flex items-center" >
                                    <input
                                        type="text"
                                        value={form.condition}
                                        readOnly
                                        placeholder="Condition"
                                        className="flex-1 shadow-sm border-2 border-black focus:ring-2 focus:ring-uni-blue p-3 cursor-pointer  text-md"
                                        onClick={handleConditionToggleDropdown}
                                    />
                                    <svg className="z-0 w-5 h-5 ml-2 absolute right-3 top-1/2 transform -translate-y-1/2 hover:cursor-pointer" fill="none" onClick={handleConditionToggleDropdown} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                    {showConditionDropdown && (
                                        <ul className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 shadow-lg z-10">
                                            {conditions.map((condition, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() => handleConditionItemClick(condition)}
                                                    className="p-2 cursor-pointer text-md hover:bg-gray-200"
                                                >
                                                    {condition}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Images */}
                        <div className="sm:col-span-4">
                            <label
                                htmlFor="images"
                                className="block text-md leading-6 mt-2  text-slate-900"
                            >
                                Images
                            </label>
                            <input
                                type="file"
                                id="images"
                                name="images"
                                accept="image/*"
                                multiple
                                onChange={handleImageUpload}
                                className="block mt-2"
                            />
                            <div className="flex flex-wrap mt-4 gap-2">
                                {images.map((image, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt={`preview-${index}`}
                                            className="w-20 h-20 object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleImageRemove(index)}
                                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>

                        </div>

                    </div>
                </div>
                <button
                    type="submit"
                    className="block w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Submit
                </button>
            </form>
        </>
    );
};

export default CreateItem;















// app/page.tsx or your component file



// "use client"

// // components/GoogleSignInButton.tsx
// import { useEffect } from 'react';
// import supabase from '../lib/supabase';
// const GoogleSignInButton = () => {
//   useEffect(() => {
//     // Load the Google Sign-In script
//     const script = document.createElement('script');
//     script.src = 'https://accounts.google.com/gsi/client';
//     script.async = true;
//     document.body.appendChild(script);

//     script.onload = () => {
//       // Initialize Google Sign-In
//       window.google.accounts.id.initialize({
//         client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
//         callback: handleSignInWithGoogle,
//         ux_mode: 'popup',
//         auto_select: true,
//         itp_support: true,
//         use_fedcm_for_prompt: true,
//       });

//       // Render the Google Sign-In button
//       window.google.accounts.id.renderButton(
//         document.getElementById('google-sign-in-button'),
//         {
//           type: 'standard',
//           shape: 'pill',
//           theme: 'outline',
//           text: 'signin_with',
//           size: 'large',
//           logo_alignment: 'left',
//         }
//       );
//     };

//     return () => {
//       // Clean up script on component unmount
//       document.body.removeChild(script);
//     };
//   }, []);

//   // Handle sign-in response
//   async function handleSignInWithGoogle(response) {
//     try {
//       const { data, error } = await supabase.auth.signInWithIdToken({
//         provider: 'google',
//         token: response.credential,
//       });

//       if (error) {
//         console.error('Error signing in with Google:', error);
//       } else {
//         console.log('Signed in successfully:', data);
//       }
//     } catch (error) {
//       console.error('Unexpected error:', error);
//     }
//   }

//   return (
//     <div>
//       <div
//         id="g_id_onload"
//         data-client_id="<YOUR_CLIENT_ID>"
//         data-context="signin"
//         data-ux_mode="popup"
//         data-callback="handleSignInWithGoogle"
//         data-nonce=""
//         data-auto_select="true"
//         data-itp_support="true"
//         data-use_fedcm_for_prompt="true"
//       ></div>

//       <div
//         id="google-sign-in-button"
//         className="g_id_signin"
//         data-type="standard"
//         data-shape="pill"
//         data-theme="outline"
//         data-text="signin_with"
//         data-size="large"
//         data-logo_alignment="left"
//       ></div>
//     </div>
//   );
// };

// export default GoogleSignInButton;