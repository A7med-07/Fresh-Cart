'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import { MapPin, Trash2, Phone, MapPinned } from 'lucide-react'
import { deleteAddress } from '@/services/address/delete-address'
import { getUserAddresses } from '@/services/address/getUserAddresses'

interface Address {
  _id: string
  name: string
  details: string
  phone: string
  city: string
}

interface AddressListProps {
  onRefresh?: boolean
}

export default function AddressList({ onRefresh }: AddressListProps) {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchAddresses = async () => {
    setLoading(true)
    try {
      const result = await getUserAddresses()
      
      
      const addressData = result?.data || result?.addresses || result || []
      
      setAddresses(addressData)
    } catch (error: any) {
      toast.error('Failed to load addresses')
      setAddresses([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAddresses()
  }, [onRefresh])

  const handleDelete = async (id: string, name: string) => {
    const confirm = window.confirm(`Are you sure you want to delete "${name}" address?`)
    if (!confirm) return

    setDeletingId(id)
    try {
      await deleteAddress(id)
      toast.success('Address deleted successfully!')
      setAddresses(prev => prev.filter(addr => addr._id !== id))
    } catch (error: any) {
      toast.error('Failed to delete address')
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (!addresses || addresses.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 mb-2">No Addresses Yet</h3>
        <p className="text-gray-500">Add your first address to get started</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {addresses.map((address) => (
        <div
          key={address._id}
          className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <MapPinned className="w-5 h-5 text-green-600" />
                <h3 className="font-bold text-lg">{address.name}</h3>
              </div>

              <div className="space-y-2 text-gray-600">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800">{address.city}</p>
                    <p className="text-sm">{address.details}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <p className="text-sm font-medium">{address.phone}</p>
                </div>
              </div>
            </div>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(address._id, address.name)}
              disabled={deletingId === address._id}
              className="ml-4"
            >
              {deletingId === address._id ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}