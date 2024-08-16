'use client';
import React, {useState, useEffect} from 'react';
import ProductCard from './ProductCard';
import supabase from '../../lib/supabase';

export default function ProductList({ category }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                // Fetch items with a specific category
                const query = supabase
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

                if (category) {
                    query.ilike('category', `%${category.category}%`);
                }


                const { data: items, error: itemsError } = await query;

                if (itemsError) {
                    console.error('Error fetching items:', itemsError);
                    setItems([]);
                } else {
                    // console.log(items[0]);
                    setItems(items);
                }
            } catch (error) {
                console.error('Error:', error);
                setItems([]);
            }
        };

        fetchItems();
    }, [category]);


    return (
        <div className="lg:col-span-3">{
            <div className="bg-white">

                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <span >All products <span className="text-gray-600">({items ? items.length : 0} items)</span></span>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {items.map((item) => (
                            <ProductCard
                                key={item.id}
                                item={item}
                            />
                        ))}
                    </div>
                </div>
            </div>

        }</div>
    )
}