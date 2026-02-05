import { CategoryResponse, myCategory } from '@/types/categoryInterface'
import { Category } from '@/types/productInterface'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function CategoryCard({ cat }: { cat: Category }) {
  return <>


    <div key={cat._id}>

      <Link href={`/categorydetails/${cat._id}`}>
        <div className="rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-transform cursor-pointer overflow-hidden block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div className="flex items-center justify-center h-32 sm:h-40 md:h-48 bg-gray-100 dark:bg-gray-700 transition-colors duration-300">
            <Image
            
              alt={cat.name}
              loading="lazy"
              width={200}
              height={100}
              className="object-cover h-full w-full"
              src={cat.image}
            />
          </div>
          <div className="p-4 text-center">
            <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100 transition-colors duration-300">
              {cat.name}
            </h2>
          </div>
        </div>
      </Link>

    </div>



  </>
}
