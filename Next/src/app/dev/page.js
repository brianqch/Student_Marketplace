"use client"
// src/app/dev/page.js or src/pages/dev.js
import supabase from '../../lib/supabase'; // Adjust the path as needed
import ProductCard from '../../components/Shop Page/ProductCard'; // Adjust the path as needed
import React, { useState, useEffect, useRef } from 'react';
// async function fetchItems() {
//     const { data: items, error } = await supabase.from('items').select('*');
//     if (error) {
//         console.error('Error fetching items:', error);
//         return [];
//     }
//     return items;
// }

// export default async function DevPage() {
//     const items = await fetchItems();

//     return (
//         <div className="bg-white">
//             <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
//                 <h2 className="text-2xl font-bold tracking-tight text-gray-900">Shop</h2>

//                 <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//                     {items.map((item) => (
//                         <ProductCard
//                             item={item}
//                             key={item.id}
//                         />
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }


const Carousel = () => {
    <div class="w-full inline-flex flex-nowrap">
    <ul class="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none">
        <li>
            <img src="./facebook.svg" alt="Facebook" />
        </li>
        <li>
            <img src="./disney.svg" alt="Disney" />
        </li>
        <li>
            <img src="./airbnb.svg" alt="Airbnb" />
        </li>
        <li>
            <img src="./apple.svg" alt="Apple" />
        </li>
        <li>
            <img src="./spark.svg" alt="Spark" />
        </li>
        <li>
            <img src="./samsung.svg" alt="Samsung" />
        </li>
        <li>
            <img src="./quora.svg" alt="Quora" />
        </li>
        <li>
            <img src="./sass.svg" alt="Sass" />
        </li>
    </ul>                
</div>
};

export default Carousel;
