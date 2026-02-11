import React from 'react'
import logo from '../../../assets/logo.svg'
import Image from 'next/image'

export default function Footer() {
  return <>
    <footer className="bg-gradient-to-b from-gray-100 to-gray-200 text-gray-900 mt-20 px-4 sm:px-6 md:px-10 lg:px-0 overflow-hidden border-t-4 border-green-500">

      <div className="w-full md:w-[90%] mx-auto py-10 sm:py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 justify-items-center">
        
        {/* Brand Section */}
        <div className="text-center md:text-left space-y-4">
          <h3 className="text-lg font-bold mb-4">
            <a href="/" className="flex items-center justify-center md:justify-start space-x-3 rtl:space-x-reverse transform hover:scale-105 transition-transform duration-300">
              <Image src={logo} width={150} height={50} alt='logo' />
            </a>
          </h3>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            FreshCart offers the best fresh products with top quality and affordable prices.
          </p>
          <div className="flex gap-3 justify-center md:justify-start">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
            <div className="h-2 w-2 rounded-full bg-teal-500"></div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left">
          <h4 className="font-bold text-lg mb-4 text-gray-800 border-b-2 border-green-500 inline-block pb-2">
            Quick Links
          </h4>
          <ul className="space-y-3">
            <li>
              <a className="text-gray-700 hover:text-green-600 transition-all duration-300 flex items-center justify-center md:justify-start gap-2 group" href="/">
                <svg className="w-4 h-4 text-green-500 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Home
              </a>
            </li>
            <li>
              <a className="text-gray-700 hover:text-green-600 transition-all duration-300 flex items-center justify-center md:justify-start gap-2 group" href="/products">
                <svg className="w-4 h-4 text-green-500 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Products
              </a>
            </li>
            <li>
              <a className="text-gray-700 hover:text-green-600 transition-all duration-300 flex items-center justify-center md:justify-start gap-2 group" href="/categories">
                <svg className="w-4 h-4 text-green-500 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Categories
              </a>
            </li>
            <li>
              <a className="text-gray-700 hover:text-green-600 transition-all duration-300 flex items-center justify-center md:justify-start gap-2 group" href="/brands">
                <svg className="w-4 h-4 text-green-500 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Brands
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="text-center md:text-left">
          <h4 className="font-bold text-lg mb-4 text-gray-800 border-b-2 border-green-500 inline-block pb-2">
            Contact Us
          </h4>
          <div className="space-y-3">
            <p className="text-gray-700 text-sm sm:text-base flex items-center justify-center md:justify-start gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              support@freshcart.com
            </p>
            <p className="text-gray-700 text-sm sm:text-base flex items-center justify-center md:justify-start gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +20 1011012015
            </p>
            <p className="text-gray-700 text-sm sm:text-base flex items-center justify-center md:justify-start gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Al-Beheira, Egypt
            </p>
          </div>
        </div>

        {/* Social Media */}
        <div className="text-center md:text-left">
          <h4 className="font-bold text-lg mb-4 text-gray-800 border-b-2 border-green-500 inline-block pb-2">
            Follow Us
          </h4>
          <div className="flex gap-4 justify-center md:justify-start">
            <a href="#" className="group">
              <div className="p-3 rounded-xl bg-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </div>
            </a>
            <a href="#" className="group">
              <div className="p-3 rounded-xl bg-white hover:bg-gradient-to-r hover:from-sky-400 hover:to-sky-500 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 text-sky-500 group-hover:text-white transition-colors duration-300">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </div>
            </a>
            <a href="#" className="group">
              <div className="p-3 rounded-xl bg-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-rose-500 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 text-pink-600 group-hover:text-white transition-colors duration-300">
                  <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </div>
            </a>
            <a href="#" className="group">
              <div className="p-3 rounded-xl bg-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 text-blue-700 group-hover:text-white transition-colors duration-300">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width={4} height={12} x={2} y={9} />
                  <circle cx={4} cy={4} r={2} />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t-2 border-gray-300 mt-8 py-6 bg-gradient-to-r from-gray-200 to-gray-100">
        <div className="text-center text-gray-700 text-xs sm:text-sm">
          <p className="flex items-center justify-center gap-2 flex-wrap">
            <span>© 2026 FreshCart. All rights reserved.</span>
            <span className="hidden sm:inline">|</span>
            <span className="font-bold text-emerald-600 cursor-pointer hover:text-emerald-700 transition-colors duration-300 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
              By Ahmed Sabry
            </span>
          </p>
        </div>
      </div>
    </footer>

  </>

}