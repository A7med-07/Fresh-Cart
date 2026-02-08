'use server'
import { getAccessToken } from "@/app/_components/schema/access-token";

export async function ChangeMyPassword({ currentPassword, password, rePassword }: { currentPassword: string, password: string, rePassword: string }) {

    const token = await getAccessToken()

    if (!token) {
        throw new Error('unauthorized...')
    }

    const response = await fetch(`${process.env.API}users/changeMyPassword`, {
        method: 'PUT',
        headers: {
            token: token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            currentPassword,
            password,
            rePassword
        })
    })

    const payload = await response.json()
    console.log('API Response:', payload); // شوف الـ response
    console.log('Status:', response.status); // شوف الـ status code

    if (!response.ok) {
        throw new Error(payload.message || 'Failed to change password')
    }

    return payload
}