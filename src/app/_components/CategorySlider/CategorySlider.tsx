
import { Category } from '@/types/productInterface';
import React from 'react'
import Slider from '../Slider/Slider';

export default async function CategorySlider() {

const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`)
const payload  =  await res.json()
const categories:Category[] =payload.data

console.log(payload.data);

  return <>
  
  <Slider categories={categories}></Slider>
  </>
}
