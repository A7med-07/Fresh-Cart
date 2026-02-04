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

      <div className='md:span-1'>
       

                <ProductImg images={singleProduct?.images}></ProductImg>
      </div>
      <div className='md:span-1'>

        <Card className="relative w-full p-4 sm:p-6 md:p-10">

          <CardHeader className="p-0 sm:p-6">
            <CardAction>
              <Badge variant="secondary" className="text-xs sm:text-sm">{singleProduct?.brand.name}</Badge>
            </CardAction>
            <CardTitle className="text-lg sm:text-xl md:text-2xl">{singleProduct?.title.split(' ').slice(0, 2).join('')}</CardTitle>
            <CardDescription className="my-2 sm:my-3 text-sm sm:text-base">
              {singleProduct?.description}
            </CardDescription>
            
            <CardDescription className="my-2 sm:my-3 text-sm sm:text-base">
              <div className="flex justify-between ">
                <span>{singleProduct?.price} EGP</span>
                <span className="flex gap-2">{singleProduct?.ratingsAverage}  <svg xmlns="http://www.w3.org/2000/svg " fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 sm:size-6 text-yellow-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
                </span>
              </div>
            </CardDescription>
          </CardHeader>

         <AddBtn productId={singleProduct?._id}/>
        </Card>
      </div>
    </div>


  </>
}