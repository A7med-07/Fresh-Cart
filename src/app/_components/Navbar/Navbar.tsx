'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import logo from '../../../assets/logo.svg'
import { signOut, useSession } from 'next-auth/react'
import { Badge } from '@/components/ui/badge'
import { Dropdown } from '../dropDown/DropDown'
import { useQuery } from '@tanstack/react-query'
import { CartResponse } from '@/types/cart-response'
import { WishListResponse } from '@/types/wishList-response'


export default function Navbar() {

    const { data: cartData, isLoading, isError } = useQuery<CartResponse>({
        queryKey: ['get-cart'],
        queryFn: async () => {
            const response = await fetch(`/api/cart`)
            const payload = await response.json()
            return payload
        }
    })


    const { data: WishListData, isLoadingError } = useQuery<WishListResponse>({
        queryKey: ['get-wishlist'],
        queryFn: async () => {
            const response = await fetch(`/api/wishlist`)
            const payload = await response.json()
            return payload
        }
    })

    let { status, data: session } = useSession()
    const [isOpen, setisOpen] = useState(false)

    function logout() {
        signOut({
            callbackUrl: '/login'
        })
    }

    function toggleNav() {
        setisOpen(!isOpen)
    }

    const pathname = usePathname()

    const path = [
        { href: '/', content: 'Home' },
        { href: '/products', content: 'Products' },
        { href: '/brands', content: 'Brands' },
        { href: '/categories', content: 'Categories' },

    ]

    const authPath = [
        { href: '/login', content: 'Login' },
        { href: '/register', content: 'Register' },
    ]

    return <>
        <nav className="bg-white border-b-2 border-gray-100 w-full z-20 top-0 start-0 sticky shadow-md">
            <div className="max-w-screen-xl flex flex-wrap md:flex-nowrap md:gap-16 items-center justify-between mx-auto p-4">
                {/* Logo */}
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Image src={logo} width={150} height={50} alt='logo' />
                </a>

                {/* Mobile Menu Button */}
                <button 
                    onClick={toggleNav} 
                    type="button" 
                    className="inline-flex items-center p-2.5 w-10 h-10 justify-center text-gray-600 rounded-xl md:hidden hover:bg-green-50 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-300 shadow-sm"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                <div className={`${!isOpen && 'hidden'} w-full md:flex justify-between`}>
                    {/* Main Navigation */}
                    <ul className="font-medium flex flex-col p-4 md:p-0 rounded-xl bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent gap-2 md:gap-0">
                        {path.map((elem) => {
                            return <li key={elem.content}>
                                <Link 
                                    href={elem.href} 
                                    className={`block py-2.5 px-4 text-gray-700 rounded-lg font-semibold transition-all duration-300 ${
                                        pathname === elem.href 
                                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md transform scale-105' 
                                            : 'hover:bg-green-50 hover:text-green-600 hover:shadow-sm'
                                    }`}
                                >
                                    {elem.content}
                                </Link>
                            </li>
                        })}
                    </ul>

                    {/* Auth/User Section */}
                    <ul className="font-medium flex justify-center items-center flex-col p-4 md:p-0 rounded-xl bg-gray-50 md:flex-row md:space-x-6 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent gap-4 md:gap-0">
                        {status === 'loading' ? (
                            <li className="flex items-center gap-2">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-600"></div>
                                <span className="text-gray-600 text-sm">Loading...</span>
                            </li>
                        ) : status === 'authenticated' ? (
                            <>
                                {/* Wishlist */}
                                <li className='relative group'>
                                    <Link href="/wishList" className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-pink-50 transition-all duration-300">
                                        <span className='text-gray-700 group-hover:text-pink-600 font-medium transition-colors duration-300'>
                                            Wishlist
                                        </span>
                                        <div className="relative">
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                fill="none" 
                                                viewBox="0 0 24 24" 
                                                strokeWidth={1.5} 
                                                stroke="currentColor" 
                                                className="w-6 h-6 text-pink-500 group-hover:scale-110 transition-transform duration-300"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                            </svg>
                                            {WishListData && WishListData?.count > 0 && (
                                                <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-red-500 text-white border-2 border-white shadow-lg min-w-[20px] h-5 flex items-center justify-center p-1 animate-pulse">
                                                    {WishListData?.count}
                                                </Badge>
                                            )}
                                        </div>
                                    </Link>
                                </li>

                                {/* Cart */}
                                <li className='relative group'>
                                    <Link href="/cart" className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-green-50 transition-all duration-300">
                                        <span className='text-gray-700 group-hover:text-green-600 font-medium transition-colors duration-300'>
                                            Cart
                                        </span>
                                        <div className="relative">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6 text-green-500 group-hover:scale-110 transition-transform duration-300"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                                />
                                            </svg>
                                            {cartData && cartData?.numOfCartItems > 0 && (
                                                <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white border-2 border-white shadow-lg min-w-[20px] h-5 flex items-center justify-center p-1 animate-pulse">
                                                    {cartData?.numOfCartItems}
                                                </Badge>
                                            )}
                                        </div>
                                    </Link>
                                </li>

                                {/* User Greeting */}
                                <li className='text-sm md:text-base font-semibold text-gray-700 bg-gradient-to-r from-gray-100 to-gray-50 px-4 py-2 rounded-xl hidden md:block'>
                                    Hi, <span className="text-green-600">{session?.user?.name?.split(' ')[0]}</span>
                                </li>

                                {/* Dropdown */}
                                <Dropdown logout={logout} />
                            </>
                        ) : (
                            authPath.map((elem) => {
                                return <li key={elem.content}>
                                    <Link 
                                        href={elem.href} 
                                        className="block py-2.5 px-6 text-gray-700 rounded-xl font-semibold hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
                                    >
                                        {elem.content}
                                    </Link>
                                </li>
                            })
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    </>
}