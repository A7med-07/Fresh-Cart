import React from 'react'
import BrandsCard from '../_components/BrandsCard/BrandsCard'
import { Brand } from '@/types/cart-response'

export default async function Brands() {
  let response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`)
  let { data: allBrands }: { data: Brand[] } = await response.json()
  
  return (
    <div className="container mx-auto px-4 py-12 bg-gradient-to-b from-white via-blue-50/10 to-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="text-center mb-12 opacity-0 animate-[fadeIn_0.6s_ease-out_forwards]">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
          All Brands
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover our curated collection of premium brands
        </p>
        <div className="h-1 w-32 bg-gradient-to-r from-blue-600 rounded-full mx-auto mt-4"></div>
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {allBrands.map((brand, index) => (
          <div 
            key={brand._id}
            className="opacity-0 animate-[fadeIn_0.6s_ease-out_forwards]"
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            <BrandsCard brand={brand} />
          </div>
        ))}
      </div>
    </div>
  )
}