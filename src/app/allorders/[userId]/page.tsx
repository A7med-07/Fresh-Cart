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
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">My Orders</h1>

            {!orders || orders.length === 0 ? (
                <p className="text-center text-gray-500">No orders yet</p>
            ) : (
                <div className="space-y-6">
                    {orders.map((order: any) => (
                        <div key={order._id} className="bg-white rounded-lg shadow-lg p-6">
                            <div className="flex justify-between items-center mb-4 pb-4 border-b">
                                <div>
                                    <p className="text-sm text-gray-500">Order #{order._id.slice(-8)}</p>
                                    <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-green-600">{order.totalOrderPrice} EGP</p>
                                    <span className={`inline-block px-3 py-1 rounded-full text-sm ${order.isDelivered ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {order.isDelivered ? 'Delivered' : 'Pending'}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3 mb-4">
                                {order.cartItems?.map((item: any) => (
                                    <div key={item._id} className="flex gap-4 items-center bg-gray-50 p-3 rounded">
                                        <Image
                                            src={item.product.imageCover}
                                            alt={item.product.title}
                                            width={80}
                                            height={80}
                                            className="rounded object-cover"
                                        />
                                        <div className="flex-grow">
                                            <h3 className="font-semibold">{item.product.title}</h3>
                                            <p className="text-sm text-gray-600">Quantity: {item.count}</p>
                                            <p className="text-sm text-gray-600">Price: {item.price} EGP</p>
                                        </div>
                                        <p className="font-bold">{item.count * item.price} EGP</p>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-gray-50 p-3 rounded">
                                <p className="font-semibold mb-2">Shipping Address:</p>
                                <p className="text-sm">{order.shippingAddress.details}</p>
                                <p className="text-sm">{order.shippingAddress.city}</p>
                                <p className="text-sm">Phone: {order.shippingAddress.phone}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}