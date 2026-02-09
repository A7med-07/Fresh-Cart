'use server'

export async function resetPassword(email: string, resetCode: string, newPassword: string) {
    try {
        if (!email || !resetCode || !newPassword) {
            return {
                success: false,
                message: 'Email, reset code, and new password are required'
            }
        }

        if (!process.env.API) {
            return {
                success: false,
                message: 'Server configuration error'
            }
        }

        console.log('Resetting password for:', email)
        console.log('Reset code:', resetCode)

        const response = await fetch(`${process.env.API}auth/resetPassword`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                resetCode,
                newPassword
            })
        })

        const payload = await response.json()
        
        console.log('Reset password response status:', response.status)
        console.log('Reset password response payload:', payload)
        
        if (!response.ok) {
            return {
                success: false,
                message: payload.message || 'Failed to reset password',
                statusCode: response.status
            }
        }

        return {
            success: true,
            message: payload.message || 'Password reset successfully',
            data: payload
        }

    } catch (error: any) {
        console.error('Reset password error:', error)
        return {
            success: false,
            message: error.message || 'An error occurred while resetting password'
        }
    }
}