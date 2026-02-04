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
        console.log(response);
        if (response.status == 'success') {
            toast.success('Order Will be delivered to you soon')
            window.location.href = '/allorders'
        } else {
            toast.error('Error ....')
        }
    }


    const form = useForm({
        defaultValues: {
            details: '',
            city: '',
            phone: ''
        },


    })

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

        <div className="w-full md:w-3/4 lg:w-1/2 mt-10 rounded-2xl bg-gray-200 mx-auto p-4 sm:p-6 md:p-10 ">
            <h2 className='text-xl sm:text-2xl font-bold text-green-600'>Check Out</h2>
            <form onSubmit={form.handleSubmit(submitForm)} className='' >



                <div className='mt-5'>

                    <Controller
                        name="details"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Details :</FieldLabel>
                                <Input
                                    className='bg-white'

                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Details "

                                />


                            </Field>
                        )}
                    />

                </div>


                <div className='mt-5'>

                    <Controller
                        name="city"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>City :</FieldLabel>
                                <Input
                                    className='bg-white'
                                    type='text'
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter your City "

                                />

                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                </div>
                <div className='mt-5'>

                    <Controller
                        name="phone"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Phone :</FieldLabel>
                                <Input
                                    className='bg-white'
                                    type='tel'
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter your Phone Number "

                                />

                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                </div>



                <Button onClick={() => { setisOnline(false) }} disabled={isLoading} className='w-full my-4' type='submit'>
                    {isLoading ? 'Loading..' : ' Pay Cash'}
                </Button>
                <Button onClick={() => { setisOnline(true) }} disabled={isLoading} className='w-full my-4' type='submit'>
                    {isLoading ? 'Loading..' : ' Pay Online'}
                </Button>
            </form>
        </div>

    </>
}