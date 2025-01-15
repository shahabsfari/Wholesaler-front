import React, { useState } from 'react'
import Header from '../Header/Header'
import { CiImageOn } from "react-icons/ci";
export default function AddNewProduct({ className }) {
    const [imageCategori, setImageCategori] = useState("عکسی انتخاب نشده است")
    const inputChangeHanler = (event) => {
        if (event.target.files.length > 0) {
            setImageCategori(event.target.files[0].name)
        } else {
            setImageCategori("هیچ عکسی انتخاب نشده است")
        }
    }
    return (
        <div className={className}>
            <div className='sm:px-2 col-span-12 pb-2 '>
                <Header color='[#55555e]' text="افزودن محصول جدید" />
            </div>
            <div className=' px-2 sm:px-2 py-4 col-span-6 lg:col-span-2  '>
                <div className='relative'>
                    <input className='w-full text-white text-base text-center font-Dana outline-none px-2 rounded-md h-11 bg-transparent border-2  border-[#55555e]' type="text" />
                    <span className='absolute text-sm right-3 px-1 bg-[#383854] -top-3 font-Dana text-white' > اسم</span>
                </div>
            </div>
            <div className=' px-2 sm:px-2 py-4 col-span-6 lg:col-span-2  '>
                <div className='relative'>
                    <input className='w-full text-white text-base text-center font-Dana outline-none px-2 rounded-md h-11 bg-transparent border-2  border-[#55555e]' type="text" />
                    <span className='absolute text-sm right-3 px-1 bg-[#383854] -top-3 font-Dana text-white' > برند</span>
                </div>
            </div>
            <div className=' px-2 sm:px-2 py-4 col-span-6 lg:col-span-2  '>
                <div className='relative'>
                    <input className='w-full text-white text-base text-center font-Dana outline-none px-2 rounded-md h-11 bg-transparent border-2  border-[#55555e]' type="text" />
                    <span className='absolute text-sm right-3 px-1 bg-[#383854] -top-3 font-Dana text-white' > دسته بندی</span>
                </div>
            </div>
            <div className=' px-2 sm:px-2 py-4 col-span-6 lg:col-span-2  '>
                <div className='relative'>
                    <input className='w-full text-white text-base text-center font-Dana outline-none px-2 rounded-md h-11 bg-transparent border-2  border-[#55555e]' type="text" />
                    <span className='absolute text-sm right-3 px-1 bg-[#383854] -top-3 font-Dana text-white' > زیر منو</span>
                </div>
            </div>
            <div className=' px-2 sm:px-2 py-1 md:col-span6 col-span-12 lg:col-span-2  flex items-center'>
                <div dir="ltr" className='relative w-full flex justify-between items-center pr-2 rounded-md h-11 bg-transparent border-2  border-[#55555e]'>
                    <input onChange={(event) => inputChangeHanler(event)} id="imageMainCategory" className=' hidden text-white text-base text-center font-Dana outline-none px-2 rounded-md h-9 bg-transparent border-2  border-[#1d1d2d]' type="file" accept='image/*' />
                    <span className='absolute text-sm right-3 px-1 bg-[#383854] -top-3 font-Dana text-white' >انتخاب تصویر</span>
                    <label htmlFor="imageMainCategory" className='flex justify-center items-center cursor-pointer'>
                        <CiImageOn className='size-7 text-white' />
                    </label>
                    <span className='font-Dana text-white lg:text-xs items-center flex justify-center '>{imageCategori}</span>
                </div>
            </div>
            <div className=' px-2 sm:px-2 py-3 md:col-span6 col-span-12 lg:col-span-2 flex items-center  ' >
                <button className='w-full transition-all duration-300 hover:bg-green-700 rounded-md h-11 font-DanaMedium text-base bg-green-300' >
                    ثبت
                </button>
            </div>
        </div>
    )
}
