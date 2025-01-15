import React from 'react'
import InputText from '../../InputText/InputText'
export default function SlideBox({src}) {
  return (
    <div className='w-full flex flex-col  text-white col-span-12 md:col-span-6 lg:col-span-3   ' >
        <div className='w-full flex flex-col h-full ' >
            <span className='text-xl font-MorabbaBold pr-4 border-r-4 border-corn-flower'> اسلاید یک</span>
            {/* blank */}
            {/* <div className='w-full font-Dana rounded-lg bg-corn-flower/50 py-4 mt-1 text-base flex justify-center items-center'>
                اسلایدی اضافه نشده است
            </div> */}
            <div className='w-full flex flex-col gap-y-5 flex-1 justify-between '>
                {/* image container */}
                <div className=' mt-1 '>
                    <img className='rounded-lg' src={src} alt="product" />
                </div>
                <div className=' '>
                    <InputText bg="bg-[#383854]" className='font-Dana' title="متن" />
                </div>
            </div>
        </div>
    </div>
  )
}
