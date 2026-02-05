'use client'
import React from 'react'
import Simg1 from '../../../assets/blog-img-2.jpeg'
import Simg2 from '../../../assets/slider-image-2.jpeg'
import Simg3 from '../../../assets/slider-image-3.jpeg'
import img from '../../../assets/grocery-banner.png'
import img2 from '../../../assets/grocery-banner-2.jpeg'
import Image from 'next/image'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

import { Autoplay } from 'swiper/modules';

export default function MainSlider() {
    return <>

        <div className='flex flex-col lg:flex-row mt-4'>
            <div className='w-full lg:w-3/4'>

                <Swiper
                    modules={[Autoplay]}
                    autoplay={{ delay: 3000 ,
                        disableOnInteraction: false 
                    }}
                    spaceBetween={0}
                    slidesPerView={1}
                    loop={true}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                >
                    <SwiperSlide>
                        <Image src={Simg1} alt="Slider 1" width={400} height={300} className='w-full rounded-2xl h-[250px] sm:h-[300px] md:h-[400px] object-cover' />
                    </SwiperSlide>

                    <SwiperSlide>
                        <Image src={Simg2} alt="Slider 2" width={400} height={300} className='w-full rounded-2xl h-[250px] sm:h-[300px] md:h-[400px] object-cover' />
                    </SwiperSlide>

                    <SwiperSlide>
                        <Image src={Simg3} alt="Slider 3" width={400} height={300} className='w-full rounded-2xl h-[250px] sm:h-[300px] md:h-[400px] object-cover' />
                    </SwiperSlide>


                </Swiper>



            </div>
            <div className='w-full lg:w-1/4 flex flex-row lg:flex-col  mt-4 lg:mt-0'>
                <Image src={img2} alt="Grocery Banner 2" width={400} height={300} className='w-1/2 lg:w-full rounded-2xl h-[120px] sm:h-[150px] lg:h-[200px] object-cover' />
                <Image src={img} alt="Grocery Banner " width={400} height={300} className='w-1/2 lg:w-full rounded-2xl h-[120px] sm:h-[150px] lg:h-[200px] object-cover' />
            </div>
        </div>


    </>
}