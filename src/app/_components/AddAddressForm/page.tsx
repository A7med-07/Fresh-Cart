'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import toast from 'react-hot-toast'
import { MapPin, X } from 'lucide-react'
import { addAddress } from '@/services/address/add-address'

interface AddAddressFormProps {
  onSuccess?: () => void
  onClose?: () => void
}

export default function AddAddressForm({ onSuccess, onClose }: AddAddressFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    details: '',
    phone: '',
    city: ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.name || !formData.details || !formData.phone || !formData.city) {
      toast.error('Please fill all fields')
      return
    }

    if (formData.phone.length < 10) {
      toast.error('Please enter a valid phone number')
      return
    }

    setLoading(true)

    try {
      const result = await addAddress({
        name: formData.name,
        details: formData.details,
        phone: formData.phone,
        city: formData.city
      })

      if (result) {
        toast.success('Address added successfully!')
        // Reset form
        setFormData({
          name: '',
          details: '',
          phone: '',
          city: ''
        })
        onSuccess?.()
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to add address')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold">Add New Address</h2>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Address Name *</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Home, Office, Work"
              disabled={loading}
              required
            />
          </div>

          <div>
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              name="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
              placeholder="e.g. Cairo, Alexandria"
              disabled={loading}
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. 01012345678"
            disabled={loading}
            required
          />
        </div>

        <div>
          <Label htmlFor="details">Address Details *</Label>
          <Textarea
            id="details"
            name="details"
            value={formData.details}
            onChange={handleChange}
            placeholder="Street, Building, Floor, Apartment..."
            disabled={loading}
            required
            rows={4}
            className="resize-none"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            disabled={loading}
            className="flex-1"
          >
            {loading ? 'Adding Address...' : 'Add Address'}
          </Button>
          {onClose && (
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}