'use client';
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import supabase from '../../lib/supabase';

export default function ProductList({ category, categoryTitle, page, pageSize, filters }) {
    const [items, setItems] = useState([]);




    useEffect(() => {
        const fetchItems = async () => {
            try {
                // Fetch items with a specific category
                const start = (page - 1) * pageSize;
                const end = start + pageSize - 1;

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
                        brand,
                        items_images (
                            image_url_arr
                        )
                    `)

                // Filter by category
                if (category) {
                    query.ilike('category', `%${category}%`);
                }

                // Filter by price 
                const selectedPrices = filters
                    .find((filter) => filter.id === 'price')
                    ?.options.filter((option) => option.checked);

                const priceFilter = [];
                selectedPrices.forEach((price) => {
                    const [min, max] = price.value.split('-');
                
                    if (max) {
                        // Add condition for range
                        priceFilter.push(`and(price.gte.${min},price.lte.${max})`);
                    } else {
                        // Add condition for single value
                        priceFilter.push(`price.gte.${min}`);
                    }
                });

                if (priceFilter.length > 0) {
                    query.or(priceFilter.join(','))
                }

                // Filter by condition
                const selectedCondition = filters
                    .find((filter) => filter.id === 'condition')
                    ?.options.filter((option) => option.checked);
                
                const conditionFilter = []
                selectedCondition.forEach((condition) => {
                    conditionFilter.push(`condition.eq.${condition.value}`)
                });
                
                if (conditionFilter.length > 0) {
                    query.or(conditionFilter.join(','))
                }


                
                // Pagination
                query.range(start, end);


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
    }, [category, page, filters]);
    


    return (

        <div>
            <span>
                {categoryTitle}
                <span className="text-gray-600"> ({items ? items.length : 0} items)</span>
            </span>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((item) => (
                    <ProductCard
                        key={item.id}
                        item={item}
                    />
                ))}
            </div>

        </div>

    )
}