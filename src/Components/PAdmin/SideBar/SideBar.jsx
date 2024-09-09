import React, { useState } from 'react'
import SvgMarket from '../../SVG/SvgMarket'
import SvgHome from '../../SVG/SvgHome'
import SvgCustomer from '../../SVG/SvgCustomer'
import SvgProduct from '../../SVG/SvgProduct'
import SvgStatistics from '../../SVG/SvgStatistics'
import SvgPayment from '../../SVG/SvgPayment'
import SvgSettings from '../../SVG/SvgSettings'
import SvgLogout from '../../SVG/SvgLogout'
import { BsList } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
function SideBar() {

    const [openSideBar, setOpenSideBar] = useState(false)

    return (
        <div>
            <div className= {`${openSideBar ? "block" : "hidden"} md:hidden w-full z-50 min-h-screen bg-zinc-600/50 absolute`}>
            </div>
            <div className='flex md:hidden absolute right-2 top-3 text-white'>
                <BsList onClick={() => setOpenSideBar(prev => !prev)} className='size-7' />
            </div>
            <div className={`${openSideBar ? "flex" : "hidden"} md:flex flex-col z-50 fixed pt-2 w-[200px] min-h-screen bg-[#2E2E48]`}>
                {/* top section (Logo) */}
                <div className='container flex justify-around md:justify-center items-center font-MorabbaBold gap-x-2 text-white text-2xl md:text-3xl select-none'>
                    <span className='hidden md:block'>
                        <SvgMarket size="w-10 h-10" />
                    </span>
                    <span>فروشگاه</span>
                    <span className='block md:hidden'>
                        <IoMdClose onClick={()=> setOpenSideBar(prev => !prev)} />
                    </span>
                </div>
                <div className='flex flex-grow flex-col justify-between'>
                    {/* menu */}
                    <div className='flex flex-col mt-7 child:flex child:justify-start gap-y-2 child:rounded-xl items-center child:p-2 font-DanaMedium leading-7 text-base
            text-white child:gap-x-2 child-hover:bg-blue-500 child:transition-all  child:w-[85%]'>
                        <a href='#'>
                            <SvgHome /><span>صفحه اصلی</span>
                        </a>
                        <a href='#'>
                            <SvgStatistics /><span>آمار</span>
                        </a>
                        <a href='#'>
                            <SvgPayment /><span>پرداخت ها</span>
                        </a>
                        <a href='#'>
                            <SvgProduct /><span>محصولات</span>
                        </a>
                        <a href='#'>
                            <SvgCustomer /><span>مشتری</span>
                        </a>
                    </div>
                    {/* bottom section */}
                    <div className=' flex flex-col mt-7 child:flex child:justify-start gap-y-2 child:rounded-xl items-center child:p-2 font-DanaMedium leading-7 text-base
            text-white child:gap-x-2 pb-4 child-hover:bg-blue-500 child:transition-all  child:w-[85%]'>
                        <a href="#">
                            <SvgSettings /><span>تنظیمات</span>
                        </a>
                        <a href="#">
                            <SvgLogout /><span>خروج</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBar