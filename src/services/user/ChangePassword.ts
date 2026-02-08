'use server'
import { getAccessToken } from "@/app/_components/schema/access-token";

export async function ChangeMyPassword({ 
    currentPassword, 
    password, 
    rePassword 
}: { 
    currentPassword: string, 
    password: string, 
    rePassword: string 
}) {
    try {
        const token = await getAccessToken()

        if (!token) {
            return {
                success: false,
                message: 'Unauthorized'
            }
        }

        if (!process.env.API) {
            return {
                success: false,
                message: 'Server configuration error'
            }
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
        
        if (!response.ok) {
            return {
                success: false,
                message: payload.message || 'Failed to change password'
            }
        }

        return {
            success: true,
            message: 'Password changed successfully'
        }

    } catch (error) {
        return {
            success: false,
            message: 'An error occurred'
        }
    }
}