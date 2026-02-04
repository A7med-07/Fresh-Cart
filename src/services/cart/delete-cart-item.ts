'use server'
import { getAccessToken } from "@/app/_components/schema/access-token";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function deleteCartItem(productId: string) {


    const token = await getAccessToken()
   
    if (!token) {
        throw new Error('unauthorized...')
    }

    const response =await fetch(`${process.env.API}cart/${productId}`, {
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