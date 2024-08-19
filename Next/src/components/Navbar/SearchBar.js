import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FaSearch, FaUser, FaCaretDown, FaShoppingCart } from "react-icons/fa";
import Flex from "./Flex";
import { BsSuitHeartFill } from "react-icons/bs";
import useRouter from "next/router";
import Link from "next/link";
import supabase from "../../lib/supabase";

export default function SearchBar({ initialProducts = [] }) {
    const [items, setItems] = useState(initialProducts);
    const [filteredItems, setFilteredItems] = useState([]);
    const [show, setShow] = useState(false);
    const [showUser, setShowUser] = useState(false);
    const [placeholder, setPlaceholder] = useState(`Search for "Gray sectional couch"`);
    const router = useRouter;
    const ref = useRef();
    const paginationItems = [];
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        // Fetch items once when the component mounts
        const fetchItems = async () => {
            try {
                const { data: items, error: itemsError } = await supabase
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
                        items_images (
                            image_url_arr
                        )
                    `);

                if (itemsError) {
                    console.error('Error fetching items:', itemsError);
                    setItems([]);
                } else {
                    setItems(items);
                    setFilteredItems(items); // Initially set filtered items to all items
                }
            } catch (error) {
                console.error('Error:', error);
                setItems([]);
            }
        };

        fetchItems();
    }, []);

    useEffect(() => {
        // Filter items locally based on searchQuery
        const keywords = searchQuery.trim().split(/\s+/);
        const filtered = items.filter(item =>
            keywords.every(keyword =>
                item.title.toLowerCase().includes(keyword.toLowerCase())
            )
        );
        setFilteredItems(filtered);
    }, [searchQuery, items]);


    useEffect(() => {
        document.body.addEventListener("click", (e) => {
            if (ref.current && ref.current.contains(e.target)) {
                setShow(true);
            } else {
                setShow(false);
            }
        });
    }, [show, ref]);
    const [showSearchBar, setShowSearchBar] = useState(false);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const inputRef = useRef(null);

    const updatePlaceholder = () => {
        if (inputRef.current) {
            const width = inputRef.current.offsetWidth;

            if (width < 300) {
                setPlaceholder("Search");
            } else {
                setPlaceholder(`Search for "Gray sectional couch"`);
            }
        }
    }

    useEffect(() => {
        updatePlaceholder();
        window.addEventListener("resize", updatePlaceholder);

        return () => {
            window.removeEventListener("resize", updatePlaceholder);
        };
    }, []);

    return (
        <div className="relative w-full white flex items-center justify-between px-6 rounded-full">
            <div className="flex-1 rounded-full relative border-2 border-gray-200 transition-colors duration-300 ease-in-out focus-within:border-[#0064fa]">
                <input
                    className="w-full outline-0 placeholder:text-[#C4C4C4] placeholder:text-[14px] bg-transparent focus:ring-0 border-0"
                    type="text"
                    onChange={handleSearch}
                    value={searchQuery}
                    placeholder={placeholder}
                    ref={inputRef}
                />
                <button
                    type="submit"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 text-gray-400"
                // onClick={}
                >
                    <FaSearch className="w-5 h-5" />
                </button>
            </div>
            {searchQuery && (
                <div
                    className={`w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer`}
                >
                    {searchQuery &&
                        filteredItems.map((item) => (
                            <div
                                onClick={() =>
                                    router.push(
                                        `/product/${item.productName
                                            .toLowerCase()
                                            .split(" ")
                                            .join("")}`
                                    ) &
                                    setShowSearchBar(true) &
                                    setSearchQuery("")
                                }
                                key={item.id}
                                className="max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3"
                            >
                                <img className="w-24" src={item.items_images[0].image_url_arr} alt="productImg" />
                                <div className="flex flex-col gap-1">
                                    <p className="font-semibold text-lg">
                                        {item.title}
                                    </p>
                                    <p className="text-xs">
                                        {item.description.length > 100
                                            ? `${item.des.slice(0, 100)}...`
                                            : item.description}
                                    </p>
                                    <p className="text-sm">
                                        Price:{" "}
                                        <span className="font-semibold">
                                            ${item.price}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
}
