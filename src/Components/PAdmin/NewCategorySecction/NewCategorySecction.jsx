import React, { useState } from 'react'
import Header from '../Header/Header'
import { CiImageOn } from "react-icons/ci";
export default function NewCategorySecction() {
    const [imageCategori, setImageCategori] = useState("هیچ عکسی انتخاب نشدهاست")
    const inputChangeHanler = (event) => {
        if (event.target.files.length > 0) {
            setImageCategori(event.target.files[0].name)
        } else {
            setImageCategori("هیچ عکسی انتخاب نشده است")
        }
    }
    return (
        <div className='col-span-8 sm:col-span-4 lg:col-span-2'>
            <Header text="افزودن دسته بندی جدید" />
            <div className=' px-5 sm:px-2 py-4 '>
                <div className='relative'>
                    <input className='w-full text-white text-base text-center font-Dana outline-none px-2 rounded-md h-11 bg-transparent border-2  border-[#1d1d2d]' type="text" />
                    <span className='absolute text-sm right-3 px-1 bg-[#383854] -top-3 font-Dana text-white' > اسم</span>
                </div>
            </div>
            <div className=' px-5 sm:px-2 py-1  '>
                <div dir="ltr" className='relative flex justify-between items-center pr-2 rounded-md h-11 bg-transparent border-2  border-[#1d1d2d]'>
                    <input onChange={(event) => inputChangeHanler(event)} id="imageMainCategory" className=' hidden text-white text-base text-center font-Dana outline-none px-2 rounded-md h-9 bg-transparent border-2  border-[#1d1d2d]' type="file" accept='image/*' />
                    <span className='absolute text-sm right-3 px-1 bg-[#383854] -top-3 font-Dana text-white' >انتخاب تصویر</span>
                    <label htmlFor="imageMainCategory" className='flex justify-center items-center cursor-pointer'>
                        <CiImageOn className='size-7 text-white' />
                    </label>
                    <span className='font-Dana text-white items-center flex justify-center '>{imageCategori}</span>
                </div>
            </div>
            <div className=' px-6 sm:px-2 py-3  ' >
                <button className='w-full transition-all duration-300 hover:bg-green-700 rounded-md h-9 font-DanaMedium text-base bg-green-300' >
                    ثبت
                </button>
            </div>
        </div>
    )
}
