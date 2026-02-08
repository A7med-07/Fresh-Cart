'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import toast from 'react-hot-toast'
import { ChangeMyPassword } from '@/services/user/ChangePassword'

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!currentPassword || !password || !rePassword) {
      toast.error('Please fill all fields')
      return
    }

    if (password !== rePassword) {
      toast.error('New passwords do not match')
      return
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      const result = await ChangeMyPassword({
        currentPassword,
        password,
        rePassword
      })

      console.log('Result:', result) // شوف الـ result

      toast.success('Password changed successfully')
      
      // Reset form
      setCurrentPassword('')
      setPassword('')
      setRePassword('')
      
    } catch (error: any) {
      console.error('Error:', error) // شوف الـ error
      toast.error(error.message || 'Failed to change password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <Label htmlFor="currentPassword">Current Password</Label>
        <Input
          id="currentPassword"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Enter current password"
          disabled={loading}
        />
      </div>

      <div>
        <Label htmlFor="password">New Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter new password"
          disabled={loading}
        />
      </div>

      <div>
        <Label htmlFor="rePassword">Confirm New Password</Label>
        <Input
          id="rePassword"
          type="password"
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
          placeholder="Confirm new password"
          disabled={loading}
        />
      </div>

      <Button 
        type="submit" 
        disabled={loading}
        className="w-full"
      >
        {loading ? 'Changing...' : 'Change Password'}
      </Button>
    </form>
  )
}