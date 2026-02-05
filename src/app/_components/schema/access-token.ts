import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"

export async function getAccessToken(){
    const cookieStore = await cookies()
    
    // جرب الاتنين (development و production)
    const authToken = cookieStore.get('__Secure-next-auth.session-token')?.value 
                   || cookieStore.get('next-auth.session-token')?.value
    
    console.log('🍪 Cookie found:', !!authToken)
    
    if (!authToken) {
        console.error('❌ No session token found')
        return null
    }
    
    try {
        const token = await decode({
            token: authToken,
            secret: process.env.NEXTAUTH_SECRET!
        })
        
        console.log('✅ Token decoded, has token:', !!token?.token)
        
        return token?.token as string | null
    } catch (error) {
        console.error('❌ Token decode error:', error)
        return null
    }
}