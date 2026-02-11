'use client'
import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import Image from 'next/image'
import { Category } from '@/types/wishList-response';
import { Autoplay } from 'swiper/modules';

export default function Slider({ categories }: { categories: Category[] }) {
    return (
        <div className="w-full py-8 px-4">
            <Swiper
                modules={[Autoplay]}
                autoplay={{ 
                    delay: 2000,
                    disableOnInteraction: false 
                }}
                spaceBetween={20}
                slidesPerView={6}
                loop={true}
                breakpoints={{
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 10
                    },
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 15
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 20
                    },
                    1280: {
                        slidesPerView: 6,
                        spaceBetween: 20
                    }
                }}
            >
                {categories.map((category) => (
                    <SwiperSlide key={category._id}>
                        <div className="flex flex-col items-center justify-center cursor-pointer group">
                            {/* Background */}
                            <div className="w-full aspect-square rounded-2xl overflow-hidden mb-3 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center p-4 group-hover:shadow-lg transition-shadow duration-300">
                                <Image 
                                    src={category.image} 
                                    alt={category.name} 
                                    width={200} 
                                    height={200} 
                                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            {/* Category Name */}
                            <h2 className="text-sm md:text-base font-medium text-center text-gray-800 dark:text-gray-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                                {category.name}
                            </h2>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}