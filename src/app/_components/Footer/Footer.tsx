import React from 'react'
import logo from '../../../assets/logo.svg'
import Image from 'next/image'

export default function Footer() {
  return <>
    <footer className="bg-gray-200 text-gray-900 mt-10 px-4 sm:px-6 md:px-10 lg:px-0  overflow-hidden ">

      <div className="w-full md:w-[90%] mx-auto py-6 sm:py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 justify-items-center">
        <div className="text-center md:text-left"><h3 className="text-lg font-bold mb-3">
          <a href="/" className="flex items-center justify-center md:justify-start space-x-3 rtl:space-x-reverse">
            <Image src={logo} width={150} height={50} alt='logo' />
          </a>
        </h3><p className="text-gray-900 text-sm sm:text-base">FreshCart offers the best fresh products with top quality and affordable prices.</p>
        </div>
        <div className="text-center md:text-left">
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a className="hover:text-green-500 transition" href="/">Home</a>
            </li>
            <li>
              <a className="hover:text-green-500 transition" href="/products">Products</a>
            </li>
            <li>
              <a className="hover:text-green-500 transition" href="/categories">Categories</a>
            </li>
            <li>
              <a className="hover:text-green-500 transition" href="/brands">Brands</a>
            </li>
          </ul>
        </div>
        <div className="text-center md:text-left">
          <h4 className="font-semibold mb-3">Contact Us</h4>
          <p className="text-gray-900 text-sm sm:text-base">Email: support@freshcart.com</p>
          <p className="text-gray-900 text-sm sm:text-base">Phone: +20 1011012015</p>
          <p className="text-gray-900 text-sm sm:text-base">Address: Al-Beheira , Egypt</p>
        </div>
        <div className="text-center md:text-left">
          <h4 className="font-semibold mb-3">Follow Us</h4>
          <div className="flex gap-4 justify-center md:justify-start">
            <a href="#" className="hover:text-green-500 transition">
              <svg xmlns="http://www.w3.org/2000/svg " width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook w-5 h-5" aria-hidden="true">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
            </a>
            <a href="#" className="hover:text-green-500 transition">
              <svg xmlns="http://www.w3.org/2000/svg " width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter w-5 h-5" aria-hidden="true">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
            <a href="#" className="hover:text-green-500 transition">
              <svg xmlns="http://www.w3.org/2000/svg " width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram w-5 h-5" aria-hidden="true">
                <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
            </a>
            <a href="#" className="hover:text-green-500 transition">
              <svg xmlns="http://www.w3.org/2000/svg " width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin w-5 h-5" aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width={4} height={12} x={2} y={9} /><circle cx={4} cy={4} r={2} /></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-6 py-4 text-center text-gray-900 text-xs sm:text-sm">© 2026 FreshCart. <span className='text-bold text-emerald-500 cursor-pointer'>By@ Ahmed Sabry</span> All rights reserved.</div>
    </footer>

  </>

}