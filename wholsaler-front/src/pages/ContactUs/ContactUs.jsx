import React from 'react'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
export default function ContactUs() {
    return (
        <div className='flex flex-col font-Dana min-h-screen'>
            <div className='flex-1 flex flex-col'>
                <Navbar />
                <div className="custome-container mx-auto md:px-16 bg-white shadow-md rounded-lg">
                    <div className='rounded-lg flex flex-col my-2 gap-5 font-Dana border-2 border-corn-flower p-10'>
                        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">تماس با ما</h1>

                        {/* اطلاعات تماس */}
                        <div className="grid md:grid-cols-3 gap-6 mb-8 child:justify-center child:gap-x-2   ">
                            <div className="flex items-center space-x-4 ">
                                <p className="text-gray-700">+98 123 456 789</p>
                                <FaPhoneAlt className="text-gray-600 text-2xl" />
                            </div>
                            <div className="flex items-center space-x-4">
                                <p className="text-gray-700">info@example.com</p>
                                <FaEnvelope className="text-gray-600 text-2xl" />
                            </div>
                            <div className="flex items-center space-x-4">
                                <p className="text-gray-700">تهران، ایران</p>
                                <FaMapMarkerAlt className="text-gray-600 text-2xl" />
                            </div>
                        </div>

                        {/* شبکه‌های اجتماعی */}
                        <div className="mt-8 text-center">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">ما را در شبکه‌های اجتماعی دنبال کنید</h2>
                            <div className="flex justify-center gap-x-6 text-2xl text-gray-600">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                    <FaFacebook className="hover:text-blue-500 transition" />
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                    <FaInstagram className="hover:text-pink-500 transition" />
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                    <FaTwitter className="hover:text-blue-400 transition" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
