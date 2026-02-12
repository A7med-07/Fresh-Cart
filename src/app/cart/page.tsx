'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { CartResponse } from '@/types/cart-response'
import { deleteCartItem } from '@/services/cart/delete-cart-item'
import toast from 'react-hot-toast'
import { updateCartItem } from '@/services/cart/update-cart'
import { Button } from '@/components/ui/button'
import { clearCart } from '@/services/cart/clear-cart'
import cart from '../../assets/empty-cart.jpg'
import Image from 'next/image'
import Link from 'next/link'
import CartLoading from '../CartLoading/page'
import error from '../../assets/error.svg'
import CheckoutForm from '../_components/CheckoutForm/CheckoutForm'

export default function Cart() {
  const queryClient = useQueryClient();
  const { data: cartData, isLoading, isError } = useQuery<CartResponse>({
    queryKey: ['get-cart'],
    queryFn: async () => {
      const response = await fetch(`/api/cart`)
      const payload = await response.json()
      return payload
    }
  })
  console.log(cartData);


  // delete cart Item
  const { mutate: delCartItem, isPending } = useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      toast.success('Product Deleted')
      queryClient.invalidateQueries({
        queryKey: ['get-cart']
      })
    }, onError: () => {
      toast.error('Error...')
    }

  })


  // update 
  const { mutate: updateCart, isPending: updateLoading } = useMutation({
    mutationFn: updateCartItem,
    onSuccess: () => {
      toast.success('Product Updated')
      queryClient.invalidateQueries({
        queryKey: ['get-cart']
      })
    }, onError: () => {
      toast.error('Error..')
    }

  })

  // clearCart 

  const { mutate: removeCart } = useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      toast.success('Cart Cleared')
      queryClient.invalidateQueries({
        queryKey: ['get-cart']
      })
    }, onError: () => {
      toast.error('Error...')
    }

  })






  function handleupdate(productId: string, count: number) {
    updateCart({ productId, count })
  }

  if (isLoading) {
    return <CartLoading />
  }
  if (isError) {
    return <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-red-50 to-orange-50'>
      <Image src={error} alt='error' width={400} height={400} className='h-[400px] w-[1000px] opacity-80' />
    </div>
  }



  return <>


    {cartData && cartData.numOfCartItems > 0 ? <div className='flex flex-col lg:flex-row gap-6 my-10 px-4 max-w-7xl mx-auto h-screen'>
      <div className='w-full lg:w-3/4 '>
        <div className="relative overflow-hidden bg-white shadow-xl rounded-2xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
          <div className="p-6 w-full bg-white rounded-2xl shadow-lg border border-gray-100 mb-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Shopping Cart
              </h1>
              <span className="ml-auto text-sm font-semibold text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
                {cartData?.numOfCartItems || 0} Items
              </span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-body">
              <thead className="text-sm text-gray-700 bg-gradient-to-r from-gray-50 to-green-50 border-b-2 border-green-100">
                <tr>
                  <th scope="col" className="px-6 md:px-16 py-4">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-4 md:px-6 py-4 font-semibold text-gray-800">
                    Product
                  </th>
                  <th scope="col" className="px-4 md:px-6 py-4 font-semibold text-gray-800">
                    Qty
                  </th>
                  <th scope="col" className="px-4 md:px-6 py-4 font-semibold text-gray-800">
                    Price
                  </th>
                  <th scope="col" className="px-4 md:px-6 py-4 font-semibold text-gray-800">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartData?.data.products.map((prod, index) => {
                  return <tr
                    key={prod._id}
                    className="bg-white border-b border-gray-100 hover:bg-gradient-to-r hover:from-gray-50 hover:to-green-50/30 transition-all duration-300 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <td className="p-4">
                      <div className="relative overflow-hidden rounded-xl group-hover:shadow-md transition-shadow duration-300">
                        <img
                          src={prod.product.imageCover}
                          className="w-16 md:w-24 max-w-full max-h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                          alt={prod.product.title}
                        />
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 font-semibold text-gray-800 group-hover:text-green-700 transition-colors duration-300">
                      {prod.product.title}
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <form className="max-w-xs mx-auto">
                        <label htmlFor="counter-input-1" className="sr-only">Choose quantity:</label>
                        <div className="relative flex items-center bg-gray-50 rounded-full p-1 border border-gray-200 hover:border-green-300 transition-colors duration-300">
                          <button
                            onClick={() => { handleupdate(prod.product._id, prod.count - 1) }}
                            type="button"
                            className="flex items-center justify-center text-gray-700 bg-white hover:bg-red-500 hover:text-white border border-gray-200 hover:border-red-500 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-300 h-8 w-8 transition-all duration-300 shadow-sm hover:shadow-md"
                          >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                            </svg>
                          </button>
                          <span className="shrink-0 mx-4 text-gray-800 text-sm font-bold focus:outline-none focus:ring-0 max-w-[2.5rem] text-center">
                            {prod.count}
                          </span>
                          <button
                            onClick={() => { handleupdate(prod.product._id, prod.count + 1) }}
                            type="button"
                            className="flex items-center justify-center text-gray-700 bg-white hover:bg-green-500 hover:text-white border border-gray-200 hover:border-green-500 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-300 h-8 w-8 transition-all duration-300 shadow-sm hover:shadow-md"
                          >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7 7V5" />
                            </svg>
                          </button>
                        </div>
                      </form>
                    </td>
                    <td className="px-4 md:px-6 py-4 font-bold text-green-600 text-lg">
                      {prod.price} <span className="text-sm text-gray-500">EGP</span>
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <button
                        onClick={() => { delCartItem(prod.product._id) }}
                        className="font-medium text-red-500 hover:text-red-700 cursor-pointer transition-colors duration-300 hover:underline decoration-2 underline-offset-2"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                })}
              </tbody>
            </table>
          </div>
          <Button
            variant="outline"
            onClick={() => { removeCart() }}
            className='w-full hover:bg-red-500 bg-gradient-to-r from-red-50 to-red-100 text-red-600 py-4 border-t-2 border-red-100 hover:border-red-500 transition-all duration-300 font-semibold rounded-b-2xl'
          >
            Clear Cart
          </Button>
        </div>
      </div>


      <div className='w-full lg:w-1/4'>
        <div className='sticky top-24'>
          <div className='border-2 border-gray-100 p-6 rounded-2xl bg-gradient-to-br from-white to-green-50/30 shadow-xl hover:shadow-2xl transition-all duration-300'>
            <h3 className='text-lg font-semibold text-gray-700 mb-4 pb-3 border-b border-gray-200'>Order Summary</h3>

            <div className='space-y-4 mb-6'>
              <div className='flex items-center justify-between p-3 bg-white rounded-xl shadow-sm'>
                <span className='text-gray-600 font-medium'>Items:</span>
                <span className='text-xl font-bold text-green-600'>{cartData?.numOfCartItems}</span>
              </div>

              <div className='flex items-center justify-between p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-md'>
                <span className='text-white font-semibold'>Total:</span>
                <span className='text-2xl font-bold text-white'>{cartData?.data.totalCartPrice} <span className='text-sm'>EGP</span></span>
              </div>
            </div>

            <Link href={`/checkout/${cartData?.cartId}`} className='block'>
              <Button className='w-full mt-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-6 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300'>
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div> :
      <div className='flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-green-50/20 px-4'>
        <div className='text-center mb-8 animate-[fadeIn_0.6s_ease-out_forwards]'>
          <div className="mx-auto mb-6 h-20 w-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-800 mb-4'>Your Cart is Empty</h2>
          <p className='text-gray-600 text-lg mb-6'>Discover amazing products and start shopping!</p>
          <Link href={'/'}>
            <Button className='bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 px-8 py-6 text-lg'>
              Explore More Products
            </Button>
          </Link>
        </div>
        <Image
          src={cart}
          alt='empty cart'
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
      .animate-fadeIn {
        animation: fadeIn 0.6s ease-out;
      }
    `}</style>
  </>
}