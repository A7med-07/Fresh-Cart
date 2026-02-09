'use server'
import { getAccessToken } from "@/app/_components/schema/access-token";

export async function getUserAddresses() {
    const token = await getAccessToken()

    if (!token) {
        throw new Error('Unauthorized')
    }

    const response = await fetch(`${process.env.API}addresses`, {
        cache: 'no-store',
        method: 'GET',
        headers: {
            token: token,
            "Content-Type": "application/json"
        }
    })

    if (!response.ok) {
        throw new Error('Failed to fetch addresses')
    }

    const payload = await response.json()
    
    return payload
}