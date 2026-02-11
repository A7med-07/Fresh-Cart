import { CategoryResponse, myCategory } from '@/types/categoryInterface'
import { Category } from '@/types/productInterface'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function CategoryCard({ cat }: { cat: Category }) {
  return <>


    <div key={cat._id}>

      <Link href={`/categorydetails/${cat._id}`}>
        <div className="group rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 transform hover:scale-105 hover:-translate-y-2">
          
          {/* Image Container with Overlay Effect */}
          <div className="relative flex items-center justify-center h-40 sm:h-48 md:h-56 bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
            <Image
              alt={cat.name}
              loading="lazy"
              width={250}
              height={250}
              className="object-cover h-full w-full transform group-hover:scale-110 transition-transform duration-500"
              src={cat.image}
            />
            
            {/* Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          {/* Card Content */}
          <div className="p-5 text-center bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
            <h2 className="font-bold text-lg md:text-xl text-gray-900 dark:text-gray-100 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
              {cat.name}
            </h2>
            
            {/* Animated Underline */}
            <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mt-2 transition-all duration-500"></div>
          </div>

          {/* Bottom Accent Line */}
          <div className="h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </div>
      </Link>

    </div>



  </>
}