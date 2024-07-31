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
                    <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/5">
                        <div className="p-1">
                            <Card className="w-full h-full">
                                <CardContent className="flex items-center justify-center p-10">
                                    <span className="text-4xl font-semibold">{item.id}</span>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}


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
//         <p className="text-lg">Some description or other content.</p>
//       </div>

//     </>
//   );
// };

// Adding getLayout to CurvedBackground

// export default CurvedBackground;
