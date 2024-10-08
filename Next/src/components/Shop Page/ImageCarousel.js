
import { Card, CardContent } from "../ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel"
import React from 'react';
import supabase from '../../lib/supabase'; // Adjust the path as needed


async function fetchData() {
    const { data: items, error } = await supabase
        .from('items')
        .select(`
            id,
            title,
            created_at,
            items_images (
                image_url_arr
            )
        `)
        .order('created_at', { ascending: false }) // Order by created_at in descending order
        .limit(5); // Limit the number of results to 5


    if (error) {
        console.error('Error fetching items:', error);
        return [];
    } else {
        return items;
    }
};


function getTimeAgo(createdAt) {
    const now = new Date().getTime(); // Get current time in milliseconds
    const timestamp = new Date(createdAt).getTime(); // Convert createdAt to milliseconds

    // Check if the timestamp is in the future
    if (timestamp > now) {
        return 'Just now';
    }

    const seconds = Math.floor((now - timestamp) / 1000);

    if (seconds < 60) {
        return `${seconds} second(s) ago`;
    } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        return `${minutes} minute(s) ago`;
    } else if (seconds < 86400) {
        const hours = Math.floor(seconds / 3600);
        return `${hours} hour(s) ago`;
    } else {
        const days = Math.floor(seconds / 86400);
        return `${days} day(s) ago`;
    }
}


export default async function ImageCarousel() {
    const data = await fetchData();

    return (
        <Carousel
            opts={{
                align: "center",
                loop: true,
            }}
            className="w-[40vw] max-w-2xl max-h-xl"
        >
            <CarouselContent>
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                            <div className="p-1 flex flex-col">
                                <Card className="w-full h-full flex flex-col"> {/* Added 'flex' and 'flex-col' */}
                                    <CardContent className="flex-1 p-0"> {/* Make the content area flexible */}
                                        <img
                                            src={
                                                item.items_images[0].image_url_arr[0]
                                            }
                                            className="h-full w-full object-cover aspect-square overflow-hidden" // Ensure the image covers the card
                                            alt='/images/missing.png'
                                        />
                                    </CardContent>
                                </Card>
                                <p className="pt-1 text-sm text-gray-400 overflow-hidden whitespace-nowrap text-ellipsis">{item.title}</p>
                                <p className="text-sm text-gray-400">{getTimeAgo(item.created_at)}</p>
                            </div>
                        </CarouselItem>
                    ))
                ) : (
                    <p>No items available</p>
                )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}
