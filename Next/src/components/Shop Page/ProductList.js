'use client';
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';
import supabase from '../../lib/supabase';

export default function ProductList({ category, categoryTitle, page, pageSize, filters, fetchTotalItemsCount, loading, setLoading, sortBy}) {
    const [items, setItems] = useState([]);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {

        const MIN_LOADING_TIME = 500;
        const startLoadingTime = Date.now();


        const fetchItems = async () => {
            try {

                // Fetch items with a specific category
                const start = (page - 1) * pageSize;
                const end = start + pageSize - 1;


                let query = supabase
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
                `, { count: 'exact' })

                // Filter by category
                if (category) {
                    query.ilike('category', `%${category}%`);
                }

                if (sortBy) {
                    query.order(sortBy.column, {ascending: sortBy.ascending})
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

                const { data: items, count, itemsError } = await query;

                fetchTotalItemsCount(count)
                setTotalItems(count)

                if (itemsError) {
                    console.error('Error fetching items:', itemsError);
                    setItems([]);
                } else {
                    setItems(items);
                }

            } catch (error) {
                console.error('Error:', error);
                setItems([]);
            } finally {
                const loadingTime = Date.now() - startLoadingTime;
                const remainingLoadingTime = MIN_LOADING_TIME - loadingTime;

                if (remainingLoadingTime > 0) {
                    setTimeout(() => {
                        setLoading(false);
                    }, remainingLoadingTime);
                } else {
                    setLoading(false);
                }
            }
        };

        fetchItems();
    }, [category, page, filters, pageSize, fetchTotalItemsCount]);

    return (
        <div className="flex flex-col">
            <span>
                {categoryTitle}
                <span className="text-gray-600"> ({totalItems} items)</span>
            </span>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {loading ? (
                    // Display skeletons while loading
                    [...Array(pageSize)].map((_, index) => (
                        <ProductSkeleton key={index} />
                    ))
                ) : (
                    // Display actual product cards once loading is complete
                    items.map((item) => (
                        <ProductCard key={item.id} item={item} />
                    ))
                )}
            </div>
        </div>
    );
}
