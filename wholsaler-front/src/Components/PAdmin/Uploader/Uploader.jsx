import React, { useState } from 'react'
import { CiImageOn } from "react-icons/ci";


export default function Uploader({ value, setFunc, className, token, bgClassName = "text-sm right-3 px-1 bg-[#383854] -top-3 font-Dana text-white" }) {
    const handleFileChange = async (event) => {
        if (event.target.files.length > 0) {
            console.log("فایل جدید انتخاب شد:", event.target.files[0]);
            await setFunc( event.target.files[0])
        }
    };

    return (
        < div className={`${className} flex items-center gap-2 `}>
            <div dir="ltr" className='relative w-full flex justify-between items-center pr-2 rounded-md h-11 bg-transparent border-2  border-[#55555e]'>
                <input onChange={handleFileChange} id="imageMainCategory" className=' hidden text-white text-base text-center font-Dana outline-none px-2 rounded-md h-9 bg-transparent border-2  border-[#1d1d2d]' type="file" accept='image/*' />
                <span className={`absolute ${bgClassName}`}  >انتخاب تصویر</span>
                <label htmlFor="imageMainCategory" className='flex justify-center items-center cursor-pointer'>
                    <CiImageOn className='size-7 text-white' />
                </label>
                <span className='font-Dana text-white items-center flex justify-center text-sm lg:text-xs xl:text-sm overflow-hidden '> {value === '' ? "هیچ عکسی انتخاب نشده است" : value} </span>
            </div>
        </div >
    )
}
