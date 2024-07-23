"use client"
// src/app/dev/page.js or src/pages/dev.js
// import supabase from '../../lib/supabase'; // Adjust the path as needed
// import ProductCard from '../../components/Shop Page/ProductCard'; // Adjust the path as needed
// import React, { useState, useEffect, useRef } from 'react';

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


import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

const ImageCarousel = () => {
    return (

        <Carousel
            opts={{
                align: "center",
                loop: true,
            }}
            className="w-full max-w-2xl max-h-xl"
        >
            <CarouselContent>
                {Array.from({ length: 9 }).map((_, index) => (
                    <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/5">
                        <div className="p-1">
                            <Card className="w-full h-full">
                                <CardContent className="flex items-center justify-center p-10">
                                    <span className="text-4xl font-semibold">{index + 1}</span>
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

const AdBox = ({ text, buttonText, widthRatio, heightRatio, isLeft  }) => {
    const lines = text.split('\n').map((line, index) => (
        <React.Fragment key={index}>
            {line}
            {index < text.split('\n').length - 1 && <br />}
        </React.Fragment>
    ));

    //     <div className="w-64 h-32 bg-gray-300 border border-gray-500 rounded-lg p-4">
    //       <div className="flex items-end justify-start h-full">
    //         <span className={`text-xl font-semibold text-gray-700`}>{lines}</span>
    //         <button className={`text-xl font-semibold text-gray-700`}> Shop clothes</button>
    //       </div>
    //     </div>
    //   
    return (
        <div className={`${isLeft ? `justify-start`:`justify-end`} flex flex-row h-40 bg-gray-300 border border-gray-500 rounded-lg p-4`}>
            <div className="flex flex-col justify-end h-full">
                <span className={`text-3xl font-bold text-gray-700 ${isLeft ? `text-left` : `text-right`}`} >{lines}</span>
                <button className={`flex text-xl font-bold text-gray-700 ${isLeft ? `justify-start` : `justify-end`}`}>{buttonText}</button>
            </div>
        </div>
    );

}

/**
 * 
 <div className="flex flex-col flex-wrap justify-center">
  <div className="flex flex-row w-full">
    <div className="basis-1/2">
      <AdBox className="w-full" text={"NEW YEAR, \n NEW YOU"} buttonText={"Shop clothes"} widthRatio={0.5} heightRatio={0.5} isLeft={true} />
    </div>
    <div className="basis-1/2">
      <AdBox className="w-full" text={"TECH FOR LESS"} widthRatio={0.5} heightRatio={0.5} isLeft={false} />
    </div>
  </div>
  <div className="flex flex-row w-full">
    <div className="basis-3/4">
      <AdBox className="w-full" text={"NEW YEAR, \n NEW YOU"} widthRatio={0.5} heightRatio={0.5} isLeft={true} />
    </div>
    <div className="basis-1/4">
      <AdBox className="w-full" text={"TECH FOR LESS"} widthRatio={0.5} heightRatio={0.5} isLeft={false} />
    </div>
  </div>
</div>


            <div className="flex flex-row flex-wrap justify-center">
                <div className="flex flex-col flex-wrap">
                  <div className="flex flex-row basis-1/2">
                      <AdBox className="basis-1/2" text={"NEW YEAR, \n NEW YOU"} buttonText={"Shop clothes"} widthRatio={0.5} heightRatio={0.5} isLeft={true}></AdBox>
                      <AdBox className="basis-1/2" text={"TECH FOR LESS"} buttonText={"Shop electronics"} widthRatio={0.5} heightRatio={0.5} isLeft={false}></AdBox>
                  </div>
                  <div className="flex flex-row basis-1/2">
                      <AdBox className="basis-3/4" text={"THE MOVE-IN \n EDITION"} buttonText={"Shop home"} widthRatio={0.5} heightRatio={0.5} isLeft={true}></AdBox>
                      <AdBox className="basis-1/4" text={"SOMETHING \n ELSE?"} buttonText={"Shop everything else"} widthRatio={0.5} heightRatio={0.5} isLeft={false}></AdBox>
                  </div>
                </div>
            </div>

 * 
 * 
 * 
 */

export default function LandingPage() {
    return (
        <>
            <div className="flex flex-col items-center justify-center">

                <ImageCarousel></ImageCarousel>
            </div>

        <div className="flex flex-col flex-wrap justify-center gap-5">
          <div className="flex flex-col md:flex-row w-full gap-5">
            <div className="md:basis-1/2 w-full gap-5">
              <AdBox className="w-full" text={"NEW YEAR, \n NEW YOU"} buttonText={"Shop clothes"} widthRatio={0.5} heightRatio={0.5} isLeft={true} />
            </div>
            <div className="md:basis-1/2 w-full gap-5">
              <AdBox className="w-full" text={"TECH FOR LESS"} widthRatio={0.5} heightRatio={0.5} isLeft={false} />
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full gap-5">
            <div className="md:basis-3/4 w-full">
              <AdBox className="w-full" text={"NEW YEAR, \n NEW YOU"} widthRatio={0.5} heightRatio={0.5} isLeft={true} />
            </div>
            <div className="md:basis-1/4 w-full">
              <AdBox className="w-full" text={"TECH FOR LESS"} widthRatio={0.5} heightRatio={0.5} isLeft={false} />
            </div>
          </div>
        </div>


        </>

    )
}