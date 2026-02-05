import React from 'react'
import Image from 'next/image'
import { Brand } from '@/types/cart-response'
import Link from 'next/link'

export default function BrandsCard({ brand }: { brand: Brand }) {
  return (
    <Link href={`/brandsdetails/${brand._id}`}>
 <div className="rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-transform cursor-pointer overflow-hidden block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="flex items-center justify-center h-32 sm:h-40 md:h-48 bg-gray-100 dark:bg-gray-700 transition-colors duration-300">
        <Image
          alt={brand.name}
          loading="lazy"
          width={200}
          height={200}
          className="object-contain"
          src={brand.image}
        />
      </div>
      <div className="p-4 text-center">
        <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100 transition-colors duration-300">
          {brand.name}
        </h2>
      </div>
    </div>
    </Link>
   
  )
}