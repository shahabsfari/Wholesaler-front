import React from 'react'
import ProductBox from '../ProductBox/ProductBox'
import { FaAngleLeft } from "react-icons/fa6";

export default function ProductContainer() {
    return (
        <div className='custome-container flex flex-col bg-soft-blue rounded-3xl my-6' >
            <div className='flex justify-between px-4 lg:my-3 items-center  ' >
                <div className=' border-r-4 sm:border-r-4 border-orange-400 pr-1 sm:pr-3'>
                    <span className='text-sm md:text-3xl  font-MorabbaBold'>
                            بیشترین تخفیف
                    </span>
                </div>
                <dir>
                    <button className='px-2 md:px-4 text-xs font-DanaMedium flex items-center justify-center gap-x-1' >
                        مشاهده همه
                        <FaAngleLeft className='-translate-y-[1px]' />
                    </button>
                </dir>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 p-2 sm:p-4 xl:grid-cols-6'>
                <ProductBox />
                <ProductBox />
                <ProductBox />
                <ProductBox />
                <ProductBox />
                <ProductBox />
                <ProductBox />
                <ProductBox />
                <ProductBox />
                <ProductBox />
                <ProductBox />
                <ProductBox />
            </div>
        </div>
    )
}
