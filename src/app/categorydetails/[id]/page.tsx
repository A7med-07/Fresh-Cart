import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import React from 'react'
import { ProductItem } from "@/types/productInterface"
import { ProductCard } from "@/app/_components/ProductCard/ProductCard"
import { CategoryDetailsResponse, CategoryProductsResponse } from "@/types/category-details"
import { supCat } from "@/types/supCatInterface"
import Link from "next/link"


type myProps = {
  params: {
    id: string
  }
}

export default async function CategoryDetailsPage(props: myProps) {
  let { id } = await props.params


  let categoryResponse = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`, {
    cache: 'no-store'
  })
  let { data: categoryDetails }: CategoryDetailsResponse = await categoryResponse.json()

 
  let productsResponse = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category=${id}`, {
    cache: 'no-store'
  })
  let { data: categoryProducts }: CategoryProductsResponse = await productsResponse.json()


  let subCategoriesResponse = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`,
    { cache: 'no-store' }
  )
  let subCategoriesData = await subCategoriesResponse.json()
  
  console.log('Category ID:', id)
  console.log('Category Name:', categoryDetails.name)
  console.log('SubCategories Full Response:', subCategoriesData)
  

  let allSubCategories: supCat[] = subCategoriesData.data || []
  
 
  let subCategories = allSubCategories.filter((sub: any) => {
    
    if (sub.category) {
      return sub.category === id || sub.category._id === id
    }
    return true
  })

  console.log('Filtered SubCategories:', subCategories)

  return (
    <>
      <div className='container mx-auto px-4 py-8'>
        {/* معلومات الكاتيجوري */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 items-center mb-10'>
          <div className='md:span-1 flex justify-center'>
            <div className='w-full max-w-md bg-gray-100 dark:bg-gray-700 rounded-xl p-8 flex items-center justify-center'>
              <Image
                src={categoryDetails.image}
                alt={categoryDetails.name}
                width={400}
                height={400}
                className='object-cover rounded-lg'
              />
            </div>
          </div>

          <div className='md:span-1'>
            <Card className="relative w-full p-4 sm:p-6 md:p-10">
              <CardHeader className="p-0 sm:p-6">
                <CardAction>
                  <Badge variant="secondary" className="text-xs sm:text-sm">Category</Badge>
                </CardAction>
                <CardTitle className="text-2xl sm:text-3xl md:text-4xl my-4">
                  {categoryDetails.name}
                </CardTitle>
                <CardDescription className="my-2 sm:my-3 text-sm sm:text-base">
                  <div className="flex flex-col gap-3">
                    <span className="text-gray-600 dark:text-gray-400">
                      <strong>Slug:</strong> {categoryDetails.slug}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      <strong>Created:</strong> {new Date(categoryDetails.createdAt).toLocaleDateString()}
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-lg">
                      {categoryProducts?.length || 0} Products Available
                    </span>
                    {subCategories.length > 0 && (
                      <span className="text-blue-600 dark:text-blue-400 font-semibold text-lg">
                        {subCategories.length} Subcategories
                      </span>
                    )}
                  </div>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* SubCategories */}
        {subCategories && subCategories.length > 0 ? (
          <div className='mb-10'>
            <h2 className='text-2xl sm:text-3xl font-bold mb-6 text-emerald-600 dark:text-emerald-400'>
              Sub Categories in {categoryDetails.name}:
            </h2>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
              {subCategories.map((sub) => (
                <Link
                  key={sub._id}
                  href={`/subcategorydetails/${sub._id}`}
                  className='p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg text-center hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-gray-800 transition-all duration-200 font-medium'
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="mb-10 flex justify-center items-center text-center py-10 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="text-lg text-gray-500 dark:text-gray-400">
              No Subcategories Available for {categoryDetails.name}
            </h3>
          </div>
        )}

        {/* المنتجات الخاصة بالكاتيجوري */}
        <div className='mt-10'>
          <h2 className='text-2xl sm:text-3xl font-bold mb-6 text-emerald-600 dark:text-emerald-400'>
            Products in {categoryDetails.name}
          </h2>

          {categoryProducts && categoryProducts.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'>
              {categoryProducts.map((product: ProductItem) => (
                <ProductCard key={product._id} prod={product} />
              ))}
            </div>
          ) : (
            <div className='text-center py-10 bg-gray-50 dark:bg-gray-800 rounded-lg'>
              <p className='text-gray-500 dark:text-gray-400 text-lg'>
                No products available in this category yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}