import { ProductCard } from "@/app/_components/ProductCard/ProductCard"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BrandDetails, BrandProductsResponse } from "@/types/brandsInterface"
import { ProductItem } from "@/types/productInterface"
import Image from "next/image"
import React from 'react'




type myProps = {
  params: {
    id: string
  }
}

export default async function BrandDetailsPage(props: myProps) {
  let { id } = await props.params


  let brandResponse = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
  let { data: brandDetails }: { data: BrandDetails } = await brandResponse.json()
  console.log('Brand Details:', brandDetails);


  let productsResponse = await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${id}`)
  let { data: brandProducts }: BrandProductsResponse = await productsResponse.json()
  console.log('Brand Products:', brandProducts);

  return (
    <>
      <div className='container mx-auto px-4 py-8'>
       
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 items-center mb-10'>
          <div className='md:span-1 flex justify-center'>
            <div className='w-full max-w-md bg-gray-100 dark:bg-gray-700 rounded-xl p-8 flex items-center justify-center'>
              <Image
                src={brandDetails.image}
                alt={brandDetails.name}
                width={400}
                height={400}
                className='object-contain'
              />
            </div>
          </div>

          <div className='md:span-1'>
            <Card className="relative w-full p-4 sm:p-6 md:p-10">
              <CardHeader className="p-0 sm:p-6">
                <CardAction>
                  <Badge variant="secondary" className="text-xs sm:text-sm">Brand</Badge>
                </CardAction>
                <CardTitle className="text-2xl sm:text-3xl md:text-4xl my-4">
                  {brandDetails.name}
                </CardTitle>
                <CardDescription className="my-2 sm:my-3 text-sm sm:text-base">
                  <div className="flex flex-col gap-3">
                    <span className="text-gray-600 dark:text-gray-400">
                      <strong>Slug:</strong> {brandDetails.slug}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      <strong>Created:</strong> {new Date(brandDetails.createdAt).toLocaleDateString()}
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-lg">
                      {brandProducts?.length || 0} Products Available
                    </span>
                  </div>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

      
        <div className='mt-10'>
          <h2 className='text-2xl sm:text-3xl font-bold mb-6 text-emerald-600 dark:text-emerald-400'>
            Products from {brandDetails.name}
          </h2>
          
          {brandProducts && brandProducts.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'>
              {brandProducts.map((product: ProductItem) => (
                <ProductCard key={product._id} prod={product} />
              ))}
            </div>
          ) : (
            <div className='text-center py-10'>
              <p className='text-gray-500 dark:text-gray-400 text-lg'>
                No products available for this brand yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}