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
      <div className='container mx-auto px-4 py-12 bg-gradient-to-b from-white via-blue-50/10 to-gray-50 min-h-screen'>
       
        {/* Brand Header Section */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16 opacity-0 animate-[fadeIn_0.6s_ease-out_forwards]'>
          <div className='md:span-1 flex justify-center'>
            <div className='w-full max-w-md bg-gradient-to-br from-white to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-3xl p-12 shadow-xl border-2 border-gray-100 dark:border-gray-600 hover:shadow-2xl transition-shadow duration-500'>
              <Image
                src={brandDetails.image}
                alt={brandDetails.name}
                width={400}
                height={400}
                className='object-contain transform hover:scale-105 transition-transform duration-500'
              />
            </div>
          </div>

          <div className='md:span-1'>
            <Card className="relative w-full p-6 sm:p-8 md:p-12 shadow-xl hover:shadow-2xl transition-shadow duration-500 border-2 border-gray-100 hover:border-blue-200 rounded-3xl bg-gradient-to-br from-white to-gray-50/50">
              <CardHeader className="p-0 sm:p-6 space-y-4">
                <CardAction>
                  <Badge variant="secondary" className="text-sm sm:text-base px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border border-blue-200 font-semibold">
                    Brand
                  </Badge>
                </CardAction>
                <CardTitle className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {brandDetails.name}
                </CardTitle>
                <CardDescription className="my-3 sm:my-4 text-sm sm:text-base">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      <span className="text-gray-600 dark:text-gray-400">
                        <strong className="text-gray-800 dark:text-gray-200">Slug:</strong> {brandDetails.slug}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-600 dark:text-gray-400">
                        <strong className="text-gray-800 dark:text-gray-200">Created:</strong> {new Date(brandDetails.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl shadow-sm border border-blue-200 dark:border-blue-800">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      <span className="text-blue-700 dark:text-blue-400 font-bold text-lg">
                        {brandProducts?.length || 0} Products Available
                      </span>
                    </div>
                  </div>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

      
        {/* Products Section */}
        <div className='mt-16 opacity-0 animate-[fadeIn_0.6s_ease-out_0.3s_forwards]'>
          <div className="mb-8">
            <h2 className='text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3'>
              Products from {brandDetails.name}
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
          </div>
          
          {brandProducts && brandProducts.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8'>
              {brandProducts.map((product: ProductItem, index: number) => (
                <div 
                  key={product._id}
                  className="opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]"
                  style={{ animationDelay: `${0.4 + index * 0.05}s` }}
                >
                  <ProductCard prod={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className='text-center py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-inner'>
              <div className="mx-auto mb-6 h-20 w-20 rounded-full bg-gradient-to-br from-blue-200 to-indigo-300 dark:from-blue-700 dark:to-indigo-600 flex items-center justify-center">
                <svg className="w-10 h-10 text-white dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <p className='text-gray-500 dark:text-gray-400 text-xl font-medium'>
                No products available for this brand yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}