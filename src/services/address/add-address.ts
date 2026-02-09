'use server'
import { getAccessToken } from "@/app/_components/schema/access-token";


export async function addAddress({name, details, phone, city}:{name: string, details: string, phone: string, city: string}) {


    const token = await getAccessToken()

    if (!token) {
        throw new Error('unauthorized...')
    }

    const response = await fetch(`${process.env.API}addresses`, {
        cache: 'no-store',
        method: 'POST',
        headers: {
            token: token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name:name ,
            details: details,
            phone: phone,
            city: city
        })



})

const payload = await response.json()
console.log(payload);

return payload
}















// https://ecommerce.routemisr.com/api/v1/addresses