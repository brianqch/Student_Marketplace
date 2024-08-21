"use client";
import React, { useState, useEffect } from "react";
import supabase from "../../lib/supabase";
import ProductCard from "../../components/Shop Page/ProductCard";

export default function Profile() {
    const [userData, setUserData] = useState();
    const [userListings, setUserListings] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = (await supabase.auth.getUser()).data.user;

                const { data: userPublic, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', user.id);
            
                
                setUserData({
                    ...user,
                    ...userPublic[0]
                });

                const listingIds = userPublic[0]?.listing_ids || [];

                if (listingIds.length > 0) {
                    // Fetch user's listings based on listing_ids
                    const { data: listings, error: listingsError } = await supabase
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
                        .in('id', listingIds);

                    if (listingsError) throw listingsError;

                    setUserListings(listings);
                }

            } catch (error) {
                console.error('Error:', error.message);
            }
        }
        fetchUserData();
    }, [])

    console.log(userData);
    console.log(userListings);

    return (
        <>
            <main className="flex h-screen py-4">
                {userData ? (
                    <div className="flex flex-col">
                        <span>{`Name: ${userData.name}`}</span>
                        <span>{`Email: ${userData.email}`}</span>
                        <span>{`Joined: ${new Date(userData.created_at).toLocaleDateString('en-US', { year: 'numeric', day: 'numeric', month: 'long' })}`}</span>
                        <div className="flex flex-col mt-4">
                            <span>Listings:</span>
                            <div className="flex flex-wrap py-5">
                                {userListings.length > 0 ? (
                                    userListings.map((item) => (
                                        
                                        <ProductCard key={item.id} item={item} />
                                        // <div></div>
                                    ))
                                ) : (
                                    <span>No listings found.</span>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <span>Loading...</span> // Show a loading state while fetching data
                )}

            </main>
        </>
    )
}