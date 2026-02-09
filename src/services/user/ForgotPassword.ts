'use server'

export async function forgotPassword(email: string) {
    try {
        if (!email) {
            return {
                success: false,
                message: 'Email is required'
            }
        }

        if (!process.env.API) {
            return {
                success: false,
                message: 'Server configuration error'
            }
        }

        console.log('Sending forgot password request to:', `${process.env.API}auth/forgotPasswords`)
        console.log('Email:', email)

        const response = await fetch(`${process.env.API}auth/forgotPasswords`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email
            })
        })

        const payload = await response.json()
        
        console.log('Response status:', response.status)
        console.log('Response payload:', payload)
        
        if (!response.ok) {
            return {
                success: false,
                message: payload.message || payload.error || 'Failed to send reset code',
                statusCode: response.status
            }
        }

        return {
            success: true,
            message: payload.message || 'Reset code sent to your email',
            data: payload
        }

    } catch (error: any) {
        console.error('Forgot password error:', error)
        return {
            success: false,
            message: error.message || 'An error occurred while sending reset code'
        }
    }
}