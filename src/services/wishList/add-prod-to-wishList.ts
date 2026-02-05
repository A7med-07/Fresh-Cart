'use server'
import { getAccessToken } from "@/app/_components/schema/access-token";


export async function addToWishList(productId: string) {


    const token = await getAccessToken()
   
    if (!token) {
        throw new Error('unauthorized...')
    }

    const response =await fetch(`${process.env.API}wishlist`, {
        cache:'no-store',
        method: 'POST',
        headers: {
            token: token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            productId
        })



    })

    const payload = await response.json()
    console.log(payload);

    return payload
}