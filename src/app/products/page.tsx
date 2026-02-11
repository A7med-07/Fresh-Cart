import { ProductItem } from '@/types/productInterface'
import React from 'react'
import { ProductCard } from '../_components/ProductCard/ProductCard'

export default async function Products() {

  let response = await fetch(`https://ecommerce.routemisr.com/api/v1/products `)

  let { data: allProducts }: { data: ProductItem[] } = await response.json()


  return <>
  
   <div className="text-center mb-12 opacity-0 animate-[fadeIn_0.6s_ease-out_forwards]">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 via-emerald-600 to-purple-600 bg-clip-text text-transparent">
          Our Products
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Explore our wide range of high-quality products across various categories
        </p>
        <div className="h-1 w-32 bg-gradient-to-r from-green-600  rounded-full mx-auto mt-4"></div>
      </div>

   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
        {allProducts.map((prod) => <ProductCard key={prod._id} prod={prod} />)}
      </div>
  </>
}
