'use server'
import { getAccessToken } from "@/app/_components/schema/access-token";


export async function deleteAddress(Id: string) {


    const token = await getAccessToken()
   
    if (!token) {
        throw new Error('unauthorized...')
    }

    const response =await fetch(`${process.env.API}addresses/${Id}`, {
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







// https://ecommerce.routemisr.com/api/v1/addresses/62289d4d66fbb7edb6b5cab7