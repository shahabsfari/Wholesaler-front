import React, { useState } from 'react'
import Header from '../Header/Header'
export default function NewSubCategory({className="" , data}) {
    const [selectedCategory, setSelectedCategory] = useState("")
    const categories = [
        "سلولزی", "بهداشتی", "تنقلات", "ادویه و چاشنی",
        "سلولزی", "بهداشتی", "تنقلات", "ادویه و چاشنی"
    ]

    return (
        <div className={className}>
            <div className='px-2'>
                <Header color='[#55555e]' text="افزودن زیر منو" />
            </div>
            <div className=' px-5 sm:px-2 pt-4 pb-2 '>
                <div className='relative flex flex-row-reverse rounded-md h-11 pl-7 bg-transparent border-2  border-[#55555e]'>
                    <input className='w-full h-full text-white text-base text-center font-Dana outline-none px-2 bg-transparent' type="text"  />
                    <span className=' flex justify-center items-center text-base border-l-2 border-[#55555e] min-w-24  font-Dana text-white' >نام زیر منو</span>
                </div>
            </div>
            <div className=' px-5 sm:px-2 pt-4 pb-2 '>
                <div className='relative flex flex-row-reverse rounded-md h-11 pl-7 bg-transparent border-2  border-[#55555e]'>
                    <input className='w-full h-full text-white text-base text-center font-Dana outline-none px-2 bg-transparent' type="text" disabled value={data} />
                    <span className=' flex justify-center items-center text-base border-l-2 border-[#55555e] min-w-24  font-Dana text-white' > دسته بندی</span>
                </div>
            </div>
            <div className=' px-5 sm:px-2 py-3  ' >
                <button className='w-full transition-all duration-300 hover:bg-green-700 rounded-md h-9 font-DanaMedium text-base bg-green-300' >
                    ثبت
                </button>
            </div>
        </div>
    )
}
