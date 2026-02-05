import React from 'react'
import error from '../assets/error.svg'
import Image from 'next/image'


export default function NotFound() {
  return <>
  
   <h1 className='text-4xl font-bold text-green-500 text-center mb-3 underline'>Page is Not Found ?</h1>
  <div className='flex justify-center items-center'>
   
        <Image src={error} alt='error' width={400} height={400} className='h-[400px] w-[1000px]' />
      </div>
  
  </>
}
