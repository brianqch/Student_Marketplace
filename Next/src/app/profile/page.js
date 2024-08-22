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

                const { data, userError } = await supabase.auth.getSession();
                const user = data?.session?.user;


                const { data: userPublic, error } = await supabase
                    .from('users')
                    .select('*')
                    .eq('id', user.id);


                setUserData({
                    ...user,
                    ...userPublic[0]
                });

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
                            ),
                            user_id
                        `)
                    .eq('user_id', user.id);

                if (listingsError) throw listingsError;

                setUserListings(listings);

            } catch (error) {
                console.error('Error:', error.message);
            }
        }
        fetchUserData();
    }, [])


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