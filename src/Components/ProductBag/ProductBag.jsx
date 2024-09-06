import React from 'react'
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";

export default function ProductBag() {
    return (
        <div className=' p-1 md:p-3 border border-zinc-400 rounded-lg mx-3 space-y-2'>
            <div dir='rtl' className='flex'>
                {/* image & number */}
                <div className='flex border border-zinc-400 rounded-lg p-1 flex-col gap-y-2 items-center ml-2'>
                    <img className=' size-16 md:size-28' src="./images/products/oil.webp" alt="product" />
                </div>
                {/* description & price */}
                <div className=' flex flex-col justify-between w-full'>
                    <div className='flex pt-1 justify-between'>
                        <span className='md:w-[60%] text-sm md:text-[13px] line-clamp-2 '>
                            روغن سرخ کردنی اویلا ، فراوری شده از دل طبیعت
                        </span>
                        <div>
                            <div className='relative md:ml-9 text-gray-500 text-sm md:text-base'>
                                <span >20,000,000</span>
                                <span >تومان</span>
                                <span className='absolute my-auto bottom-0 left-0  top-0 min-w-full max-h-[1px] min-h-[1px] bg-black  '></span>
                            </div>
                            <span className='text-sm md:text-xl flex items-center gap-1 ' >
                                <span className='font-DanaDemiBold' >12,000,000</span>
                                <span className='text-sm' >تومان</span>
                            </span>
                        </div>
                    </div>
                    <div className='hidden md:flex gap-x-3'>
                        <button className='btn justify-center flex items-center gap-1'>
                            <MdOutlineDeleteOutline className='size-6' />
                            <span className=' hidden md:block' >حذف</span>
                        </button>
                        <div className='flex border border-orange-400 w-full justify-around items-center p-1 gap-x-2 rounded-lg'>
                            <span> <GoPlus className='size-6 text-orange-500 cursor-pointer' /></span>
                            <span className='text-base'>4</span>
                            <span><FiMinus className='size-6 text-orange-500 cursor-pointer' /></span>
                        </div>
                    </div>

                </div>
            </div>
            <div className='flex md:hidden gap-x-4 '>
                    <div className='flex border-2 border-orange-400 w-full justify-around items-center p-1 gap-x-2 rounded-lg'>
                        <span> <GoPlus className='size-4 text-orange-500 cursor-pointer' /></span>
                        <span className='text-base'>4</span>
                        <span><FiMinus className='size-4 text-orange-500 cursor-pointer' /></span>
                    </div>
                    <button className='bg-orange-300 rounded-lg px-[18px] justify-center flex items-center gap-1'>
                        <MdOutlineDeleteOutline className='size-6'/> 
                        <span className=' hidden md:block' >حذف</span>
                    </button>
                </div>
        </div>

    )
}
