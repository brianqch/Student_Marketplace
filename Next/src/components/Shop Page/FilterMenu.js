'use client'

import { useState, useEffect } from 'react'
// import axios from 'axios';
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
import ProductList from './ProductList';
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
    { name: 'All', href: '/shop' },
    { name: 'Clothes', href: '/shop/clothes' },
    { name: 'Electronics', href: '/shop/electronics' },
    { name: 'Appliances', href: '/shop/appliances' },
    { name: 'Furniture', href: '/shop/furniture' },
    { name: 'Household', href: '/shop/household' },
    { name: 'School Supplies', href: '/shop/school-supplies' },
    { name: 'Books', href: '/shop/books' },
];



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}



export default function FilterMenu({ params }) {
    const [filters, setFilters] = useState([
        {
            id: 'price',
            name: 'Price',
            options: [
                { value: '0-20', label: '$0 - $20', checked: false },
                { value: '20-50', label: '$20 - $50', checked: false },
                { value: '50-100', label: '$50 - $100', checked: false },
                { value: '100', label: '$100+', checked: false },
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
                { value: 'blue', label: 'Blue', checked: false },
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
                { value: '40l', label: '40L', checked: false },
            ],
        },
    ]);


    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [items, setItems] = useState([]);
    const category = params ? params.category : '';
    const upperCaseCategory = (category).charAt(0).toUpperCase() + (category).slice(1);
    const categoryTitle = category ? upperCaseCategory : "All Products";
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1); // Track the current page
    const pageSize = 8; // Number of items per page
    const [totalPages, setTotalPages] = useState(1); // Total number of pages

    const fetchTotalItemsCount = (count) => {
        // const { count } = await supabase
        //     .from('items')
        //     .select('*', { count: 'exact', head: true });

        const calculatedTotalPages = Math.ceil(count / pageSize);
        setTotalPages(calculatedTotalPages);
    };

    useEffect(() => {
        const { count } = supabase
            .from('items')
            .select('*', { count: 'exact', head: true });
        fetchTotalItemsCount(count); // Fetch total count on initial load
    }, []);



    useEffect(() => {
        setLoading(false);
    }, []);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const handleCheckboxChange = (sectionId, optionValue) => {
        // Update the filters state when a checkbox is clicked
        setFilters((prevFilters) =>
            prevFilters.map((section) => {
                if (section.id === sectionId) {
                    return {
                        ...section,
                        options: section.options.map((option) => {
                            if (option.value === optionValue) {
                                return { ...option, checked: !option.checked }; // Toggle the checked state
                            }
                            return option;
                        }),
                    };
                }
                return section;
            })
        );
    };


    if (loading) {
        return <div>Loading...</div>;
    }

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
                                            <a href={category.href} className={`block px-2 py-3`}>
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
                                                            value={option.value}
                                                            checked={option.checked}
                                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                                            name={`${section.id}[]`}
                                                            type="checkbox"
                                                            className="h-4 w-4 rounded border-gray-300 text-uni-blue focus:ring-uni-blue"
                                                            onChange={() => handleCheckboxChange(section.id, option.value)}

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

                        {/* <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left z-30">
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
                        </div> */}
                    </div>

                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-4">
                            {/* Filters */}
                            <form className="hidden lg:block">
                                <h3 className="sr-only">Categories</h3>
                                <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">

                                    {subCategories.map((category) => (
                                        <li key={category.name}>
                                            <a href={category.href} className={`${upperCaseCategory == category.name ? 'text-uni-blue font-bold' : 'hover:text-indigo-300'}`}>{category.name}</a>
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
                                                            value={option.value}
                                                            checked={option.checked}
                                                            id={`filter-${section.id}-${optionIdx}`}
                                                            name={`${section.id}[]`}
                                                            type="checkbox"
                                                            className="h-4 w-4 border-gray-300 text-uni-blue focus:ring-uni-blue"
                                                            onChange={() => handleCheckboxChange(section.id, option.value)}

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


                            {/* Product grid */}
                            <div className="lg:col-span-3">
                                <div className="bg-white flex flex-col justify-between">  {/* Use flexbox to arrange content */}
                                    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 flex-grow">
                                        <ProductList
                                            category={category}
                                            categoryTitle={categoryTitle}
                                            page={page}
                                            pageSize={pageSize}
                                            filters={filters}
                                            fetchTotalItemsCount={fetchTotalItemsCount}
                                        />
                                    </div>

                                    {/* Pagination */}
                                    <div className="flex justify-end mr-8">  
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