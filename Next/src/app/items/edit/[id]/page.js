"use client"; // Mark this as a client component
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import supabase from '../../../../lib/supabase';

const EditItem = ({ params }) => {
    const [form, setForm] = useState({
        title: "",
        price: "",
        location: "",
        category: "",
        condition: "",
        description: ""
    });

    const router = useRouter();
    const { id } = params; // Changed from params to router.query
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
    
    const [categoryVal, setCategoryVal] = useState("");
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [showConditionDropdown, setShowConditionDropdown] = useState(false);

    const categoryDropdownRef = useRef(null);
    const conditionDropdownRef = useRef(null);

    const filteredCategories = categories.filter((item) =>
        item.toLowerCase().includes(categoryVal.toLowerCase())
    );

    const handleCategoryInputChange = (e) => {
        setCategoryVal(e.target.value)
        form.category = e.target.value;
        setShowCategoryDropdown(true);
    };

    const handleCategoryItemClick = (item) => {
        setCategoryVal(item)

        form.category = item;
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
    async function fetchData() {
      if (id) {
        const { data: item, error } = await supabase
          .from('items')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) {
          console.error('Error fetching item:', error);
          router.push("/"); // Redirect to home or error page
          return;
        }
        setForm(item);
        setCategoryVal(item.category);
      } else {
        // Handle case when id is null or undefined
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

    async function onSubmit(e) {
        e.preventDefault();
        const updatedItem = { ...form };
    
        try {
          const { error } = await supabase
            .from('items')
            .update(updatedItem)
            .eq('id', id);
    
          if (error) {
            throw error;
          }
          router.push("/"); // Redirect to home or another page after submission
        } catch (error) {
          console.error('A problem occurred with your Supabase operation:', error.message);
        }
      }
    
    return (
        <>
            <h2 className="text-xl font-semibold p-4">Item For Sale</h2>
            <form
                onSubmit={onSubmit}
                className="border rounded-lg p-4"
            >
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
                    <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
                        <div className="sm:col-span-4">
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md p-3">
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        className="block border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 placeholder:text-lg text-lgfocus:ring-0 "
                                        placeholder="Title"
                                        value={form.title}
                                        onChange={(e) => updateForm({ title: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md p-3">
                                    <span className="block flex border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 placeholder:text-lg focus:ring-0 text-lg sm:leading-6">$</span>
                                    <input
                                        type="text"
                                        name="price"
                                        id="price"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 placeholder:text-lg focus:ring-0 text-lg sm:leading-6"
                                        placeholder="0.00"
                                        value={form.price}
                                        onChange={(e) => updateForm({ price: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md p-3">
                                    <input
                                        type="text"
                                        name="description"
                                        id="description"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 placeholder:text-lg focus:ring-0 text-lg h-full sm:leading-6"
                                        placeholder="Description"
                                        value={form.description}
                                        onChange={(e) => updateForm({ description: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md p-3">
                                    <input
                                        type="text"
                                        name="location"
                                        id="location"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 placeholder:text-lg focus:ring-0 text-lg sm:leading-6"
                                        placeholder="Location"
                                        value={form.location}
                                        onChange={(e) => updateForm({ location: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Category */}
                        <div className="sm:col-span-4">
                            <div className="relative flex flex-col">
                                <label
                                    htmlFor="category"
                                    className="block text-sm font-medium leading-6 text-slate-900"
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
                                            className="flex-1 rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-indigo-600 p-3"
                                            onFocus={() => setShowCategoryDropdown(true)}
                                        />
                                        <svg className="w-5 h-5 ml-2 absolute right-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </div>


                                    {showCategoryDropdown && filteredCategories.length > 0 && (
                                        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg overflow-y-auto max-h-32">
                                            {filteredCategories.map((op, index) => (
                                                <li
                                                    key={index}
                                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
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
                        <div className="relative inline-block text-left" ref={conditionDropdownRef}>
                            <div>
                                <label
                                    htmlFor="condition"
                                    className="block text-sm font-medium leading-6 text-slate-900"
                                >
                                    Condition
                                </label>
                                <button
                                    type="button"
                                    className="mt-1 flex items-center justify-between w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900"
                                    onClick={handleConditionToggleDropdown}
                                >
                                    {form.condition || 'Select Condition'}
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </button>
                            </div>
                            {showConditionDropdown && (
                                <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                                    {conditions.map((op, index) => (
                                        <li
                                            key={index}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => handleConditionItemClick(op)}
                                        >
                                            {op}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>


                    </div>


                    <div>
                        <span>Listing preview placeholder</span>
                    </div>

                </div>
                <input
                    type="submit"
                    value="Submit"
                    className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
                />
            </form>
        </>
    );
}

export default EditItem;
