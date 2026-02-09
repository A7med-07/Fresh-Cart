'use server'

export async function verifyResetCode(email: string, resetCode: string) {
    try {
        if (!email || !resetCode) {
            return {
                success: false,
                message: 'Email and reset code are required'
            }
        }

        if (!process.env.API) {
            return {
                success: false,
                message: 'Server configuration error'
            }
        }

        console.log('Verifying reset code for:', email)
        console.log('Reset code:', resetCode)

        const response = await fetch(`${process.env.API}auth/verifyResetCode`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                resetCode
            })
        })

        const payload = await response.json()
        
        console.log('Verify response status:', response.status)
        console.log('Verify response payload:', payload)
        
        if (!response.ok) {
            return {
                success: false,
                message: payload.message || 'Invalid or expired reset code',
                statusCode: response.status
            }
        }

        return {
            success: true,
            message: payload.message || 'Reset code verified successfully',
            data: payload
        }

    } catch (error: any) {
        console.error('Verify reset code error:', error)
        return {
            success: false,
            message: error.message || 'An error occurred while verifying reset code'
        }
    }
}