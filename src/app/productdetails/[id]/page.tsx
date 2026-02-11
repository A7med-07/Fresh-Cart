import ProductImg from "@/app/_components/productImg/ProductImg"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ProductItem } from "@/types/productInterface"
import Image from "next/image"
import React from 'react'
import AddBtn from "@/app/_components/addBtn/addBtn"

type myProps = {
  params: {
    id: string
  }
}
export default async function ProductDetails(props: myProps) {

  let { id } = await props.params
  console.log(id);

  let response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  let { data: singleProduct }: { data: ProductItem } = await response.json()
  console.log('single', singleProduct);

  return <>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 items-center px-4 sm:px-0'>

      <div className="md:span-1 opacity-0 animate-[fadeIn_0.6s_ease-out_forwards]">
        <div className=' bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border-2 border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-shadow duration-500'>
          <ProductImg images={singleProduct?.images}></ProductImg>
        </div>
      </div>

      <div className='md:span-1 opacity-0 animate-[fadeIn_0.6s_ease-out_0.2s_forwards]'>

        <Card className="relative w-full p-4 mx-11 sm:p-6 md:p-10">

          <CardHeader className="relative w-full p-6 sm:p-8 lg:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-green-200 rounded-3xl bg-gradient-to-br from-white to-gray-50/50">
            <CardAction>
              <Badge variant="secondary" className="text-sm sm:text-base px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200 font-semibold shadow-sm">{singleProduct?.brand.name}</Badge>
            </CardAction>
            <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 leading-tight">{singleProduct?.title.split(' ').slice(0, 2).join('')}</CardTitle>
            <CardDescription className="my-4 sm:my-5 text-sm sm:text-base text-gray-600 leading-relaxed">
              {singleProduct?.description}
            </CardDescription>

            <CardDescription className="my-2 sm:my-3 text-sm sm:text-base">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <span className="flex flex-col text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{singleProduct?.price} 
                  <span className="text-lg text-gray-500 font-medium">EGP</span>
                  </span>

               <div className="flex flex-co items-center gap-2 bg-gradient-to-r from-yellow-50 to-amber-50 px-4 py-2 rounded-xl border border-yellow-200 shadow-sm">
                      <span className="text-2xl font-bold text-gray-800">
                        {singleProduct?.ratingsAverage}
                      </span>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="currentColor" 
                        viewBox="0 0 24 24" 
                        className="w-6 h-6 text-yellow-400"
                      >
                        <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                      </svg>
                    </div>
              </div>
            </CardDescription>
          </CardHeader>

          <AddBtn productId={singleProduct?._id} />
        </Card>
      </div>
    </div>


  </>
}