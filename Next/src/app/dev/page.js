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

const GuideBlockButton = ({ link, isLeft, text }) => {
  return (
    
    <div className={`flex flex-row items-center justify-between max-w-40 bg-white border border-gray-500 rounded-full pl-4 w-full h-8`}>
      <div className="flex flex-col justify-center">
        <span className="text-sm font-semibold text-blue-700 ">{text}</span>
      </div>
      <button className="flex items-center justify-center aspect-square h-full bg-blue-500 rounded-full text-white text-xl font-bold">
        &gt;
      </button>
    </div>

    
    
  )
}

const GuideBlock = ({ text, textColor, buttonText, buttonTextColor, heightType, isLeft }) => {
  const lines = text.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index < text.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));
  return (
    <div className={`${isLeft ? 'justify-start' : 'justify-end'} flex flex-row ${heightType === 'tall' ? 'h-60' : 'h-48'} bg-gray-300 border border-gray-500 rounded-lg p-6`}>
        <div className="flex flex-col justify-end h-full w-full">
            <span className={`text-xl sm:text-2xl md:text-3xl font-bold text-gray-700 break-words overflow-hidden ${isLeft ? 'text-left' : 'text-right'}`}>
                {lines}
            </span>
            <GuideBlockButton isLeft={isLeft} text={buttonText}></GuideBlockButton>
        </div>
    </div>
);
}

export default function LandingPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        {/* IMAGE CAROUSEL */}
        <ImageCarousel></ImageCarousel>
      </div>

      {/* GUIDE BLOCKS */}
      <div className="flex flex-col flex-wrap justify-center gap-5 md:px-52">
        <div className="flex flex-col md:flex-row w-full gap-5">
          <div className="md:basis-1/2 w-full gap-5">
            <GuideBlock className="w-full" text={"NEW YEAR, \n NEW YOU"} buttonText={"Shop clothes"} heightType={"short"} isLeft={true} />
          </div>
          <div className="md:basis-1/2 w-full gap-5">
            <GuideBlock className="w-full" text={"TECH FOR LESS"} buttonText={"Shop electronics"} heightType={"short"} isLeft={false} />
          </div>
        </div>
        <div className="flex flex-col md:flex-row w-full gap-5">
          <div className="md:basis-3/4 w-full">
            <GuideBlock className="w-full" text={"THE MOVE-IN \n EDITION"} buttonText={"Shop home"} heightType={"tall"} isLeft={true} />
          </div>
          <div className="md:basis-1/4 w-full">
            <GuideBlock className="w-full" text={"SOMETHING \n ELSE?"} buttonText={"Shop everything else"} heightType={"tall"} isLeft={false} />
          </div>
        </div>
      </div>

    </>

  )
}