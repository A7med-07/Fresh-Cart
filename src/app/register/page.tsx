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
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup ', {
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
    <div className="w-full sm:w-3/4 md:w-1/2 mt-10 rounded-2xl bg-gray-200 mx-auto p-4 sm:p-6 md:p-10">
      <h2 className="text-xl sm:text-2xl font-bold text-green-600">Register Now</h2>

      <form onSubmit={form.handleSubmit(submitForm)}>
        {/* Name */}
        <div className="mt-5">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="text-sm sm:text-base">Name :</FieldLabel>
                <Input
                  className="bg-white text-sm sm:text-base"
                  {...field}
                  id={field.name}
                  placeholder="Enter your Name"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* Email */}
        <div className="mt-5">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="text-sm sm:text-base">Email :</FieldLabel>
                <Input
                  className="bg-white text-sm sm:text-base"
                  {...field}
                  id={field.name}
                  placeholder="Enter your Email"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* Password */}
        <div className="mt-5">
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="text-sm sm:text-base">Password :</FieldLabel>
                <Input
                  className="bg-white text-sm sm:text-base"
                  type="password"
                  {...field}
                  id={field.name}
                  placeholder="Enter your Password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* RePassword */}
        <div className="mt-5">
          <Controller
            name="rePassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="text-sm sm:text-base">Confirm Password :</FieldLabel>
                <Input
                  className="bg-white text-sm sm:text-base"
                  type="password"
                  {...field}
                  id={field.name}
                  placeholder="Re-enter Password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

     
    

        {/* Phone */}
        <div className="mt-5">
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="text-sm sm:text-base">Phone :</FieldLabel>
                <Input
                  className="bg-white text-sm sm:text-base"
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

        <Button disabled={isLoading}  className="w-full my-4 text-sm sm:text-base" type="submit">
          {isLoading ? 'Loading..' : 'Submit'}
        </Button>
      </form>
    </div>
  )
}