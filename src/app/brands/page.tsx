import React from 'react'
import BrandsCard from '../_components/BrandsCard/BrandsCard'
import { Brand } from '@/types/cart-response'

export default async function Brands() {
  let response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`)
  let { data: allBrands }: { data: Brand[] } = await response.json()
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-green-500 text-center">
        All Brands
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {allBrands.map((brand) => (
          <BrandsCard key={brand._id} brand={brand} />
        ))}
      </div>
    </div>
  )
}