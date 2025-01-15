import React, { useState } from 'react'
import SvgMarket from '../../SVG/SvgMarket'
import SvgHome from '../../SVG/SvgHome'
import SvgCustomer from '../../SVG/SvgCustomer'
import SvgProduct from '../../SVG/SvgProduct'
import SvgStatistics from '../../SVG/SvgStatistics'
import SvgPayment from '../../SVG/SvgPayment'
import SvgSettings from '../../SVG/SvgSettings'
import SvgLogout from '../../SVG/SvgLogout'
import { TbCategory2 } from "react-icons/tb";
import { BsList } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import { TbBrandDatabricks } from "react-icons/tb";
import { NavLink , NavNavLink, useLocation, useNavigate } from 'react-router-dom'
function SideBar() {

    const [openSideBar, setOpenSideBar] = useState(false)

    const location = useLocation();
    const isActiveParent = location.pathname.startsWith('/p-admin/payments')
    const navigate = useNavigate();
    const goToSpecificRoute = () => {
        navigate("/"); // مسیر مورد نظر را اینجا قرار دهید
    };
    

    return (
        <div>
            <div className={`${openSideBar ? "block" : "hidden"} md:hidden w-full z-50 h-screen bg-zinc-600/50 absolute`}>
            </div>
            <div className='flex md:hidden absolute right-2 top-3 text-white'>
                <BsList onClick={() => setOpenSideBar(prev => !prev)} className='size-7 z-50' />
            </div>
            <div className={`${openSideBar ? "flex" : "hidden"} md:flex flex-col z-50 fixed pt-2 w-[200px] min-h-screen bg-[#2E2E48]`}>
                {/* top section (Logo) */}
                <div className='container flex justify-around md:justify-center items-center font-MorabbaBold gap-x-2 text-white text-2xl md:text-3xl select-none'>
                    <span className='hidden md:block'>
                        <SvgMarket size="w-10 h-10" />
                    </span>
                    <span>فروشگاه</span>
                    <span className='block md:hidden'>
                        <IoMdClose onClick={() => setOpenSideBar(prev => !prev)} />
                    </span>
                </div>
                <div className='flex flex-grow flex-col justify-between'>
                    {/* menu */}
                    <div className='flex flex-col mt-7 child:flex child:justify-start gap-y-2 child:rounded-xl items-center child:p-2 font-DanaMedium leading-7 text-base
                     text-white child:gap-x-2 child-hover:bg-blue-500 child:transition-all  child:w-[85%]'>
                        {/* <NavLink  className={({isActive}) => isActive ? "bg-blue-500" : "" }  to='' end>
                            <SvgHome /><span>صفحه اصلی</span>
                        </NavLink> */}
                        <NavLink  className={({isActive}) => isActive ? "bg-blue-500" : ""} to='users'>
                            <SvgCustomer /><span>مشتری</span>
                        </NavLink>
                        <NavLink  className={({isActive}) => isActive || isActiveParent ? "bg-blue-500" : ""} to='payments' end>
                            <SvgPayment /><span>پرداخت ها</span>
                        </NavLink>
                        <NavLink  className={({isActive}) => isActive ? "bg-blue-500" : ""} to='adminProducts'>
                            <SvgProduct /><span>محصولات</span>
                        </NavLink>
                        <NavLink className={({isActive}) => isActive ? "bg-blue-500" : ""}  to='categories'>
                            <TbCategory2 className='size-6' /><span>دسته بندی ها</span>
                        </NavLink>
                        <NavLink className={({isActive}) => isActive ? "bg-blue-500" : ""}  to='sliders'>
                            <TfiLayoutSliderAlt className='size-6' /><span>اسلایدر و پوستر ها</span>
                        </NavLink>
                        <NavLink className={({isActive}) => isActive ? "bg-blue-500" : ""}  to='adminBrands'>
                            <TbBrandDatabricks  className='size-6' /><span>برند ها</span>
                        </NavLink>
                    </div>
                    {/* bottom section */}
                    <div className=' flex flex-col mt-7 child:flex child:justify-start gap-y-2 child:rounded-xl items-center child:p-2 font-DanaMedium leading-7 text-base
            text-white child:gap-x-2 pb-4 child-hover:bg-blue-500 child:transition-all  child:w-[85%]'>
                        {/* <a href="#">
                            <SvgSettings /><span>تنظیمات</span>
                        </a> */}
                        <a onClick={()=> goToSpecificRoute()} href="#">
                            <SvgLogout /><span>خروج</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBar