'use server'
import { getAccessToken } from "@/app/_components/schema/access-token";


export async function getMyOrders(id: string) {


    const token = await getAccessToken()
   
    if (!token) {
        throw new Error('unauthorized...')
    }

    const response =await fetch(`${process.env.API}orders/user/${id}`, {
    cache: 'no-store',
        method: 'GET',

  })

    const payload = await response.json()
    console.log('payload' , payload);

    return payload
}

// https://ecommerce.routemisr.com/api/v1/orders/user/6983406b0c7f790f2e105c20