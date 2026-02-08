'use client'
import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { schema } from '../_components/schema/registerSchema'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from 'react-hook-form'
import * as zod from "zod"
import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast'
import { loginSchema } from '../_components/schema/loginSchema'
import { useSearchParams } from 'next/navigation'
export default function Login() {

 const searchParams =  useSearchParams()
 const callbackUrl = searchParams.get('callback-url')

  const [isLoading, setisLoading] = useState(false)
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),

  })

  async function submitForm(values: zod.infer<typeof loginSchema>) {
    setisLoading(true)
    console.log(values);
    const response = await signIn('credentials', {
      email: values.email,
      password: values.password,
      callbackUrl: callbackUrl ?? '/',
      redirect: false

    })


    console.log(response);
    if (response?.ok) {
      // home

      toast.success('successfull login')
      window.location.href = response.url || '/'

    }
    else {
      // login
      toast.error('Invalid email or password')
    }


    setisLoading(false)
  }

  return <>

    <div className="w-full sm:w-3/4 md:w-1/2 mt-10 rounded-2xl bg-gray-200 mx-auto my-60 p-4 sm:p-6 md:p-10 ">
      <h2 className='text-xl sm:text-2xl font-bold text-green-600'>Login Now</h2>
      <form onSubmit={form.handleSubmit(submitForm)} className='' >



        <div className='mt-5'>

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="text-sm sm:text-base">Email :</FieldLabel>
                <Input
                  className='bg-white text-sm sm:text-base'

                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your Email "

                />

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

        </div>


        <div className='mt-5'>

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="text-sm sm:text-base">Password :</FieldLabel>
                <Input
                  className='bg-white text-sm sm:text-base'
                  type='password'
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your Password "

                />

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

        </div>





        <Button disabled={isLoading} className='w-full my-4 text-sm sm:text-base' type='submit'>
          {isLoading ? 'Loading..' : ' Submit'}
        </Button>
      </form>
    </div>

  </>
}