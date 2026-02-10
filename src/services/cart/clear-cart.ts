'use server'
import { getAccessToken } from "@/app/_components/schema/access-token";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function clearCart() {


    const token = await getAccessToken()
   
    if (!token) {
        throw new Error('unauthorized...')
    }

    const response =await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
        method: 'DELETE',
        headers: {
            token: token,
            "Content-Type": "application/json"
        },
         })

    const payload = await response.json()
    console.log(payload);

    return payload
}