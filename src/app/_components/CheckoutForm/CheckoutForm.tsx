'use client'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { payCashOrder } from '@/services/cart/pay-cash'
import { payOnlineOrder } from '@/services/cart/pay-online'
import { Shipping } from '@/types/cart-response'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { checkoutSchema, CheckoutSchema } from '../schema/CheckoutSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { CartResponse } from '@/types/cart-response'



export default function CheckoutForm({ cartId }: { cartId: string }) {
    const [isLoading, setisLoading] = useState(false)
    const [isOnline, setisOnline] = useState(false)

    async function payOnline(cartId: string, shippingAddress: Shipping) {
        const response = await payOnlineOrder(cartId, shippingAddress);
        console.log(response);
        if (response.status == 'success') {
            toast.success('Order Will be delivered to you soon')
            window.location.href = response.session.url
        } else {
            toast.error('Error ....')
        }
    }




async function payCash(cartId: string, shippingAddress: Shipping) {
    const response = await payCashOrder(cartId, shippingAddress);
    console.log('Full Response:', response);
    localStorage.getItem
    if (response.status == 'success') {
        const userId = response.data.user; 
      
        toast.success('Order created successfully!')
        
       
        window.location.href = `/allorders/${userId}`
    } else {
        toast.error('Error ....')
    }
}


   const form = useForm<CheckoutSchema>({
  resolver: zodResolver(checkoutSchema),
  defaultValues: {
    details: "",
    city: "",
    phone: ""
  }
});

    async function submitForm(values: Shipping) {
        setisLoading(true)
        console.log(values);
        const shippingAddress = {
            ...values
        }
        if (isOnline) {
            payOnline(cartId, shippingAddress)
        }
        else {
            payCash(cartId, shippingAddress)
        }


        setisLoading(false)
    }

    return <>

        <div className="w-full md:w-3/4 lg:w-1/2 mt-10 rounded-3xl bg-gradient-to-br from-white to-gray-50 mx-auto p-6 sm:p-8 md:p-12 shadow-2xl border-2 border-gray-100">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-md">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <h2 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent'>
                        Checkout
                    </h2>
                </div>
                <p className="text-gray-600">Please enter your shipping details</p>
                <div className="h-1 w-24 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full mt-3"></div>
            </div>

            <form onSubmit={form.handleSubmit(submitForm)} className='space-y-6'>

                {/* Details Field */}
                <div>
                    <Controller
                        name="details"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name} className="text-gray-700 font-semibold flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Address Details
                                </FieldLabel>
                                <Input
                                    className='bg-white border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-xl p-3 transition-all duration-300'
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Street, Building, Apartment..."
                                />
                            </Field>
                        )}
                    />
                </div>

                {/* City Field */}
                <div>
                    <Controller
                        name="city"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name} className="text-gray-700 font-semibold flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    City
                                </FieldLabel>
                                <Input
                                    className='bg-white border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-xl p-3 transition-all duration-300'
                                    type='text'
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter your city"
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                </div>

                {/* Phone Field */}
                <div>
                    <Controller
                        name="phone"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name} className="text-gray-700 font-semibold flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    Phone Number
                                </FieldLabel>
                                <Input
                                    className='bg-white border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-xl p-3 transition-all duration-300'
                                    type='tel'
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="01xxxxxxxxx"
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                </div>

                {/* Payment Buttons */}
                <div className="space-y-4 pt-4">
                    <Button 
                        onClick={() => { setisOnline(false) }} 
                        disabled={isLoading} 
                        className='w-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white py-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3' 
                        type='submit'
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {isLoading && !isOnline ? 'Processing...' : 'Cash on Delivery'}
                    </Button>

                    <Button 
                        onClick={() => { setisOnline(true) }} 
                        disabled={isLoading} 
                        className='w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3' 
                        type='submit'
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        {isLoading && isOnline ? 'Processing...' : 'Pay Online'}
                    </Button>
                </div>

                {/* Security Notice */}
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-green-50 p-4 rounded-xl border border-green-200">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Your payment information is secure and encrypted</span>
                </div>
            </form>
        </div>

    </>
}