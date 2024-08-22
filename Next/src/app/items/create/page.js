"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import supabase from "../../../lib/supabase"; // Ensure you have Supabase client configured
import imageCompression from 'browser-image-compression'; // Import the image compression library

const CreateItem = ({ params }) => {
    const [form, setForm] = useState({
        title: "",
        price: "",
        location: "",
        category: "",
        condition: "",
        description: "",
        brand: ""
    });
    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null); // State for the selected image
    const [images, setImages] = useState([]);
    const [categoryVal, setCategoryVal] = useState('');
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [showConditionDropdown, setShowConditionDropdown] = useState(false);

    const router = useRouter();
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

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setImages((prevImages) => [...prevImages, ...files]);
        fileInputRef.current.value = null;
        if (files.length > 0) {
            setSelectedImage(URL.createObjectURL(files[0])); // Set the first uploaded image as selected
        }
    };

    const handleThumbnailClick = (image) => {
        setSelectedImage(URL.createObjectURL(image));
    };


    const handleImageRemove = (index) => {

        setImages((prevImages) => {
            const updatedImages = [...prevImages];
            updatedImages.splice(index, 1);
            if (updatedImages.length > 0) {
                setSelectedImage(URL.createObjectURL(updatedImages[updatedImages.length - 1])); // Select the last image
            } else {
                setSelectedImage(null); // No images left, clear selection
            }
            return updatedImages;
        });
    };

    const compressImage = async (file) => {
        const options = {
            maxSizeMB: 0.7, // Maximum size in MB
            maxWidthOrHeight: 800, // Maximum width or height
            useWebWorker: true, // Use web workers for faster compression
        };
        try {
            const compressedBlob = await imageCompression(file, options);
            const compressedFile = new File([compressedBlob], file.name, { type: file.type });

            console.log("Compressed")
            return compressedFile;
        } catch (error) {
            console.error("Error compressing image:", error);
            return file; // Return original file if compression fails
        }
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

    const onSubmit = async (e) => {
        e.preventDefault();
    

        try {
            const user = await supabase.auth.getUser();

            const newItem = { 
                ...form,
                user_id: user.data.user.id
            };
            // Insert item data into Supabase
            const { data, error } = await supabase
                .from('items')
                .insert(newItem)
                .select();

            if (error) throw error;

            const compressedImages = await Promise.all(
                images.map(file => compressImage(file))
            );

            setImages(compressedImages);

            console.log(data)
            const itemId = data[0].id; // Get the newly inserted item's ID
            // Handle image uploads
            if (compressedImages.length > 0) {
                const imageUrls = await uploadImagesToS3(compressedImages);
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
        <div>
            <form onSubmit={onSubmit}>
            <h2 className="text-xl font-semibold p-4 pl-20">Product Listing</h2>
                <div className="flex flex-col lg:flex-row gap-8 justify-center">
                    {/* Details Section */}
                    <div className="flex flex-col w-full max-w-2xl gap-4">
                        {/* Product Name */}
                        <div className="flex flex-col gap-1">
                            <span>Product Name</span>
                            <div className="flex border-2 border-slate-400">
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="e.g. Brand New Couch"
                                    className="block flex-1 border-0 bg-transparent pl-2 p-3 text-slate-900 transition focus:ring-4 focus-within:ring-uni-blue text-md"
                                    value={form.title}
                                    onChange={(e) => updateForm({ title: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between gap-2">
                            {/* Price */}
                            <div className="flex flex-col w-full sm:w-1/3 gap-1">
                                <label htmlFor="price" className="text-md text-slate-900">Price</label>
                                <div className="relative flex border-2   border-slate-400 ">
                                    <input
                                        type="number"
                                        name="price"
                                        placeholder="Enter price"
                                        id="price"
                                        min="0"
                                        className="w-3/4 flex-1 border-0 bg-transparent pl-6 p-3 text-slate-900 transition text-md focus:ring-4 focus-within:ring-uni-blue"
                                        value={form.price}
                                        onChange={(e) => updateForm({ price: e.target.value })}
                                    />
                                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-2">
                                        <span className="text-md text-slate-900">$</span>
                                    </div>
                                </div>
                            </div>

                            {/* Brand */}
                            <div className="flex flex-col w-full sm:w-2/3 gap-1">
                                <span>Brand</span>
                                <div className="relative border-2  border-slate-400">
                                    <input
                                        type="text"
                                        name="brand"
                                        id="brand"
                                        placeholder="e.g. IKEA"
                                        className="block flex-1 w-full border-0 bg-transparent pl-2 p-3 text-slate-900 transition  focus:ring-4 focus-within:ring-uni-blue text-md"
                                        value={form.brand}
                                        onChange={(e) => updateForm({ brand: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between gap-2">
                            {/* Category */}
                            <div className="sm:col-span-4 w-full sm:w-1/3">
                                <div className="relative flex flex-col gap-1">
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
                                                className="flex-1 shadow-sm text-md border-2 border-slate-400 transition focus:ring-2 focus:ring-uni-blue p-3 cursor-pointer"
                                                onClick={() => setShowCategoryDropdown(true)}
                                            />
                                            <svg className="z-0 w-5 h-5 ml-2 absolute right-3 top-1/2 transform -translate-y-1/2 hover:cursor-pointer" fill="none" onClick={() => setShowCategoryDropdown(true)} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                            </svg>
                                        </div>


                                        {showCategoryDropdown && filteredCategories.length > 0 && (
                                            <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 shadow-lg overflow-y-auto max-h-44 ">
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
                            <div className="sm:col-span-4 w-full sm:w-1/3">
                                <div className="relative flex flex-col gap-1" ref={conditionDropdownRef}>
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
                                            className="flex-1 shadow-sm border-2   border-slate-400 focus:ring-2 transition focus:ring-uni-blue p-3 cursor-pointer  text-md"
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

                            {/* Region */}
                            <div className="flex flex-col gap-1 w-full sm:w-1/3">
                                <span>Region</span>
                                <div className="flex border-2 border-slate-400 ">
                                    <input
                                        type="text"
                                        name="location"
                                        id="location"
                                        className="block flex-1 border-0 bg-transparent pl-2 p-3 text-slate-900 focus:ring-4 transition focus:ring-uni-blue text-md"
                                        placeholder="Northside, southside, etc."
                                        value={form.location}
                                        onChange={(e) => updateForm({ location: e.target.value })}
                                    />
                                </div>
                            </div>

                        </div>

                        {/* Description */}
                        <div className="flex flex-col gap-1">
                            <span>Description</span>
                            <div className="flex border-2  border-slate-400 ">
                                <textarea
                                    name="description"
                                    id="description"
                                    className="block h-40 w-full border-0 bg-transparent pl-2 p-3 text-slate-900 transition focus:ring-4 focus:ring-uni-blue text-md resize-none"
                                    placeholder="Describe the item, condition, and any special features..."
                                    value={form.description}
                                    onChange={(e) => updateForm({ description: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex mt-auto">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-uni-blue text-white border-2 border-slate-500 hover:bg-blue-500 transition-colors duration-150 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Publish
                            </button>
                        </div>

                    </div>

                    <div>
                        {/* Images */}
                        <div className="sm:col-span-4 gap-2">
                            <label
                                htmlFor="images"
                                className="block text-md"
                            >
                                Upload Images
                            </label>
                            <div className="flex flex-col sm:flex-row justify-start gap-2 mt-1">
                                <div className="relative aspect-square w-full sm:w-[30vw] max-w-[700px] max-h-[700px] bg-gray-100  flex items-center justify-center">
                                    <input
                                        type="file"
                                        id="images"
                                        name="images"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageUpload}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        ref={fileInputRef}
                                    />
                                    {selectedImage ? (
                                        <img
                                            src={selectedImage}
                                            alt="preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="text-center">
                                            <div className="text-5xl text-gray-400">
                                                <span className="plus-sign">+</span>
                                            </div>
                                            <p className="text-gray-500 mt-2">Upload Image</p>
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-row sm:flex-col">
                                    {(images.length > 0) ? (
                                        <div className="flex flex-row sm:flex-col gap-2">
                                            {images.map((image, index) => (
                                                <div key={index} className="relative w-20 h-20">
                                                    <img
                                                        src={URL.createObjectURL(image)}
                                                        alt={`preview-${index}`}
                                                        className="w-full h-full aspect-square object-cover hover:cursor-pointer"
                                                        onClick={() => handleThumbnailClick(image)} // Update preview on click

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
                                            <button
                                                type="button"
                                                onClick={() => document.getElementById('images').click()}
                                                className="relative w-20 h-20 bg-gray-100 border border-gray-300 flex items-center justify-center text-2xl text-gray-500"
                                            >
                                                +
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => document.getElementById('images').click()}
                                            className="relative w-20 h-20 bg-gray-100 border border-gray-300 flex items-center justify-center text-2xl text-gray-500"
                                        >
                                            +
                                        </button>
                                    )}
                                </div>


                            </div>
                        </div>
                    </div>
                </div>


            </form>
        </div>
    );


};

export default CreateItem;