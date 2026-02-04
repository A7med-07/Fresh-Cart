import React from 'react'
import CheckoutForm from '../../_components/CheckoutForm/CheckoutForm'

export default async function Checkout({params}:{params:{cartId:string}}) {
 
 const {cartId} = await params
 console.log(cartId);
 
  return (
    <div>
      <CheckoutForm cartId={cartId}/>
    </div>
  )
}
