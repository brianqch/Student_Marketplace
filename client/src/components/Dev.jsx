import ProductCard from "./Shop Page/ProductCard"
import { useEffect, useState } from "react";
import supabase from "../supabaseClient";

export default function Dev() {
    const [items, setItems] = useState([]);

    // This method fetches the items from the database.
    useEffect(() => {
        async function getItems() {

            let { data: items, error } = await supabase
                .from('items')
                .select('*')
            if (error) {
                console.error('Error fetching items:', error);
            } else {
                console.log(items)
                setItems(items);
            }
        }
        getItems();
    }, []);

    function itemList() {
        return items.map((item) => {
            return (
                <ProductCard
                    item={item}
                    key={item.id}
                />
            );
        });
    }




    return (
        // product list ref: https://tailwindui.com/components/ecommerce/components/product-lists 
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Shop</h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {itemList()}
                </div>
            </div>
        </div>
    )
};