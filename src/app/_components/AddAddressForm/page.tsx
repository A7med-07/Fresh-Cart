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
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-6 sm:p-8 max-w-3xl mx-auto border-2 border-gray-100 hover:shadow-3xl transition-shadow duration-500">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
            <MapPin className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Add New Address
            </h2>
            <p className="text-gray-600 text-sm mt-1">Fill in the details below</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-xl transition-all duration-300 transform hover:scale-110"
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Divider */}
      <div className="h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-full mb-8"></div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Name & City Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-700 font-semibold flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Address Name
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Home, Office, Work"
              disabled={loading}
              required
              className="bg-white border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-xl p-4 transition-all duration-300 hover:border-green-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city" className="text-gray-700 font-semibold flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              City
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="city"
              name="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
              placeholder="e.g. Cairo, Alexandria"
              disabled={loading}
              required
              className="bg-white border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-xl p-4 transition-all duration-300 hover:border-green-300"
            />
          </div>
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-gray-700 font-semibold flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Phone Number
            <span className="text-red-500">*</span>
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. 01012345678"
            disabled={loading}
            required
            className="bg-white border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-xl p-4 transition-all duration-300 hover:border-green-300"
          />
        </div>

        {/* Details */}
        <div className="space-y-2">
          <Label htmlFor="details" className="text-gray-700 font-semibold flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Address Details
            <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="details"
            name="details"
            value={formData.details}
            onChange={handleChange}
            placeholder="Street, Building, Floor, Apartment..."
            disabled={loading}
            required
            rows={4}
            className="resize-none bg-white border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-xl p-4 transition-all duration-300 hover:border-green-300"
          />
        </div>

        {/* Info Box */}
        <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl p-4">
          <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-green-800">
            Make sure to provide accurate details for faster delivery
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding Address...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <MapPin className="w-5 h-5" />
                Add Address
              </span>
            )}
          </Button>
          {onClose && (
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
              className="sm:w-auto w-full border-2 border-gray-300 hover:border-red-300 hover:bg-red-50 hover:text-red-600 py-6 rounded-xl font-semibold transition-all duration-300"
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}