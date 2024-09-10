import React from 'react'

export default function CategoryItem() {
    const url = "../images/category/snacks.png"
    return (
        <div className='col-span-2 flex justify-center items-center relative'>
            <div className='absolute bg-cover bg-center bg-no-repeat blur-[2px] inset-0 rounded-xl' style={{ backgroundImage: `url(${url})` }}>
            </div>
            <div className='absolute bg-zinc-800 opacity-30 inset-0 rounded-xl' >

            </div>
            <ul className='absolute flex gap-x-2 top-1 left-1 '>
                <li className='w-10 h-10 bg-red-500 rounded-lg' >

                </li>
                <li className='w-10 h-10 bg-red-500 rounded-lg' >

                </li>
                <li className='w-10 h-10 bg-red-500 rounded-lg' >

                </li>
            </ul>
            <span className='z-50 font-DanaDemiBold text-xl text-white'>بهداشتی</span>
        </div>
    )
}
