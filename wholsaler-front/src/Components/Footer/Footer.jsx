import React from 'react'
import { FaPhoneAlt, FaInstagram } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
export default function Footer() {
    const Navigate = useNavigate()

    return (
        <div className='custome-container grid md:grid-cols-2 bg-soft-blue rounded-t-3xl px-3 gap-y-5 lg:px-12 py-8'>
            <div className=' col-span-2 lg:col-span-1 flex justify-around sm:justify-normal sm:gap-x-20'>
                <div className='flex flex-col gap-y-1 text-xs child:cursor-pointer '>
                    <span className='font-MorabbaMedium text-sm lg:text-2xl text-blue-800'>
                        بنک مارکت
                    </span>
                    <span className='transition-all hover:scale-110 hover:text-slate-500' onClick={()=> Navigate("/aboutUs")}>
                        درباره ما
                    </span>
                    <span className='transition-all hover:scale-110 hover:text-slate-500' onClick={()=> Navigate("/contactUs")}>
                        تماس با ما
                    </span>

                </div>
                <div className='flex flex-col gap-y-1 text-xs child:cursor-pointer '>
                    <span className='font-MorabbaMedium text-sm lg:text-2xl  text-blue-800'>
                        راهنمای خرید
                    </span>
                    <span className='transition-all hover:scale-110 hover:text-slate-500' onClick={()=> Navigate("/rules")}>
                        قوانین و مقررات
                    </span>
                    <span className='transition-all hover:scale-110 hover:text-slate-500' onClick={()=> Navigate("/privacy")}>
                        حریم خصوصی
                    </span>

                </div>

            </div>
            <div className=' col-span-2 lg:col-span-1 text-xl font-MorabbaBold flex justify-center ' >
                <span className=''>نماد اعتماد الکترونیک</span>
            </div>
            <div className=' col-span-2 lg:col-span-1 flex flex-col gap-y-2 child:text-justify child:text-xs child:sm:text-sm'>
                <span>
                    آدرس دفتر مرکزی: تهران، خیابان مطهری، خیابان رضا شکرآبی، کوچه پروشات، ساختمان پروشات، پلاک 2، واحد 24
                </span>
                <span>
                    آدرس انبار مرکزی: تهران، سه راه افسریه، خیابان خاوران، پلاک 1353
                </span>
                <span>
                    آدرس انبار شیرازی: تهران، افسریه، مسعودیه، خیابان شیرازی، پلاک 36
                </span>
            </div>
            <div className=' col-span-2 lg:col-span-1 flex flex-col items-end gap-y-2 child:flex child:gap-x-2 '>
                <div>
                    <span> 021 3500 0050</span>
                    <span> <FaPhoneAlt /> </span>
                </div>
                <div>
                    <span> info@bonak.market</span>
                    <span> <BiLogoGmail />  </span>
                </div>
                <div>
                    <span> instagram.com/bonak.market</span>
                    <span> <FaInstagram /> </span>
                </div>
            </div>
        </div>
    )
}
