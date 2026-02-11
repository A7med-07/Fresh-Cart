'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import * as zod from 'zod'
import toast from 'react-hot-toast'
import { schema } from '../_components/schema/registerSchema'
import Link from 'next/link'

export default function Register() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<zod.infer<typeof schema>>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    resolver: zodResolver(schema),
    mode:'onBlur'
  })

 async function submitForm(values: zod.infer<typeof schema>) {
  setIsLoading(true)

  try {
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })

    if (response.ok) {
      toast.success('Registered successfully')
      window.location.href = '/login'
    } else {
      toast.error('Register failed')
    }
    
  } catch (error) {
    toast.error('Register failed')
  } finally {
    setIsLoading(false)
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-green-50 via-emerald-50/30 to-teal-50/20">
      <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 rounded-3xl bg-white shadow-2xl border-2 border-gray-100 overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-green-100">Join us and start shopping!</p>
        </div>

        {/* Form Section */}
        <div className="p-6 sm:p-8 md:p-10">
          <form onSubmit={form.handleSubmit(submitForm)} className="space-y-5">
            
            {/* Name */}
            <div>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name} className="text-gray-700 font-semibold flex items-center gap-2 text-sm sm:text-base">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Full Name
                    </FieldLabel>
                    <Input
                      className="bg-gray-50 border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-xl p-3 transition-all duration-300 text-sm sm:text-base"
                      {...field}
                      id={field.name}
                      placeholder="Name"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            {/* Email */}
            <div>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name} className="text-gray-700 font-semibold flex items-center gap-2 text-sm sm:text-base">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email Address
                    </FieldLabel>
                    <Input
                      className="bg-gray-50 border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-xl p-3 transition-all duration-300 text-sm sm:text-base"
                      {...field}
                      id={field.name}
                      placeholder="example@email.com"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
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
                    <FieldLabel htmlFor={field.name} className="text-gray-700 font-semibold flex items-center gap-2 text-sm sm:text-base">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Password
                    </FieldLabel>
                    <Input
                      className="bg-gray-50 border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-xl p-3 transition-all duration-300 text-sm sm:text-base"
                      type="password"
                      {...field}
                      id={field.name}
                      placeholder="••••••••"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            {/* RePassword */}
            <div>
              <Controller
                name="rePassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name} className="text-gray-700 font-semibold flex items-center gap-2 text-sm sm:text-base">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Confirm Password
                    </FieldLabel>
                    <Input
                      className="bg-gray-50 border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-xl p-3 transition-all duration-300 text-sm sm:text-base"
                      type="password"
                      {...field}
                      id={field.name}
                      placeholder="••••••••"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            {/* Phone */}
            <div>
              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name} className="text-gray-700 font-semibold flex items-center gap-2 text-sm sm:text-base">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Phone Number
                    </FieldLabel>
                    <Input
                      className="bg-gray-50 border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-xl p-3 transition-all duration-300 text-sm sm:text-base"
                      {...field}
                      id={field.name}
                      placeholder="01xxxxxxxxx"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <Button 
              disabled={isLoading}  
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base" 
              type="submit"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </span>
              ) : 'Create Account'}
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-green-600 font-semibold hover:text-green-700 hover:underline transition-colors duration-300">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}