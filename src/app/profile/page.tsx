'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

import { Plus } from 'lucide-react'
import AddAddressForm from '../_components/AddAddressForm/page'
import AddressList from '../_components/AddressList/page'

export default function ProfilePage() {
    const { data: session } = useSession()
    const [activeTab, setActiveTab] = useState('profile')
    const [userId, setUserId] = useState<string | null>(null)
    const [showAddForm, setShowAddForm] = useState(false)
    const [refreshAddresses, setRefreshAddresses] = useState(false)

    useEffect(() => {
        const savedUserId = localStorage.getItem('userId')
        setUserId(savedUserId)
    }, [])

    const handleAddressAdded = () => {
        setShowAddForm(false)
        setRefreshAddresses(prev => !prev)
    }

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            <h1 className="text-3xl font-bold mb-8">My Account</h1>

            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b overflow-x-auto">
                <button
                    onClick={() => setActiveTab('profile')}
                    className={`pb-2 px-4 whitespace-nowrap ${
                        activeTab === 'profile'
                            ? 'border-b-2 border-green-600 text-green-600 font-semibold'
                            : 'text-gray-600'
                    }`}
                >
                    Profile Info
                </button>
                <button
                    onClick={() => setActiveTab('addresses')}
                    className={`pb-2 px-4 whitespace-nowrap ${
                        activeTab === 'addresses'
                            ? 'border-b-2 border-green-600 text-green-600 font-semibold'
                            : 'text-gray-600'
                    }`}
                >
                    My Addresses
                </button>
                <button
                    onClick={() => setActiveTab('orders')}
                    className={`pb-2 px-4 whitespace-nowrap ${
                        activeTab === 'orders'
                            ? 'border-b-2 border-green-600 text-green-600 font-semibold'
                            : 'text-gray-600'
                    }`}
                >
                    My Orders
                </button>
                <button
                    onClick={() => setActiveTab('settings')}
                    className={`pb-2 px-4 whitespace-nowrap ${
                        activeTab === 'settings'
                            ? 'border-b-2 border-green-600 text-green-600 font-semibold'
                            : 'text-gray-600'
                    }`}
                >
                    Settings
                </button>
            </div>

            {/* Content */}
            <div>
                {activeTab === 'profile' && (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-bold mb-4">Profile Information</h2>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-600">Name:</p>
                                <p className="font-semibold">{session?.user?.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Email:</p>
                                <p className="font-semibold">{session?.user?.email}</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'addresses' && (
                    <div className="space-y-6">
                        {/* Header with Add Button */}
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold">My Addresses</h2>
                            {!showAddForm && (
                                <Button
                                    onClick={() => setShowAddForm(true)}
                                    className="flex items-center gap-2"
                                >
                                    <Plus className="w-5 h-5" />
                                    Add New Address
                                </Button>
                            )}
                        </div>

                        {/* Add Address Form */}
                        {showAddForm && (
                            <div className="mb-6">
                                <AddAddressForm
                                    onSuccess={handleAddressAdded}
                                    onClose={() => setShowAddForm(false)}
                                />
                            </div>
                        )}

                        {/* Address List */}
                        <AddressList onRefresh={refreshAddresses} />
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-6">My Orders</h2>
                        {userId ? (
                            <Link href={`/allorders/${userId}`} className="text-green-600 hover:underline">
                                View All Orders
                            </Link>
                        ) : (
                            <p>Loading The Orders...</p>
                        )}
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
                        <hr className="my-4" />

                        <Link href="/change-password">
                            <Button>Change Your Password</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}