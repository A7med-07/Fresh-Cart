import React from 'react'
import Image from 'next/image'
import { Brand } from '@/types/cart-response'
import Link from 'next/link'

export default function BrandsCard({ brand }: { brand: Brand }) {
  return (
    <Link href={`/brandsdetails/${brand._id}`}>
      <div className="group rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transform hover:scale-105 hover:-translate-y-2">
        
        {/* Image Container with Gradient Background */}
        <div className="relative flex items-center justify-center h-40 sm:h-48 md:h-56 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
          <Image
            alt={brand.name}
            loading="lazy"
            width={220}
            height={220}
            className="object-contain p-6 transform group-hover:scale-110 transition-transform duration-500"
            src={brand.image}
          />
          
          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Corner Accent */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
        </div>

        {/* Card Content */}
        <div className="p-5 text-center bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-900">
          <h2 className="font-bold text-lg md:text-xl text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {brand.name}
          </h2>
          
          {/* Animated Underline */}
          <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 mx-auto mt-2 transition-all duration-500"></div>
        </div>

        {/* Bottom Accent Line */}
        <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      </div>
    </Link>
  )
}