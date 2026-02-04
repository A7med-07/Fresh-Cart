'use client'

import React, { useRef } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'
export default function ProductImg({ images }: { images: string[] }) {

    
    return <>

        <Carousel
        opts={{
            align: "start",
            loop: true,
        }}>
            <CarouselContent>

                {images.map((src) => {
                    return <CarouselItem> <Image width={200}
                        height={300}
                        className="w-full object-cover"
                        quality={70} src={src} alt={src} />
                    </CarouselItem>
                })}

            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>

    </>
}
