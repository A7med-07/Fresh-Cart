'use client'
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, ArrowLeft } from 'lucide-react'
import { verifyResetCode } from '@/services/user/verifyResetCode'
import { forgotPassword } from '@/services/user/ForgotPassword'

export default function VerifyResetCodePage() {
  const [resetCode, setResetCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [email, setEmail] = useState('')
  const router = useRouter()

  useEffect(() => {
    const savedEmail = localStorage.getItem('resetEmail')
    if (savedEmail) {
      setEmail(savedEmail)
    } else {
      toast.error('Please start the password reset process')
      router.push('/forgot-password')
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!resetCode) {
      toast.error('Please enter the reset code')
      return
    }

    if (resetCode.length !== 6) {
      toast.error('Reset code must be 6 digits')
      return
    }

    if (!email) {
      toast.error('Email not found. Please try again.')
      router.push('/forgot-password')
      return
    }

    setLoading(true)

    try {
      
      const result = await verifyResetCode(email, resetCode)

      if (result?.success) {
        toast.success('Code verified successfully!')
      
        localStorage.setItem('verifiedResetCode', resetCode)
        router.push('/reset-password')
      } else {
        toast.error(result?.message || 'Invalid or expired reset code')
      }
      
    } catch (error) {
      console.error('Verification error:', error)
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleResendCode = async () => {
    if (!email) {
      toast.error('Email not found')
      router.push('/forgot-password')
      return
    }

    setResending(true)

    try {
      const result = await forgotPassword(email)

      if (result?.success) {
        toast.success('New code sent to your email!')
        setResetCode('')
      } else {
        toast.error(result?.message || 'Failed to resend code')
      }
      
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setResending(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <Mail className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Check Your Email</h1>
          <p className="text-gray-600">
            We sent a 6-digit code to
          </p>
          <p className="font-semibold text-gray-800 mt-1">{email}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="resetCode" className="text-center block mb-2">
                Enter Verification Code
              </Label>
              <Input
                id="resetCode"
                type="text"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value.replace(/\D/g, ''))}
                placeholder="000000"
                maxLength={6}
                disabled={loading}
                className="text-center text-3xl tracking-[0.5em] font-mono font-bold"
                autoFocus
              />
              <p className="text-xs text-gray-500 text-center mt-2">
                Enter the 6-digit code from your email
              </p>
            </div>

            <Button 
              type="submit" 
              disabled={loading || resetCode.length !== 6}
              className="w-full"
            >
              {loading ? 'Verifying...' : 'Verify Code'}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <p className="text-sm text-gray-600">Didn't receive the code?</p>
            <button
              onClick={handleResendCode}
              disabled={resending}
              className="text-sm font-medium text-green-600 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resending ? 'Resending...' : 'Resend Code'}
            </button>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link 
            href="/forgot-password" 
            className="inline-flex items-center gap-2 text-sm text-green-600 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Use a different email
          </Link>
        </div>
      </div>
    </div>
  )
}