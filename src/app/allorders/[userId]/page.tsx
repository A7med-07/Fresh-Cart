'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import CartLoading from '@/app/CartLoading/page'

export default function AllOrdersPage() {
    const params = useParams()
    const userId = params.userId as string
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (userId) {
            localStorage.setItem('userId', userId)
            setLoading(true)
            fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
                .then(res => res.json())
                .then(data => {
                    setOrders(data)
                    setLoading(false)
                })
                .catch(err => {
                    console.error(err)
                    setLoading(false)
                })
                 
        }
    }, [userId])
   

    if (loading) return <CartLoading/>

    return (
        <div className="container mx-auto px-4 py-12 bg-gradient-to-b from-white via-blue-50/10 to-gray-50 min-h-screen">
            {/* Header Section */}
            <div className="mb-10 text-center opacity-0 animate-[fadeIn_0.6s_ease-out_forwards]">
                <div className="inline-flex items-center gap-3 bg-white rounded-2xl shadow-lg px-8 py-4 border border-gray-100">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-md">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        My Orders
                    </h1>
                    {orders.length > 0 && (
                        <span className="text-sm font-semibold text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
                            {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
                        </span>
                    )}
                </div>
            </div>

            {!orders || orders.length === 0 ? (
                <div className="text-center py-20 opacity-0 animate-[fadeIn_0.6s_ease-out_0.2s_forwards]">
                    <div className="mx-auto mb-6 h-24 w-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <p className="text-xl text-gray-500 font-medium">No orders yet</p>
                    <p className="text-gray-400 mt-2">Start shopping to see your orders here</p>
                </div>
            ) : (
                <div className="space-y-6 max-w-5xl mx-auto">
                    {orders.map((order: any, index: number) => (
                        <div 
                            key={order._id} 
                            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 opacity-0 animate-[fadeIn_0.6s_ease-out_forwards]"
                            style={{ animationDelay: `${index * 0.15}s` }}
                        >
                            {/* Order Header */}
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6 bg-gradient-to-r from-gray-50 to-blue-50/30 border-b-2 border-gray-100">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-gray-500">Order ID:</span>
                                        <span className="font-mono text-sm font-bold text-gray-700 bg-white px-3 py-1 rounded-lg shadow-sm">
                                            #{order._id.slice(-8).toUpperCase()}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {new Date(order.createdAt).toLocaleDateString('en-US', { 
                                            year: 'numeric', 
                                            month: 'long', 
                                            day: 'numeric' 
                                        })}
                                    </p>
                                </div>
                                <div className="text-left md:text-right space-y-2">
                                    <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                        {order.totalOrderPrice} <span className="text-lg">EGP</span>
                                    </p>
                                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold shadow-sm ${
                                        order.isDelivered 
                                            ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200' 
                                            : 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border border-yellow-200'
                                    }`}>
                                        {order.isDelivered ? '✓ Delivered' : '⏳ Pending'}
                                    </span>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="p-6 space-y-4">
                                <h3 className="font-semibold text-lg text-gray-800 mb-4 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                    Order Items
                                </h3>
                                {order.cartItems?.map((item: any, itemIndex: number) => (
                                    <div 
                                        key={item._id} 
                                        className="flex gap-4 items-center bg-gradient-to-r from-gray-50 to-transparent p-4 rounded-xl border border-gray-100 hover:border-blue-200 transition-all duration-300 group"
                                    >
                                        <div className="relative overflow-hidden rounded-xl shadow-md group-hover:shadow-lg transition-shadow duration-300">
                                            <Image
                                                src={item.product.imageCover}
                                                alt={item.product.title}
                                                width={90}
                                                height={90}
                                                className="rounded-xl object-cover transform group-hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="flex-grow space-y-1">
                                            <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                                                {item.product.title}
                                            </h4>
                                            <div className="flex gap-4 text-sm text-gray-600">
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                    </svg>
                                                    Qty: <span className="font-semibold text-gray-800">{item.count}</span>
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    Price: <span className="font-semibold text-gray-800">{item.price} EGP</span>
                                                </span>
                                            </div>
                                        </div>
                                        <p className="font-bold text-xl text-green-600">
                                            {item.count * item.price} <span className="text-sm text-gray-500">EGP</span>
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Shipping Address */}
                            <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/30 p-6 border-t border-gray-100">
                                <div className="flex items-start gap-3">
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center flex-shrink-0 shadow-md">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-semibold text-gray-800 mb-2 text-lg">Shipping Address</p>
                                        <div className="space-y-1 text-sm text-gray-600">
                                            <p className="flex items-center gap-2">
                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                {order.shippingAddress.details}
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                </svg>
                                                {order.shippingAddress.city}
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                                Phone: <span className="font-semibold text-gray-700">{order.shippingAddress.phone}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    )
}