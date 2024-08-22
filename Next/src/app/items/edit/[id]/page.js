"use client"; // Mark this as a client component
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import supabase from '../../../../lib/supabase';
import imageCompression from 'browser-image-compression'; // Import the image compression library

const EditItem = ({ params }) => {
    const [form, setForm] = useState({
        title: "",
        price: "",
        location: "",
        category: "",
        condition: "",
        description: "",
        brand: "",
    });

    const [images, setImages] = useState([]);
    const [originalImages, setOriginalImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);


    const router = useRouter();
    const { id } = params;
    const conditions = ["New", "Used - Like New", "Used - Good", "Used - Fair"];
    const categories = [
        "Antiques & Collectibles", "Arts & Crafts", "Auto Parts & Accessories",
        "Baby Products", "Books, Movies & Music", "Cell Phones & Accessories",
        "Clothing, Shoes & Accessories", "Computers & Tablets", "Electronics",
        "Furniture", "Health & Beauty", "Home & Garden", "Jewelry & Watches",
        "Musical Instruments", "Office Supplies", "Pet Supplies",
        "Sports & Outdoors", "Tools & Home Improvement", "Toys & Hobbies",
        "Video Games & Consoles"
    ];

    const [categoryVal, setCategoryVal] = useState("");
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [showConditionDropdown, setShowConditionDropdown] = useState(false);

    const categoryDropdownRef = useRef(null);
    const conditionDropdownRef = useRef(null);
    const fileInputRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const filteredCategories = categories.filter((item) =>
        item.toLowerCase().includes(categoryVal.toLowerCase())
    );

    const handleCategoryInputChange = (e) => {
        setCategoryVal(e.target.value);
        setForm(prev => ({ ...prev, category: e.target.value }));
        setShowCategoryDropdown(true);
    };

    const handleCategoryItemClick = (item) => {
        setCategoryVal(item);
        setForm(prev => ({ ...prev, category: item }));
        setShowCategoryDropdown(false);
    };

    const handleConditionToggleDropdown = () => {
        setShowConditionDropdown(prev => !prev);
    };

    const handleConditionItemClick = (item) => {
        setForm(prev => ({ ...prev, condition: item }));
        setShowConditionDropdown(false);
    };

    const handleThumbnailClick = (image, index) => {
        setSelectedImage(image);
        setCurrentIndex(index);
    };


    const handleImageRemove = (index) => {

        setImages((prevImages) => {
            const updatedImages = [...prevImages];
            updatedImages.splice(index, 1);
            if (updatedImages.length > 0) {
                setSelectedImage(updatedImages[updatedImages.length - 1]); // Select the last image
            } else {
                setSelectedImage(null); // No images left, clear selection
            }
            return updatedImages;
        });
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
                        )
                    `)
                    .eq('id', id)
                    .single();

                if (error) {
                    console.error('Error fetching item:', error);
                    router.push("/"); // Redirect to home or error page
                    return;
                }

                const { title, price, location, category, condition, description, items_images } = item;

                setForm({
                    title,
                    price,
                    location,
                    category,
                    condition,
                    description,
                });
                if (items_images.length > 0) {
                    setOriginalImages(items_images[0].image_url_arr);
                    const imageUrls = items_images[0].image_url_arr;
                    setImages(imageUrls)
                    if (imageUrls.length > 0) {
                        setSelectedImage(imageUrls[(imageUrls.length - 1)])
                    }
                }



                setCategoryVal(item.category);

            } else {
                console.log('ID is null or undefined');
            }
        }
        fetchData();
    }, [id, router]);

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

    async function handleImageUpload(e) {
        const files = Array.from(e.target.files);
        const uploadedUrls = [];

        for (const file of files) {
            // Create a URL for the file using URL.createObjectURL
            // const url = URL.createObjectURL(file);
            uploadedUrls.push(file);
        }
        console.log(uploadedUrls)
        setImages([...images, ...uploadedUrls]);

        if (uploadedUrls.length > 0) {
            setSelectedImage(URL.createObjectURL(uploadedUrls[uploadedUrls.length - 1])); // Set the first uploaded image as selected
        } else {
            setSelectedImage(null); // No images left, clear selection
        }


    }

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
        console.log(images)
        const imageUrls = [];

        for (const file of images) {
            if (!(file instanceof File)) {
                throw new Error('Item in images array is not a File object');
            }

            const fileName = file.name;
            const contentType = file.type;
            const timestamp = Date.now();

            try {
                // Get a pre-signed URL from your server
                const presignedUrl = await getPresignedUrl(fileName, contentType, timestamp);

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
                const imageUrl = presignedUrl.split('?')[0]; // Use presigned URL directly or adjust if needed
                imageUrls.push(imageUrl);
            } catch (error) {
                console.error('Error uploading image:', error);
                throw error;
            }
        }

        return imageUrls;
    };

    async function deleteImages() {
        const imagesToDelete = originalImages.filter(image => !images.includes(image));

        if (imagesToDelete.length === 0) {
            return;
        }

        try {
            const response = await fetch('/api/deleteImages', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ imagesToDelete }),
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || 'Failed to delete images');
            }

            console.log('Deleted images:', result.Deleted);
        } catch (error) {
            console.error('Error deleting images:', error);
        }
    }

    async function updateImages() {
        const imagesNotInOriginalImages = images.filter(image => !originalImages.includes(image));
        const imagesInOriginalImages = images.filter(image => originalImages.includes(image));

        // Initialize array to store URLs
        let imageUrls = [...imagesInOriginalImages]; // Start with existing URLs

        try {
            await deleteImages(); // Make sure this function handles image removal from S3

            if (imagesNotInOriginalImages.length > 0) {
                const compressedImages = await Promise.all(
                    imagesNotInOriginalImages.map(file => compressImage(file))
                );

                const newImageUrls = await uploadImagesToS3(compressedImages);

                imageUrls = [...imageUrls, ...newImageUrls];
                console.log(imageUrls)
            }


            const { data, error: imagesUpdateError } = await supabase
                .from('items_images')
                .update({ image_url_arr: imageUrls })
                .eq('item_id', id)
                .select()


            if (imagesUpdateError) {
                throw imagesUpdateError;
            }

        } catch (error) {
            console.error('A problem occurred with your Supabase operation:', error.message);
        }
    }





    async function onSubmit(e) {
        e.preventDefault();
        try {
            // Update item details
            const { error: itemUpdateError } = await supabase
                .from('items')
                .update(form)
                .eq('id', id);

            if (itemUpdateError) {
                throw itemUpdateError;
            }

            updateImages();

            // Redirect to another page
            router.push("/"); // Redirect to home or another page after submission
        } catch (error) {
            console.error('A problem occurred with your Supabase operation:', error.message);
        }
    }


    return (
        <div>
            <h2 className="text-xl font-semibold p-4 pl-20">Product Listing Edit</h2>

            <div className="flex flex-col lg:flex-row gap-8 justify-center">
                {/* Form Section */}
                <div className="flex flex-row w-full max-w-2xl gap-4">
                    <form onSubmit={onSubmit} className="flex flex-col gap-4 w-full">
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

                        {/* Price and Brand */}
                        <div className="flex flex-col sm:flex-row justify-between gap-2">
                            {/* Price */}
                            <div className="flex flex-col w-full sm:w-1/3 gap-1">
                                <label htmlFor="price" className="text-md text-slate-900">Price</label>
                                <div className="relative flex border-2 border-slate-400">
                                    <input
                                        type="number"
                                        name="price"
                                        id="price"
                                        placeholder="Enter price"
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
                                <div className="relative border-2 border-slate-400">
                                    <input
                                        type="text"
                                        name="brand"
                                        id="brand"
                                        placeholder="e.g. IKEA"
                                        className="block flex-1 w-full border-0 bg-transparent pl-2 p-3 text-slate-900 transition focus:ring-4 focus-within:ring-uni-blue text-md"
                                        value={form.brand}
                                        onChange={(e) => updateForm({ brand: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Category, Condition, and Location */}
                        <div className="flex flex-col sm:flex-row justify-between gap-2">
                            {/* Category */}
                            <div className="sm:col-span-4 w-full sm:w-1/3">
                                <div className="relative flex flex-col gap-1">
                                    <label htmlFor="category" className="block text-md leading-6 text-slate-900">Category</label>
                                    <div ref={categoryDropdownRef} className="relative">
                                        <input
                                            type="text"
                                            id="category"
                                            placeholder="Select category"
                                            className="flex-1 border-2 border-slate-400 bg-transparent p-3 text-slate-900 transition focus:ring-4 focus-within:ring-uni-blue"
                                            value={categoryVal}
                                            onChange={handleCategoryInputChange}
                                            onFocus={() => setShowCategoryDropdown(true)}
                                        />
                                        {showCategoryDropdown && filteredCategories.length > 0 && (
                                            <div className="absolute z-20 mt-2 max-h-60 w-full overflow-auto bg-white border border-gray-300 shadow-lg">
                                                {filteredCategories.map((item) => (
                                                    <div
                                                        key={item}
                                                        onClick={() => handleCategoryItemClick(item)}
                                                        className="cursor-pointer p-2 hover:bg-gray-100"
                                                    >
                                                        {item}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Condition */}
                            <div className="sm:col-span-4 w-full sm:w-1/3">
                                <div className="relative flex flex-col gap-1">
                                    <label htmlFor="condition" className="block text-md leading-6 text-slate-900">Condition</label>
                                    <div ref={conditionDropdownRef} className="relative">
                                        <input
                                            type="text"
                                            id="condition"
                                            placeholder="Select condition"
                                            className="flex-1 border-2 border-slate-400 bg-transparent p-3 text-slate-900 transition focus:ring-4 focus-within:ring-uni-blue"
                                            value={form.condition}
                                            onClick={handleConditionToggleDropdown}
                                            readOnly
                                        />
                                        {showConditionDropdown && (
                                            <div className="absolute z-20 mt-2 max-h-60 w-full overflow-auto bg-white border border-gray-300 shadow-lg">
                                                {conditions.map((item) => (
                                                    <div
                                                        key={item}
                                                        onClick={() => handleConditionItemClick(item)}
                                                        className="cursor-pointer p-2 hover:bg-gray-100"
                                                    >
                                                        {item}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>


                            {/* Location */}
                            <div className="w-full sm:w-1/3">
                                <div className="relative flex flex-col gap-1">
                                    <label htmlFor="location" className="block text-md leading-6 text-slate-900">Location</label>
                                    <div className="relative flex">
                                        <input
                                            type="text"
                                            id="location"
                                            placeholder="Enter location"
                                            className="flex-1 border-2 border-slate-400 bg-transparent p-3 text-slate-900 transition focus:ring-4 focus-within:ring-uni-blue"
                                            value={form.location}
                                            onChange={(e) => updateForm({ location: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="description" className="block text-md leading-6 text-slate-900">Description</label>
                            <textarea
                                id="description"
                                placeholder="Enter item description"
                                className="block border-2 border-slate-400 bg-transparent p-3 text-slate-900 transition focus:ring-4 focus-within:ring-uni-blue"
                                rows="5"
                                value={form.description}
                                onChange={(e) => updateForm({ description: e.target.value })}
                            />
                        </div>
                        <div className="flex justify-start">

                            <button
                                type="submit"
                                className="w-auto px-4 py-2 bg-blue-500 text-white"
                            >
                                Update Item
                            </button>
                        </div>
                    </form>
                </div>

                {/* Images Section */}
                <div>
                    <div className="flex flex-col">
                        <label htmlFor="images" className="block text-md">Edit Images</label>
                        <div className="flex flex-col sm:flex-row gap-2 mt-1">
                            {/* Image Preview */}
                            <div className="relative aspect-square sm:w-[30vw] max-w-[700px] max-h-[700px] bg-gray-100 flex items-center justify-center">
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

                            {/* Thumbnails */}
                            <div className="flex flex-row sm:flex-col">
                                {images.length > 0 ? (
                                    <div className="flex flex-row sm:flex-col gap-2">
                                        {images.map((image, index) => (
                                            <div key={index} className="relative w-20 h-20">
                                                <img
                                                    src={image}
                                                    alt={`preview-${index}`}
                                                    className={`w-full h-full aspect-square object-cover hover:cursor-pointer ${index === currentIndex ? 'border-2 border-uni-blue' : ''}`}
                                                    onClick={() => handleThumbnailClick(image, index)}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleImageRemove(index)}
                                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center"
                                                >
                                                    x
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
        </div>
    );

};

export default EditItem;
