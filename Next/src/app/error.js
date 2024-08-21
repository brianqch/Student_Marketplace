// app/error.js
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Error({ error, reset }) {
    const router = useRouter();

    useEffect(() => {
        if (error.message.includes('Page not found')) {
            router.push('/not-found');
        }
    }, [error, router]);

    return (
        <div>
            <h2>Something went wrong!</h2>
            <button onClick={() => reset()}>Try again</button>
        </div>
    );
}
