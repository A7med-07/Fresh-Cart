import { ProductItem } from '@/types/productInterface'
import React from 'react'
import { ProductCard } from '../_components/ProductCard/ProductCard'

export default async function Products() {

  let response = await fetch(`https://ecommerce.routemisr.com/api/v1/products `)

  let { data: allProducts }: { data: ProductItem[] } = await response.json()


  return <>
  
  

   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
        {allProducts.map((prod) => <ProductCard key={prod._id} prod={prod} />)}
      </div>
  </>
}
