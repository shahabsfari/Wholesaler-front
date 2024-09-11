import React, { useState } from 'react'
import Header from '../Header/Header'
export default function NewSubCategory() {
    const [selectedCategory, setSelectedCategory] = useState("")
    const categories = [
        "سلولزی", "بهداشتی", "تنقلات", "ادویه و چاشنی",
        "سلولزی", "بهداشتی", "تنقلات", "ادویه و چاشنی"
    ]

    const [showDropDown, setShowDropDown] = useState(false)
    return (
        <div className='col-span-8 sm:col-span-4 lg:col-span-2'>
            <Header text="افزودن زیر منو جدید" />
            <div className=' px-5 sm:px-2 py-4 '>
                <div className='relative'>
                    <input className='w-full text-white text-base text-center font-Dana outline-none px-2 rounded-md h-11 bg-transparent border-2  border-[#1d1d2d]' type="text" />
                    <span className='absolute text-sm right-3 px-1 bg-[#383854] -top-3 font-Dana text-white' > اسم</span>
                </div>
            </div>

            <div className=' px-5 sm:px-2 py-1'>
                <div className='relative' onMouseLeave={() => setShowDropDown(false)} onClick={() => setShowDropDown(prev => !prev)}>
                    <input type="text" readOnly placeholder='دسته بندی را انتخاب کنید' value={selectedCategory} className='w-full text-white text-base text-center font-Dana outline-none px-2 rounded-md h-11 bg-transparent border-2  border-[#1d1d2d]' />
                    <span className='absolute text-sm right-3 px-1 bg-[#383854] -top-3 font-Dana text-white' >دسته بندی</span>
                    <ul className={`absolute z-40 max-h-[185px] overflow-y-scroll divide-y-2 divide-[#1d1d2d] top-[91%] text-white bg-[#383854] border-x-2 border-2 border-[#1d1d2d]  w-full rounded-b-md child:px-4 child:py-1 font-Dana child:cursor-pointer   ${showDropDown ? "flex flex-col" : "hidden"}`}  >
                        <li onClick={() => setSelectedCategory("")} >
                            هیچکدام
                        </li>
                        {
                            categories.map((item, index) => (
                                <li onClick={() => setSelectedCategory(item)} key={index} >
                                    {item}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>


            <div className=' px-6 sm:px-2 py-3 ' >
                <button className='w-full transition-all duration-300 hover:bg-green-700 rounded-md h-9 font-DanaMedium text-base bg-green-300' >
                    ثبت
                </button>
            </div>
        </div>
    )
}
