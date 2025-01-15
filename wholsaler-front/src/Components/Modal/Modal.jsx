import React, { useEffect, useState } from 'react';
import { IoClose } from "react-icons/io5";;

export default function Modal({ isOpen, onClose, children, className="" , blur=true , opacity= "bg-opacity-70" }) {

    const [isVisible, setIsVisible] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true)
            setTimeout(() =>
                setIsAnimating(true)
                , 100)
        } else {
            setIsAnimating(false)
            setTimeout(() =>
                setIsVisible(false)
                , 100)
        }
    }, [isOpen])

    if (!isOpen && !isVisible) return null;

    return (
        <div dir='rtl' className={`fixed inset-0 bg-black ${opacity}  z-50 transition-opacity ease-out duration-100 ${blur ? "backdrop-blur-md" : ""} ${isAnimating ? "opacity-100" : "opacity-0"} ${className}`} >
            {/* close btn */}
            <IoClose onClick={onClose} className='size-8 bg-[#383854] rounded-full z-50 absolute cursor-pointer top-6 sm:top-10 right-6 sm:right-10 text-white' />
            <div className=' w-full grid grid-cols-12 '>
                {children}
            </div>
        </div>
    )
}
