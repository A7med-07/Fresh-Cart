'use client'
import { Button } from '@/components/ui/button';
import { addToCart } from '@/services/cart/add-prod-cart';
import { deleteWishlistItem } from '@/services/wishList/delete-wishlist-item';
import { WishItem, WishListResponse } from '@/types/wishList-response';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react'
import toast from 'react-hot-toast';
import wish from'../../assets/empty-cart.jpg'
import CartLoading from '../CartLoading/page';
import error  from '../../assets/error.svg';
import Link from 'next/link';

export default function WishList() {


  const queryClient = useQueryClient();
  const { data: WishListData, isLoading, isError } = useQuery<WishListResponse>({
    queryKey: ['get-wishlist'],
    queryFn: async () => {
      const response = await fetch(`/api/wishlist`)
      const payload = await response.json()
      return payload
    }
  })
  console.log(WishListData?.data);

  // delete wishlist Item
  const { mutate: delwishlistItem, isPending } = useMutation({
    mutationFn: deleteWishlistItem,
    onSuccess: () => {
      toast.success('Product Deleted')
      queryClient.invalidateQueries({
        queryKey: ['get-wishlist']
      })
    }, onError: () => {
      toast.error('Error...')
    }

  })


  // add to cart
  const { mutate: addFWishToCart } = useMutation({
    mutationFn: addToCart,
    onSuccess: (data) => {
      toast.success(data?.message)
      queryClient.invalidateQueries({
        queryKey: ['get-wishlist']
      })
    },
    onError: () => {
      toast.error('Error ....')
    }
  })


  if (isLoading) {
    return <CartLoading/>
  }
  if (isError) {
    return <div className='flex justify-center items-center'>
   
        <Image src={error} alt='error' width={400} height={400} className='h-[400px] w-[1000px]' />
      </div>
  }




  

  return <>
   
    {!WishListData || WishListData?.count > 0 ? <main className="flex-1">
      <div className="w-full md:w-[80%] px-5 md:px-10 mx-auto pt-20 md:pt-24 my-10 flex flex-col items-center h-screen">

        <div className="p-5 w-full flex items-center justify-center md:justify-between">
          <h1 className="text-2xl font-bold text-emerald-500">My Wish List:</h1>
        </div>
        <div className="w-full border-b border-border mb-5"></div>
        <div className="allProducts w-full">

          {WishListData?.data.map((item) => (
            <div
              key={item._id}
              className="flex flex-col items-center md:flex-row md:items-center justify-between my-5 pb-5 border-b border-border w-full"
            >
              <div className="flex flex-col items-center md:flex-row md:items-center gap-5 w-full">

                <Image
                  src={item.imageCover}
                  width={100}
                  height={100}
                  alt={item.title}
                />

                <div className="text-center md:text-left">
                  <h1 className="font-bold text-foreground my-3">
                    {item.title}
                  </h1>

                  <p className="text-primary font-mono my-3">
                    {item.price} EGP
                  </p>


                  <Button className='hover:bg-red-500 hover:scale-110 transition-all duration-300' variant="outline" onClick={() => delwishlistItem(item._id)}>Remove</Button>
                </div>
              </div>

              <div className="mt-3 md:mt-0">
                <Button onClick={() => addFWishToCart(item._id)}>
                  Add to Cart</Button>
              </div>
            </div>
          ))}

        </div>
      </div>
    </main> : <div className='flex items-center '>
      <Link href={'/'} className='mt-4 mx-auto'>
        <Button className='mt-4 mx-auto'>Explore More Products ...</Button>
        </Link>
        <Image src={wish} alt='wishlist' width={400} height={400} className='h-[700px] w-[1000px]' />
        
      </div> }



  </>
}
