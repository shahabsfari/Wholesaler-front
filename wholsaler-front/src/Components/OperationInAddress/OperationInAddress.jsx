import React, { useState } from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
export default function OperationInAddress({deleteCustomer , customerId}) {
    const [openDropDown, setOpenDropDown] = useState(false)
    return (
        <>
            <span className=' hidden sm:flex col-span-2 h-full gap-x-2 justify-center  items-center border-blue-700'>
                {/* <span className='flex justify-center bg-green-500 p-1 rounded-lg  items-center' >
                    <AiOutlineEdit size={24} className=' text-white' />
                </span> */}
                <span onClick={()=> deleteCustomer(customerId)} className='flex cursor-pointer justify-center bg-red-400 p-1 rounded-lg  items-center' >
                    <RiDeleteBin6Line size={24} className=' text-white' />
                </span>
            </span>
            <span className='relative flex  col-span-2  justify-center items-center text-xl font-DanaDemiBold sm:hidden' onClick={() => setOpenDropDown(prev => !prev)} >
                ...
                <div className={` ${openDropDown ? "flex" : "hidden"} overflow-auto  font-Dana px-1 py-2 absolute top-[100%] text-white flex flex-col z-40 bg-[#1B1464]   w-full`} >
                    <span className='flex flex-col col-span-2 h-full gap-y-2 justify-center  items-center border-blue-700'>
                        {/* <span className='flex justify-center bg-green-500 p-1 rounded-lg  items-center' >
                            <AiOutlineEdit size={24} className=' text-white' />
                        </span> */}
                        <span onClick={()=>deleteCustomer(customerId)}  className='flex justify-center bg-red-400 p-1 rounded-lg  items-center' >
                            <RiDeleteBin6Line size={24} className=' text-white' />
                        </span>
                    </span>
                </div>
            </span>
        </>
    )
}
