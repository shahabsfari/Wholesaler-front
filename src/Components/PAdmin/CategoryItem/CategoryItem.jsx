import React from 'react'
import { FiTrash2, FiPlus, FiEdit } from "react-icons/fi";
import { TbListDetails } from "react-icons/tb";
export default function CategoryItem() {
    const url = "../images/category/snacks.png"
    return (
        <div className='col-span-6 sm:col-span-3 lg:col-span-2  h-[180px] flex justify-center items-center relative'>
            <div className='absolute bg-cover bg-center bg-no-repeat blur-[1px] inset-0 rounded-xl' style={{ backgroundImage: `url(${url})` }}>
            </div>
            <div className='absolute bg-zinc-800 opacity-60 inset-0 rounded-xl' >

            </div>
            <ul className='absolute flex gap-x-2 top-1 left-1 '>
                <li className='w-10 h-10 bg-green-300 hover:scale-105 transition-all cursor-pointer rounded-lg flex justify-center items-center' >
                    <FiTrash2 className='size-6' />
                </li>
                <li className='w-10 h-10 bg-green-300 hover:scale-105 transition-all cursor-pointer rounded-lg flex justify-center items-center' >
                    <FiEdit className='size-6' />
                </li>
                {/* <li className='w-10 h-10 bg-green-300 hover:scale-105 transition-all cursor-pointer rounded-lg flex justify-center items-center' >
                    <TbListDetails className='size-6' />
                </li> */}
                <li className='w-10 h-10 bg-green-300 hover:scale-105 transition-all cursor-pointer rounded-lg flex justify-center items-center' >
                    <FiPlus className='size-6' />
                </li>
            </ul>
            <span className='z-10 font-DanaDemiBold text-xl text-white'>بهداشتی</span>
        </div>
    )
}
