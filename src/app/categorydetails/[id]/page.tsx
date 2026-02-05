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


type myProps = {
  params: {
    id: string
  }
}

export default async function CategoryDetailsPage(props: myProps) {
  let { id } = await props.params

  // جلب بيانات الكاتيجوري
  let categoryResponse = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
  let { data: categoryDetails }: CategoryDetailsResponse = await categoryResponse.json()
  console.log('Category Details:', categoryDetails);

  // جلب المنتجات الخاصة بالكاتيجوري
  let productsResponse = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category=${id}`)
  let { data: categoryProducts }: CategoryProductsResponse = await productsResponse.json()
  console.log('Category Products:', categoryProducts);


  // جلب الصب كاتيجوري التابعة للكاتيجوري
  let subCategoriesResponse = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
  )
  let { data: subCategories }: { data: supCat[] } = await subCategoriesResponse.json()
  console.log('SubCategories:', subCategories);




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
                  </div>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

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
            <div className='text-center py-10'>
              <p className='text-gray-500 dark:text-gray-400 text-lg'>
                No products available in this category yet.
              </p>
            </div>
          )}
        </div>
      </div>


{/* SubCategories */}
<div className='mt-10'>
  <h2 className='text-2xl sm:text-3xl font-bold mb-6 underline text-emerald-600'>
    Sub Categories in {categoryDetails.name}:
  </h2>

  {subCategories && subCategories.length > 0 ? (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6'>
      {subCategories.map((sub) => (
        <a
          key={sub._id}
          href={`/subcategorydetails/${sub._id}`}
          className='p-4 border rounded-lg text-center hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
        >
          {sub.name}
        </a>
      ))}
    </div>
  ) : (
    <div className="flex justify-center items-center text-center h-30 w-300 text-gray-400">
      <h1 >No Subcategories Available</h1>
    </div>
  )}
</div>



    </>
  )
}