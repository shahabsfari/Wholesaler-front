import React from 'react'
import { GoPlus } from "react-icons/go";
export default function ProductBox() {
    return (
        <div className='relative md:h-[280px] p-2 sm:p-3  bg-white  rounded-2xl flex flex-col items-center'>
            <span className='absolute bg-corn-flower text-white right-0 top-0 min-w-12 pt-1 rounded-bl-xl rounded-tr-xl text-center '>24</span>
            <div className=' size-[120px] md:size-36'>
                <img src="./images/products/oil.webp" alt="pro" />
            </div>
            <div className='flex flex-col justify-between h-full w-full  '>
                <div className='w-full  text-xs  md:text-base text-start line-clamp-2 '>
                    روغن سرخ کردنی اویلا ، فراوری شده از دل طبیعت
                </div>
                <div className='flex justify-between mt-3 ' >
                    <div className='px-1 flex flex-col items-center justify-center gap-y-1'>
                        <span className='text-base' >
                            30%
                        </span>
                        <span className='border-[2px] w-fit p-px border-black rounded-full' >
                            <GoPlus />
                        </span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='relative text-zinc-500 w-fit' >
                            <span className='absolute w-full my-auto top-0 bottom-0 max-h-px bg-black'></span>
                            <span className='text-[10px]' >120,000</span><span className='text-[8px]'>تومان</span>
                        </span>
                        <span className='flex gap-x-1'>
                            <span className='font-DanaDemiBold text-[12px] md:text-[16px] '>80,000,000</span><span className='text-[10px] md:text-sm translate-y-[1px]' >تومان</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
