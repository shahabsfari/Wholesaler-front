import React, { useState } from 'react'
import { FaSortAmountDown } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
export default function SortSection({ data, value, setSort, classHover = "text-blue-300", classActive = "bg-blue-500", className = "text-white" }) {

    const [openSortSide, setOpenSortSide] = useState(false)

    const selectedSortHandler = (sortType) => {
        if (value === sortType) {
            setSort('')
        } else {
            setSort(sortType)
        }
    }
    const openSortSideHandler = () => {
        setOpenSortSide(prev => !prev);
        // console.log("yes")
    }
    return (
        <div>
            <div className={`hidden sm:flex ${className} gap-x-1 font-Dana select-none`}>
                <span className='flex items-center gap-x-1'>
                    <FaSortAmountDown />
                    مرتب سازی :
                </span>
                {
                    data.map((item, index) => (
                        <span key={index} onClick={() => selectedSortHandler(item[2])} className={`cursor-pointer   px-2 rounded-lg py-1 ${value === item[2] ? classActive : ""} `}>{item[1]}</span>
                    ))
                }
            </div>
            <div className='sm:hidden' >
                <button onClick={() => openSortSideHandler()} className='flex items-center gap-x-1 text-white font-Dana bg-blue-500 p-1 px-2 rounded-md' >
                    <FaSortAmountDown />
                    مرتب سازی
                </button>
            </div>
            <div className={` ${openSortSide ? "flex" : "hidden"} flex-col  fixed inset-0  bg-black bg-opacity-20 z-50 transition-opacity ease-out duration-150 backdrop-blur-sm `} >
                <div className='w-[250px] bg-[#1e1e32] h-full p-4'>
                    <div className='flex w-full justify-end '>
                        <IoClose className='text-white size-7' onClick={() => openSortSideHandler()} />
                    </div>
                    <div className='flex flex-col text-white gap-y-3   font-Dana'>
                        <span className='flex  text-xl items-center gap-x-1'>
                            <FaSortAmountDown />
                            مرتب سازی :
                        </span>
                        {
                            data.map((item, index) => (
                                <span key={index} onClick={() => selectedSortHandler(item[2])} className={`pr-3  text-base rounded-lg py-1  ${value === item[2] ? "bg-blue-500 " : ""}`}>{item[1]}</span>
                            ))
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}
