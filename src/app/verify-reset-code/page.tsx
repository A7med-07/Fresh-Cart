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
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-indigo-50 via-purple-50/30 to-pink-50/20">
      <div className="max-w-lg w-full">
        
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-100 overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-10 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-4 shadow-lg">
              <Mail className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-3">Check Your Email</h1>
            <p className="text-indigo-100 text-lg mb-2">
              We sent a 6-digit code to
            </p>
            <p className="font-bold text-white text-lg bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl inline-block">
              {email}
            </p>
          </div>

          {/* Form Section */}
          <div className="p-8 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Code Input */}
              <div>
                <Label htmlFor="resetCode" className="text-center block mb-4 text-gray-700 font-semibold text-lg">
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
                  className="text-center text-4xl tracking-[0.5em] font-mono font-bold bg-gray-50 border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-2xl p-6 transition-all duration-300"
                  autoFocus
                />
                <div className="flex items-center justify-center gap-2 mt-4">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-gray-600">
                    Enter the 6-digit code from your email
                  </p>
                </div>
              </div>

              {/* Code Progress Indicator */}
              <div className="flex justify-center gap-2">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      i < resetCode.length
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 scale-125'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                disabled={loading || resetCode.length !== 6}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Verify Code
                  </span>
                )}
              </Button>
            </form>

            {/* Resend Section */}
            <div className="mt-8 text-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">Didn't receive the code?</span>
                </div>
              </div>
              
              <button
                onClick={handleResendCode}
                disabled={resending}
                className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold hover:underline disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 group"
              >
                {resending ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Resending...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 transform group-hover:rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Resend Code
                  </>
                )}
              </button>
            </div>

            {/* Timer Notice */}
            <div className="mt-6 flex items-center gap-3 text-sm text-gray-600 bg-indigo-50 p-4 rounded-xl border border-indigo-200">
              <svg className="w-6 h-6 text-indigo-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>The verification code will expire in 10 minutes</span>
            </div>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="text-center mt-6 space-y-3">
          <Link 
            href="/forgot-password" 
            className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 font-semibold hover:underline transition-colors duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            Use a different email
          </Link>
        </div>
      </div>
    </div>
  )
}