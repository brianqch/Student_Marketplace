"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import supabase from "../../../lib/supabase";
import ProductCard from "../../../components/Shop Page/ProductCard";

export default function Profile({ params }) {
    const [userData, setUserData] = useState();
    const [userListings, setUserListings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [index, setIndex] = useState(0);

    const toggleView = () => {
        setIndex((prevIndex) => (prevIndex === 0 ? 1 : 0)); // Switches between 0 and 1
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = params.id;

                const { data: userPublic, error } = await supabase
                    .from("users")
                    .select("*")
                    .eq("id", userId)
                    .single();

                if (error) throw error;

                setUserData({
                    // ...user,
                    ...userPublic,
                });

                console.log(userPublic);

                const { data: listings, error: listingsError } = await supabase
                    .from("items")
                    .select(
                        `
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
                        `
                    )
                    .eq("user_id", userId);

                if (listingsError) throw listingsError;

                setUserListings(listings);
            } catch (error) {
                console.error("Error:", error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    return (
        <>
            <main className="flex mt-10 lg:mt-40 py-4 w-full">
                {userData && (
                    <div className="flex flex-col lg:mx-[30%] w-full">
                        <div className="flex flex-row min-w-[500px] justify-center lg:justify-between lg:items-start">
                            <div className="flex items-center">
                                <img className="rounded-full bg-gray-800 w-[90px] h-[90px]" />
                                <div className="flex flex-col ml-8">
                                    <span className="text-[30px] -mb-1">{userData.name}</span>
                                    {/* Change to username */}
                                    <span className="text-[18px] -mb-1">{`@${userData.usertag}`}</span>

                                    {/* Change to rating? */}
                                    <span className="text-[18px]">{`Joined: ${new Date(
                                        userData.join_date
                                    ).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        day: "numeric",
                                        month: "long",
                                    })}`}</span>
                                </div>
                            </div>
                            <div>
                                <button className="border-2 border-black px-3 py-[2px] mt-2 text-[18px]">
                                    Edit Profile
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col mt-10">
                            {/* <div className="flex flex-wrap py-5 w-60">
                                {userListings.length > 0 ? (
                                    userListings.map((item) => (

                                        <ProductCard key={item.id} item={item} />
                                        // <div></div>
                                    ))
                                ) : (
                                    <span>No listings found.</span>
                                )}
                            </div> */}

                            <div className="flex justify-around relative">
                                {/* Button for Listings */}
                                <button
                                    className={`relative z-10 py-2 px-4 ${index === 0 ? "font-bold" : "text-gray-600"
                                        }`}
                                    onClick={() => setIndex(0)}
                                >
                                    Listings
                                </button>

                                {/* Button for Saved */}
                                <button
                                    className={`relative z-10 py-2 px-4 ${index === 1 ? "font-bold" : "text-gray-600"
                                        }`}
                                    onClick={() => setIndex(1)}
                                >
                                    Saved
                                </button>

                                {/* Sliding focus bar */}
                                <motion.div
                                    className="absolute bottom-0 h-1 bg-uni-blue rounded"
                                    layout
                                    initial={{ x: -100, width: 50 }}
                                    animate={{
                                        width: index === 0 ? "50%" : "50%",
                                        x: index === 0 ? "-50%" : "50%",
                                    }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>

                            {index == 0 ? (
                                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {loading
                                        ? // Display skeletons while loading
                                        [...Array(5)].map((_, index) => (
                                            <ProductSkeleton key={index} />
                                        ))
                                        : // Display actual product cards once loading is complete
                                        userListings.map((item) => (
                                            <ProductCard key={item.id} item={item} />
                                        ))}
                                </div>
                            ) : (
                                <div>Saved listings placeholder</div>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}
