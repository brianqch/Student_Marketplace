'use client'

import { useState, useEffect } from 'react'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import ProductCard from '../../components/Shop Page/ProductCard'; // Adjust the path as needed
import supabase from '../../lib/supabase'; // Adjust the path as needed

import PaginationComponent from "../../components/Shop Page/PaginationComponent";

// Filter
const sortOptions = [
    { name: 'Most Popular', href: '#', current: true },
    { name: 'Best Rating', href: '#', current: false },
    { name: 'Newest', href: '#', current: false },
    { name: 'Price: Low to High', href: '#', current: false },
    { name: 'Price: High to Low', href: '#', current: false },
]
const subCategories = [
    { name: 'All', href: '#' },
    { name: 'Clothes', href: '#' },
    { name: 'Electronics', href: '#' },
    { name: 'Appliances', href: '#' },
    { name: 'Furniture', href: '#' },
    { name: 'Household', href: '#' },
    { name: 'School Supplies', href: '#' },
    { name: 'Books', href: '#' },
]
const filters = [
    {
        id: 'price',
        name: 'Price',
        options: [
            { value: '0-20', label: '$0 - $20', checked: false },
            { value: '20-50', label: '$20 - $50', checked: false },
            { value: '50-100', label: '$50 - $100', checked: false },
            { value: '100+', label: '$100+', checked: false },
        ],
    },
    {
        id: 'condition',
        name: 'Condition',
        options: [
            { value: 'New', label: 'New', checked: false },
            { value: 'Used - Like New', label: 'Used - Like New', checked: false },
            { value: 'Used - Good', label: 'Used - Good', checked: false },
            { value: 'Used - Fair', label: 'Used - Fair', checked: false },
        ],
    },
    {
        id: 'color',
        name: 'Color',
        options: [
            { value: 'white', label: 'White', checked: false },
            { value: 'beige', label: 'Beige', checked: false },
            { value: 'blue', label: 'Blue', checked: true },
            { value: 'brown', label: 'Brown', checked: false },
            { value: 'green', label: 'Green', checked: false },
            { value: 'purple', label: 'Purple', checked: false },
        ],
    },
    {
        id: 'size',
        name: 'Size',
        options: [
            { value: '2l', label: '2L', checked: false },
            { value: '6l', label: '6L', checked: false },
            { value: '12l', label: '12L', checked: false },
            { value: '18l', label: '18L', checked: false },
            { value: '20l', label: '20L', checked: false },
            { value: '40l', label: '40L', checked: true },
        ],
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function FilterMenu({}) {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1); // Track the current page
    const pageSize = 1; // Number of items per page
    const [totalPages, setTotalPages] = useState(1); // Total number of pages

    const fetchTotalItemsCount = async () => {
        const { count } = await supabase
            .from('items')
            .select('*', { count: 'exact', head: true });

        const calculatedTotalPages = Math.ceil(count / pageSize);
        setTotalPages(calculatedTotalPages);
    };

    useEffect(() => {
        fetchTotalItemsCount(); // Fetch total count on initial load
    }, []);


    useEffect(() => {
        const fetchItems = async () => {
            // setLoading(true);

            try {
                const start = (page - 1) * pageSize;
                const end = start + pageSize - 1;

                const { data: items, error: itemsError } = await supabase
                    .from('items')
                    .select(`
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
              `)
                    .range(start, end); // Add pagination range

                if (itemsError) {
                    console.error('Error fetching items:', itemsError);
                    setItems([]);
                } else {
                    console.log(items);
                    setItems(items);
                }
            } catch (error) {
                console.error('Error:', error);
                setItems([]);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, [page]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };


    return (
        <div className='z-15'>
            <div>
                {/* Mobile filter dialog */}
                <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                    />

                    <div className="fixed inset-0 z-40 flex">
                        <DialogPanel
                            transition
                            className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
                        >
                            <div className="flex items-center justify-between px-4">
                                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                <button
                                    type="button"
                                    onClick={() => setMobileFiltersOpen(false)}
                                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                                </button>
                            </div>

                            {/* Filters */}
                            <form className="mt-4 border-t border-gray-200">
                                <h3 className="sr-only">Categories</h3>
                                <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                                    {subCategories.map((category) => (
                                        <li key={category.name}>
                                            <a href={category.href} className="block px-2 py-3">
                                                {category.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>

                                {filters.map((section) => (
                                    <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                                        <h3 className="-mx-2 -my-3 flow-root">
                                            <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                <span className="font-medium text-gray-900">{section.name}</span>
                                                <span className="ml-6 flex items-center">
                                                    <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
                                                    <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
                                                </span>
                                            </DisclosureButton>
                                        </h3>
                                        <DisclosurePanel className="pt-6">
                                            <div className="space-y-6">
                                                {section.options.map((option, optionIdx) => (
                                                    <div key={option.value} className="flex items-center">
                                                        <input
                                                            defaultValue={option.value}
                                                            defaultChecked={option.checked}
                                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                                            name={`${section.id}[]`}
                                                            type="checkbox"
                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        />
                                                        <label
                                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                            className="ml-3 min-w-0 flex-1 text-gray-500"
                                                        >
                                                            {option.label}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </DisclosurePanel>
                                    </Disclosure>
                                ))}
                            </form>
                        </DialogPanel>
                    </div>
                </Dialog>

                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>

                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                        Sort
                                        <ChevronDownIcon
                                            aria-hidden="true"
                                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                        />
                                    </MenuButton>
                                </div>

                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    <div className="py-1">
                                        {sortOptions.map((option) => (
                                            <MenuItem key={option.name}>
                                                <a
                                                    href={option.href}
                                                    className={classNames(
                                                        option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                        'block px-4 py-2 text-sm data-[focus]:bg-gray-100',
                                                    )}
                                                >
                                                    {option.name}
                                                </a>
                                            </MenuItem>
                                        ))}
                                    </div>
                                </MenuItems>
                            </Menu>

                            <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                                <span className="sr-only">View grid</span>
                                <Squares2X2Icon aria-hidden="true" className="h-5 w-5" />
                            </button>
                            <button
                                type="button"
                                onClick={() => setMobileFiltersOpen(true)}
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon aria-hidden="true" className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <form className="hidden lg:block">
                                <h3 className="sr-only">Categories</h3>
                                <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                                    {subCategories.map((category) => (
                                        <li key={category.name}>
                                            <a href={category.href}>{category.name}</a>
                                        </li>
                                    ))}
                                </ul>

                                {filters.map((section) => (
                                    <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                                        <h3 className="-my-3 flow-root">
                                            <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                <span className="font-medium text-gray-900">{section.name}</span>
                                                <span className="ml-6 flex items-center">
                                                    <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
                                                    <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
                                                </span>
                                            </DisclosureButton>
                                        </h3>
                                        <DisclosurePanel className="pt-6">
                                            <div className="space-y-4">
                                                {section.options.map((option, optionIdx) => (
                                                    <div key={option.value} className="flex items-center">
                                                        <input
                                                            defaultValue={option.value}
                                                            defaultChecked={option.checked}
                                                            id={`filter-${section.id}-${optionIdx}`}
                                                            name={`${section.id}[]`}
                                                            type="checkbox"
                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        />
                                                        <label htmlFor={`filter-${section.id}-${optionIdx}`} className="ml-3 text-sm text-gray-600">
                                                            {option.label}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </DisclosurePanel>
                                    </Disclosure>
                                ))}
                            </form>

                            <div className="lg:col-span-3">
                                <div className="bg-white">
                                    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                                        <span>All products <span className="text-gray-600">({items ? items.length : 0} items)</span></span>

                                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                            {items.map((item) => (
                                                <ProductCard item={item} key={item.id} />
                                            ))}
                                        </div>
                                        {/* Pagination */}
                                        <PaginationComponent
                                            totalPages={totalPages}
                                            currentPage={page}
                                            handlePageChange={handlePageChange}
                                        />

                                    </div>
                                </div>
                            </div>





                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}









// "use client"
// // src/app/dev/page.js or src/pages/dev.js
// // import supabase from '../../lib/supabase'; // Adjust the path as needed
// // import ProductCard from '../../components/Shop Page/ProductCard'; // Adjust the path as needed
// // import React, { useState, useEffect, useRef } from 'react';

// // async function fetchItems() {
// //     const { data: items, error } = await supabase.from('items').select('*');
// //     if (error) {
// //         console.error('Error fetching items:', error);
// //         return [];
// //     }
// //     return items;
// // }

// // export default async function DevPage() {
// //     const items = await fetchItems();

// //     return (
// //         <div className="bg-white">
// //             <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
// //                 <h2 className="text-2xl font-bold tracking-tight text-gray-900">Shop</h2>

// //                 <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
// //                     {items.map((item) => (
// //                         <ProductCard
// //                             item={item}
// //                             key={item.id}
// //                         />
// //                     ))}
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }


// export async function getServerSideProps() {
//   // Fetch data from external API
//   const res = await fetch('https://api.github.com/repos/vercel/next.js')
//   const repo = await res.json()
//   // Pass data to the page via props
//   return { props: { repo } }
// }

// export default ImageCarousel;

// const GuideBlockButton = ({ link, isLeft, text }) => {
//   return (

//     <div className={`flex flex-row items-center justify-between max-w-40 bg-white border border-gray-500 rounded-full pl-4 w-full h-8`}>
//       <div className="flex flex-col justify-center">
//         <span className="text-sm font-semibold text-blue-700 ">{text}</span>
//       </div>
//       <button className="flex items-center justify-center aspect-square h-full bg-blue-500 rounded-full text-white text-xl font-bold">
//         &gt;
//       </button>
//     </div>



//   )
// }

// const GuideBlock = ({ text, textColor, buttonText, buttonTextColor, heightType, isLeft }) => {
//   const lines = text.split('\n').map((line, index) => (
//     <React.Fragment key={index}>
//       {line}
//       {index < text.split('\n').length - 1 && <br />}
//     </React.Fragment>
//   ));
//   return (
//     <div className={`${isLeft ? 'justify-start' : 'justify-end'} flex flex-row ${heightType === 'tall' ? 'h-60' : 'h-48'} bg-gray-300 border border-gray-500 rounded-lg p-6`}>
//         <div className="flex flex-col justify-end h-full w-full">
//             <span className={`text-xl sm:text-2xl md:text-3xl font-bold text-gray-700 break-words overflow-hidden ${isLeft ? 'text-left' : 'text-right'}`}>
//                 {lines}
//             </span>
//             <GuideBlockButton isLeft={isLeft} text={buttonText}></GuideBlockButton>
//         </div>
//     </div>
// );
// }

// export default function LandingPage() {
//   return (
//     <>
//       <div className="flex flex-col items-center justify-center">
//         {/* IMAGE CAROUSEL */}
//         <ImageCarousel></ImageCarousel>
//       </div>

//       {/* GUIDE BLOCKS */}
//       <div className="flex flex-col flex-wrap justify-center gap-5 md:px-52">
//         <div className="flex flex-col md:flex-row w-full gap-5">
//           <div className="md:basis-1/2 w-full gap-5">
//             <GuideBlock className="w-full" text={"NEW YEAR, \n NEW YOU"} buttonText={"Shop clothes"} heightType={"short"} isLeft={true} />
//           </div>
//           <div className="md:basis-1/2 w-full gap-5">
//             <GuideBlock className="w-full" text={"TECH FOR LESS"} buttonText={"Shop electronics"} heightType={"short"} isLeft={false} />
//           </div>
//         </div>
//         <div className="flex flex-col md:flex-row w-full gap-5">
//           <div className="md:basis-3/4 w-full">
//             <GuideBlock className="w-full" text={"THE MOVE-IN \n EDITION"} buttonText={"Shop home"} heightType={"tall"} isLeft={true} />
//           </div>
//           <div className="md:basis-1/4 w-full">
//             <GuideBlock className="w-full" text={"SOMETHING \n ELSE?"} buttonText={"Shop everything else"} heightType={"tall"} isLeft={false} />
//           </div>
//         </div>
//       </div>

//     </>

//   )
// }




// import React from 'react';



// CurvedBackground component with custom layout
// const SchoolShopContent = ({school}) => {
//   return (
//     <>
//       <div className="relative mx-[-25px] my-[-90px] z-[-1]">
//         {/* Image */}
//         <img src="/images/berkbackground.png"></img>


//         {/* Curved SVG */}
//         <img src="/curvedRec.svg" alt="Icon" className="my-[-60px]" />

//         {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 426"><path fill="#e4f0d4" d="M0 192.007v192.031l2.25-.489c12.01-2.612 74.544-4.649 142.75-4.65 147.416-.001 321.054 9.104 545.5 28.606 239.551 20.814 421.572 23.015 579 7.001 66.585-6.773 146.74-21.058 168-29.942l3.5-1.462V-.091l-3.25.545c-10.842 1.818-304.499 35.891-319.25 37.042-60.814 4.747-138.971 9.174-222 12.574-117.423 4.809-305.428.375-510.5-12.039C360.819 36.507 24.342 3.485 3.75.517L0-.024v192.031m.49.493c0 105.6.117 148.652.26 95.67.143-52.981.143-139.381 0-192C.607 43.552.49 86.9.49 192.5" fill-rule="evenodd"/></svg> */}

//         {/* Your Content */}
//       </div>
//       <div className="relative z-10 p-8 text-center text-white">
//         <h1 className="text-3xl font-bold">Your Content</h1>
//         <p className="text-md">Some description or other content.</p>
//       </div>

//     </>
//   );
// };

// Adding getLayout to CurvedBackground

// export default CurvedBackground;















// app/page.tsx or your component file



// "use client"

// // components/GoogleSignInButton.tsx
// import { useEffect } from 'react';
// import supabase from '../lib/supabase';
// const GoogleSignInButton = () => {
//   useEffect(() => {
//     // Load the Google Sign-In script
//     const script = document.createElement('script');
//     script.src = 'https://accounts.google.com/gsi/client';
//     script.async = true;
//     document.body.appendChild(script);

//     script.onload = () => {
//       // Initialize Google Sign-In
//       window.google.accounts.id.initialize({
//         client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
//         callback: handleSignInWithGoogle,
//         ux_mode: 'popup',
//         auto_select: true,
//         itp_support: true,
//         use_fedcm_for_prompt: true,
//       });

//       // Render the Google Sign-In button
//       window.google.accounts.id.renderButton(
//         document.getElementById('google-sign-in-button'),
//         {
//           type: 'standard',
//           shape: 'pill',
//           theme: 'outline',
//           text: 'signin_with',
//           size: 'large',
//           logo_alignment: 'left',
//         }
//       );
//     };

//     return () => {
//       // Clean up script on component unmount
//       document.body.removeChild(script);
//     };
//   }, []);

//   // Handle sign-in response
//   async function handleSignInWithGoogle(response) {
//     try {
//       const { data, error } = await supabase.auth.signInWithIdToken({
//         provider: 'google',
//         token: response.credential,
//       });

//       if (error) {
//         console.error('Error signing in with Google:', error);
//       } else {
//         console.log('Signed in successfully:', data);
//       }
//     } catch (error) {
//       console.error('Unexpected error:', error);
//     }
//   }

//   return (
//     <div>
//       <div
//         id="g_id_onload"
//         data-client_id="<YOUR_CLIENT_ID>"
//         data-context="signin"
//         data-ux_mode="popup"
//         data-callback="handleSignInWithGoogle"
//         data-nonce=""
//         data-auto_select="true"
//         data-itp_support="true"
//         data-use_fedcm_for_prompt="true"
//       ></div>

//       <div
//         id="google-sign-in-button"
//         className="g_id_signin"
//         data-type="standard"
//         data-shape="pill"
//         data-theme="outline"
//         data-text="signin_with"
//         data-size="large"
//         data-logo_alignment="left"
//       ></div>
//     </div>
//   );
// };

// export default GoogleSignInButton;