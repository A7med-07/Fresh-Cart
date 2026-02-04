'use server'
import { getAccessToken } from "@/app/_components/schema/access-token";
import { Shipping } from "@/types/cart-response";


export async function payCashOrder(cartId: string , shippingAddress:Shipping) {


    const token = await getAccessToken()
   
    if (!token) {
        throw new Error('unauthorized...')
    }

    const response =await fetch(`${process.env.API}orders/${cartId}`, {
        
        method: 'POST',
        headers: {
            token: token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
           shippingAddress
        })



    })

    const payload = await response.json()
    console.log(payload);

    return payload
}