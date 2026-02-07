import React from 'react'
import error from '../assets/error.svg'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'


export default function NotFound() {
  return <>

    <h1 className='text-4xl font-bold text-green-500 text-center mb-3 underline'>Page is Not Found ?</h1>
    <div className='flex justify-center items-center'>

      <Image src={error} alt='error' width={400} height={400} className='h-[400px] w-[1000px]' />
    </div>

    <Link href='/'>
      <Button className='mt-4 mx-auto'>

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
        </svg>
        Go Back Home
      </Button>

    </Link>

  </>
}
