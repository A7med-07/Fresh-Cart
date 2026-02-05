'use client'

import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import { addToCart } from '@/services/cart/add-prod-cart'
import { addToWishList } from '@/services/wishList/add-prod-to-wishList'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

export default function AddBtn({ productId }: { productId: string }) {
    const [liked, setLiked] = useState(false)


    const queryClient = useQueryClient();
    
    const { data, isPending, error, isError, mutate: addProductToCart } = useMutation({
        mutationFn: addToCart,
        onSuccess: (data) => {
            toast.success(data?.message)
        },
        onError: () => {
            toast.error('Login First')
        }
    })


    const { data: wishlistData, mutate: addProductToWishlist } = useMutation({
        mutationFn: addToWishList,
        onSuccess: (wishlistData) => {
            toast.success(wishlistData?.message)
        },
        onError: () => {
            toast.error('Login First')
        }
    })
    console.log(wishlistData);

    function log() {
        console.log('wishhhhshh');

    }


    return <>

        <CardFooter className="flex justify-between">
            <Button onClick={() => { addProductToCart(productId) }} className="">Add to Cart</Button>
            <svg
                onClick={() => {
                    addProductToWishlist(productId)
                    setLiked(true)
                }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={liked ? 'currentColor' : 'none'}
                stroke="currentColor"
                className={`size-6 cursor-pointer transition 
    ${liked ? 'text-red-500' : 'text-gray-400'}`}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
            </svg>







        </CardFooter>

    </>
}
