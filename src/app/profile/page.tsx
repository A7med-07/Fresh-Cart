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
        <div className="container mx-auto px-4 py-8 min-h-screen bg-gradient-to-br from-gray-50 via-green-50/20 to-emerald-50/30">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent animate-gradient">
                    My Account
                </h1>

                {/* Tabs */}
                <div className="flex gap-2 md:gap-4 mb-8 border-b border-gray-200 overflow-x-auto backdrop-blur-sm bg-white/60 rounded-t-2xl p-3 shadow-sm">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`pb-3 px-4 md:px-6 whitespace-nowrap transition-all duration-300 rounded-t-lg ${
                            activeTab === 'profile'
                                ? 'border-b-3 border-green-600 text-green-600 font-semibold bg-green-50/50 shadow-sm transform scale-105'
                                : 'text-gray-600 hover:text-green-500 hover:bg-gray-50/50'
                        }`}
                    >
                        Profile Info
                    </button>
                    <button
                        onClick={() => setActiveTab('addresses')}
                        className={`pb-3 px-4 md:px-6 whitespace-nowrap transition-all duration-300 rounded-t-lg ${
                            activeTab === 'addresses'
                                ? 'border-b-3 border-green-600 text-green-600 font-semibold bg-green-50/50 shadow-sm transform scale-105'
                                : 'text-gray-600 hover:text-green-500 hover:bg-gray-50/50'
                        }`}
                    >
                        My Addresses
                    </button>
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`pb-3 px-4 md:px-6 whitespace-nowrap transition-all duration-300 rounded-t-lg ${
                            activeTab === 'orders'
                                ? 'border-b-3 border-green-600 text-green-600 font-semibold bg-green-50/50 shadow-sm transform scale-105'
                                : 'text-gray-600 hover:text-green-500 hover:bg-gray-50/50'
                        }`}
                    >
                        My Orders
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`pb-3 px-4 md:px-6 whitespace-nowrap transition-all duration-300 rounded-t-lg ${
                            activeTab === 'settings'
                                ? 'border-b-3 border-green-600 text-green-600 font-semibold bg-green-50/50 shadow-sm transform scale-105'
                                : 'text-gray-600 hover:text-green-500 hover:bg-gray-50/50'
                        }`}
                    >
                        Settings
                    </button>
                </div>

                {/* Content */}
                <div className="animate-fadeIn">
                    {activeTab === 'profile' && (
                        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold text-xl shadow-md">
                                    {session?.user?.name?.charAt(0).toUpperCase()}
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
                            </div>
                            <div className="space-y-5">
                                <div className="p-4 rounded-xl bg-gradient-to-r from-gray-50 to-green-50/30 border border-gray-100 hover:border-green-200 transition-colors duration-300">
                                    <p className="text-sm text-gray-600 mb-1 font-medium">Name</p>
                                    <p className="font-semibold text-lg text-gray-800">{session?.user?.name}</p>
                                </div>
                                <div className="p-4 rounded-xl bg-gradient-to-r from-gray-50 to-green-50/30 border border-gray-100 hover:border-green-200 transition-colors duration-300">
                                    <p className="text-sm text-gray-600 mb-1 font-medium">Email</p>
                                    <p className="font-semibold text-lg text-gray-800">{session?.user?.email}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'addresses' && (
                        <div className="space-y-6">
                            {/* Header with Add Button */}
                            <div className="flex items-center justify-between bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                                <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                    My Addresses
                                </h2>
                                {!showAddForm && (
                                    <Button
                                        onClick={() => setShowAddForm(true)}
                                        className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                                    >
                                        <Plus className="w-5 h-5" />
                                        <span className="hidden sm:inline">Add New Address</span>
                                        <span className="sm:hidden">Add</span>
                                    </Button>
                                )}
                            </div>

                            {/* Add Address Form */}
                            {showAddForm && (
                                <div className="mb-6 animate-slideDown">
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
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                My Orders
                            </h2>
                            {userId ? (
                                <Link 
                                    href={`/allorders/${userId}`} 
                                    className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold text-lg hover:underline decoration-2 underline-offset-4 transition-all duration-300"
                                >
                                    View All Orders
                                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            ) : (
                                <div className="flex items-center gap-3 text-gray-600">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-600"></div>
                                    <p>Loading The Orders...</p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800">Profile Settings</h2>
                            <hr className="my-6 border-gray-200" />

                            <Link href="/change-password">
                                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                                    Change Your Password
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            
            <style jsx global>{`
                @keyframes gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient 3s ease infinite;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.4s ease-out;
                }
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-slideDown {
                    animation: slideDown 0.3s ease-out;
                }
                .border-b-3 {
                    border-bottom-width: 3px;
                }
            `}</style>
        </div>
    )
}