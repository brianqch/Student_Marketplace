import React from "react";
import { useRouter } from 'next/navigation';

export default function CreateProductCard() {
    const router = useRouter();

    return (
            <div className="flex h-full lg:aspect-none bg-gray-200 bg-clip-border text-gray-700" onClick={() => router.push(`/items/create`)}>
                <div className="flex overflow-hidden items-center justify-center w-full bg-gray-200 bg-clip-border text-gray-700">
                    <svg className="fill-gray-400 justify-center" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
                </div>
            </div>
    );
}
