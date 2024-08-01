
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import React from 'react';
import supabase from '../../lib/supabase'; // Adjust the path as needed


async function fetchData() {
    const { data: items, error } = await supabase.from('items').select('*');
    if (error) {
        console.error('Error fetching items:', error);
        return [];
    } else {
        return items;
    }
};

export default async function ImageCarousel() {
    const data = await fetchData();

    return (

        <Carousel
            opts={{
                align: "center",
                loop: true,
            }}
            className="w-full max-w-2xl max-h-xl"
        >
            <CarouselContent>
                {data.map((item, index) => (
                    <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                        <div className="p-1">
                            <Card className="w-full h-full">
                                <CardContent className="flex items-center justify-center p-10">
                                    <span className="text-4xl font-semibold">{item.id}</span>
                                </CardContent>
                            </Card>
                            <p className="pt-1 text-[14px] text-[#959595]">Just now</p>
                        </div>

                    </CarouselItem>

                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

// return (
//     <Carousel
//         opts={{
//             align: "center",
//             loop: true,
//         }}
//         className="w-full max-w-2xl max-h-xl"
//     >
//         <CarouselContent>
//             {data.map((item, index) => (
//                 <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/5">
//                     <div className="p-1">
//                         <Card className="w-full h-full">
//                             <CardContent className="flex items-center justify-center p-10">
//                                 <img
//                                     src={item.imageUrl} // Display the image
//                                     alt={`Image ${index + 1}`} // Alt text for accessibility
//                                     className="w-full h-full object-cover" // Adjust classes as needed
//                                 />
//                             </CardContent>
//                         </Card>
//                     </div>
//                 </CarouselItem>
//             ))}
//         </CarouselContent>
//         <CarouselPrevious />
//         <CarouselNext />
//     </Carousel>
// );