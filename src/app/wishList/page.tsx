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
    return <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-red-50 to-orange-50'>
        <Image src={error} alt='error' width={400} height={400} className='h-[400px] w-[1000px] opacity-80' />
      </div>
  }




  

  return <>
   
    {!WishListData || WishListData?.count > 0 ? <main className="flex-1 bg-gradient-to-br from-gray-50 via-pink-50/20 to-red-50/30 min-h-screen">
      <div className="w-full md:w-[85%] lg:w-[80%] px-5 md:px-10 mx-auto pt-20 md:pt-24 my-10">

        <div className="p-6 w-full bg-white rounded-2xl shadow-lg border border-gray-100 mb-8">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-400 to-red-500 flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
              My Wish List
            </h1>
            <span className="ml-auto text-sm font-semibold text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
              {WishListData?.count || 0} Items
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {WishListData?.data.map((item, index) => (
            <div
              key={item._id}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 hover:border-pink-200 transition-all duration-300 overflow-hidden opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col md:flex-row items-center justify-between p-6 gap-6">
                
                {/* Product Info Section */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 w-full md:w-auto">
                  
                  {/* Image */}
                  <div className="relative overflow-hidden rounded-xl bg-gray-50 p-4 group-hover:shadow-lg transition-shadow duration-300">
                    <Image
                      src={item.imageCover}
                      width={120}
                      height={120}
                      alt={item.title}
                      className="object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Details */}
                  <div className="text-center md:text-left space-y-3">
                    <h2 className="font-bold text-lg text-gray-800 group-hover:text-pink-600 transition-colors duration-300">
                      {item.title}
                    </h2>

                    <div className="flex items-center gap-2 justify-center md:justify-start">
                      <span className="text-2xl font-bold text-green-600">
                        {item.price}
                      </span>
                      <span className="text-sm text-gray-500 font-medium">EGP</span>
                    </div>

                    <Button 
                      className='bg-red-50 text-red-600 hover:bg-red-500 hover:text-white border border-red-200 hover:border-red-500 hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md' 
                      variant="outline" 
                      onClick={() => delwishlistItem(item._id)}
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Remove
                    </Button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <div className="w-full md:w-auto">
                  <Button 
                    onClick={() => addFWishToCart(item._id)}
                    className="w-full md:w-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 px-8 py-6"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main> : 
    
    <div className='flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 via-pink-50/10 to-gray-50 px-4'>
      <div className='text-center mb-8 opacity-0 animate-[fadeIn_0.6s_ease-out_forwards]'>
        <div className="mx-auto mb-6 h-20 w-20 rounded-full bg-gradient-to-br from-pink-400 to-red-500 flex items-center justify-center shadow-lg">
          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
          </svg>
        </div>
        <h2 className='text-3xl md:text-4xl font-bold text-gray-800 mb-4'>Your Wishlist is Empty</h2>
        <p className='text-gray-600 text-lg mb-8'>Save your favorite items and shop them later!</p>
        <Link href={'/'}>
          <Button className='bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 px-8 py-6 text-lg'>
            Explore More Products
          </Button>
        </Link>
      </div>
      <Image 
        src={wish} 
        alt='empty wishlist' 
        width={600} 
        height={600} 
        className='max-w-full h-auto opacity-90' 
      />
    </div>
    }

    <style jsx global>{`
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `}</style>
  </>
}