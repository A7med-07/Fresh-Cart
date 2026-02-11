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
import Link from 'next/link'

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
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-green-50 via-emerald-50/30 to-teal-50/20">
      <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5 rounded-3xl bg-white shadow-2xl border-2 border-gray-100 overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-10 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-4 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-3">Welcome Back!</h2>
          <p className="text-green-100 text-lg">Sign in to continue shopping</p>
        </div>

        {/* Form Section */}
        <div className="p-8 sm:p-10 md:p-12">
          <form onSubmit={form.handleSubmit(submitForm)} className="space-y-6">

            {/* Email */}
            <div>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name} className="text-gray-700 font-semibold flex items-center gap-2 text-sm sm:text-base mb-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email Address
                    </FieldLabel>
                    <Input
                      className='bg-gray-50 border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-xl p-4 transition-all duration-300 text-sm sm:text-base'
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="example@email.com"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>

            {/* Password */}
            <div>
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name} className="text-gray-700 font-semibold flex items-center gap-2 text-sm sm:text-base mb-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Password
                    </FieldLabel>
                    <Input
                      className='bg-gray-50 border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-xl p-4 transition-all duration-300 text-sm sm:text-base'
                      type='password'
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="••••••••"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link 
                href="/forgot-password" 
                className="text-sm text-green-600 hover:text-green-700 font-semibold hover:underline transition-colors duration-300 flex items-center gap-1 justify-end group"
              >
                Forgot Password?
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Submit Button */}
            <Button 
              disabled={isLoading} 
              className='w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-base sm:text-lg' 
              type='submit'
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Sign In
                </span>
              )}
            </Button>
          </form>

          {/* Register Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link 
                href="/register" 
                className="text-green-600 font-semibold hover:text-green-700 hover:underline transition-colors duration-300"
              >
                Create Account
              </Link>
            </p>
          </div>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">Secure Login</span>
            </div>
          </div>

          {/* Security Notice */}
          <div className="flex items-center gap-3 text-sm text-gray-600 bg-green-50 p-4 rounded-xl border border-green-200">
            <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Your login credentials are encrypted and secure</span>
          </div>
        </div>
      </div>
    </div>
  </>
}