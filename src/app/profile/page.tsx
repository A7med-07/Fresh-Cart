'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import AllOrdersPage from '../allorders/[userId]/page'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import ChangePasswordForm from '../_components/ChangePasswordForm/ChangePasswordForm'




export default function ProfilePage() {
    const { data: session } = useSession()
    const [activeTab, setActiveTab] = useState('profile')
    const [userId, setUserId] = useState<string | null>(null)

    useEffect(() => {
        const savedUserId = localStorage.getItem('userId')
        setUserId(savedUserId)
    }, [])

    return (
        <div className="container mx-auto px-4 py-8 h-screen">
            <h1 className="text-3xl font-bold mb-8">My Account</h1>

            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b">
                <button
                    onClick={() => setActiveTab('profile')}
                    className={`pb-2 px-4 ${activeTab === 'profile'
                            ? 'border-b-2 border-green-600 text-green-600 font-semibold'
                            : 'text-gray-600'
                        }`}
                >
                    Profile Info
                </button>
                <button
                    onClick={() => setActiveTab('orders')}
                    className={`pb-2 px-4 ${activeTab === 'orders'
                            ? 'border-b-2 border-green-600 text-green-600 font-semibold'
                            : 'text-gray-600'
                        }`}
                >
                    My Orders
                </button>
                <button
                    onClick={() => setActiveTab('settings')}
                    className={`pb-2 px-4 ${activeTab === 'settings'
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