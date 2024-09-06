import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiLogIn } from "react-icons/fi";
import { TbCategory } from "react-icons/tb";
import { IoBagHandleOutline } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import Bag from '../Bag/Bag'
import CategoryItems from '../CategoryItems/CategoryItems'
import SlideCategory from '../SideCategoryItems/SlideCategory';
export default function Navbar() {

  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isSideCategoryOpen, setIsSideCategoryOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0)
  const [screen, setScreen] = useState(window.screen.availWidth)
  // console.log(screen)

  useEffect(() => {
    const hanleResize = () => {
      setScreen(window.screen.availWidth)
    }

    window.addEventListener('resize', hanleResize)

    return () => {
      window.removeEventListener('resize', hanleResize)
    }

  }, [])

  useEffect(() => {
    const handlerScroll = () => {
      const scrollThresold = 100;
      const sccrollY = window.scrollY;

      if (Math.abs(sccrollY - lastScrollY) < 100) {
        return;
      }

      setLastScrollY(sccrollY)

      // console.log( "scroll", sccrollY);
      if (sccrollY > scrollThresold) {
        if (isVisible) {
          setIsVisible(false)
        }
      } else {
        if (!isVisible)
          setIsVisible(true)
      }

    };

    window.addEventListener('scroll', handlerScroll);
    return () => {
      window.removeEventListener('scroll', handlerScroll)

    };
  }, [isVisible])

  const baHandler = () => {
    setIsBagOpen(prev => !prev)
  }
  const sideCategoryHandler = () => {
    setIsSideCategoryOpen(prev => !prev)
  }

  return (
    <div className='custome-container sticky z-40 p-3 sm:p-5 pb-0 rounded-lg inset-0 bg-white '>
      {/* topbar */}
      <div className={`flex ${isVisible ? "flex opacity-100 translate-y-0  mb-4 sm:mt-5" : " opacity-0 -translate-y-full h-0 "} transition-all  duration-150 justify-between items-center`} >
        {/* logo */}
        <div className='font-MorabbaBold text-xl md:text-2xl' >
          لوگوی سایت
        </div>
        {/* login / sign up */}
        <Link to="/" className='btn px-2 md:px-4' >
          <FiLogIn className='size-5' />
          <span>ورود | ثبت نام</span>
        </Link>
      </div>
      {/* downbar */}
      <div className='grid grid-cols-2 md:grid-cols-[150px_8fr_150px]  sm:gap-4 items-center'>
        {/* Category btn */}
        <div className='col-span-1 md:col-auto relative group '>
          <div className=' justify-center  '>
            <div onClick={()=> sideCategoryHandler() } className='cursor-pointer max-w-[150px] sm:max-w-max btn px-2 md:px-4 flex '>
              <TbCategory className='size-5' />
              <span >دسته بندی ها</span>
            </div>
          </div>
          <div dir='rtl' className={`${isSideCategoryOpen && screen < 1024 ? "block" : "hidden"} transform transition-transform duration-300 ease-out inset-0 fixed right-0 top-0 w-full min-h-screen z-50`}>
            {isSideCategoryOpen && screen < 1024 ? <SlideCategory sideCategoryHandler={sideCategoryHandler} /> : null}
          </div>
          <div className='absolute transition-all delay-75 invisible opacity-0 group-hover:opacity-100 
                                group-hover:visible top-10 right-0 rounded-2xl left-0 border-t-[3px] 
                                 bg-white dark:bg-black'>
            {
              screen > 1024 ? <CategoryItems /> : null
            }
          </div>
        </div>
        {/* searchBar */}
        <div className='order-first bg-white md:order-none col-span-2 md:col-auto  flex items-center rounded-md px-2 border border-soft-blue'>
          <IoMdSearch className='size-8 -scale-x-100' />
          <input className='w-full text-sm sm:text-base outline-none px-3 h-9' type="text" placeholder='محصول مورد نظر خود را جستجو کنید ...' />
        </div>
        {/* bag btn */}
        <div className='col-span-1 md:col-auto flex justify-end'>
          <button onClick={() => baHandler()} className='sm:btn  max-w-[150px] sm:w-full h-10 justify-center  '>
            <IoBagHandleOutline className='size-5' />
            <span className=' hidden sm:block' >سبد خرید</span>
          </button>
          {/* bag */}
          <div dir='rtl' className={`${isBagOpen ? "block" : "hidden"} transform transition-transform duration-300 ease-out inset-0 fixed right-0 top-0 w-full min-h-screen z-50`}>
            {isBagOpen ? <Bag bagHandler={baHandler} /> : null}
          </div>
        </div>
      </div>
    </div>
  )
}
