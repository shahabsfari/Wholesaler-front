import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiLogIn } from "react-icons/fi";
import { TbCategory } from "react-icons/tb";
import { IoBagHandleOutline } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import { RiAccountCircleLine } from "react-icons/ri";
import { RiAdminLine } from "react-icons/ri";
import Bag from '../Bag/Bag'
import CategoryItems from '../CategoryItems/CategoryItems'
import SlideCategory from '../SideCategoryItems/SlideCategory';
import { FaUser } from "react-icons/fa";
import AuthContext from '../../AuthContext';
import Swal from 'sweetalert2';

export default function Navbar({ searchText = "" }) {
  const { isLoggedIn, user } = useContext(AuthContext)
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isSideCategoryOpen, setIsSideCategoryOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0)


  const [searchTerm, setSearchTerm] = useState(searchText);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);


  const fetchSearchResults = async (query) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/product/search?pageSize=5&pageNumber=0&target=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      if (!data.hasError) {
        setResults(data.dataList);
      } else {
        console.error("Error:", data.message);
        setResults([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    if (searchTerm.trim() === "") {
      setResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      fetchSearchResults(searchTerm);
    }, 500);


    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // console.log(results)



  const { screen, logout } = useContext(AuthContext)

  const exitControl = () => {
    Swal.fire({
      title: 'آیا مطمئن هستید؟',
      text: 'آیا می‌خواهید از حساب کاربری خارج شوید؟',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'بله، خارج شو!',
      cancelButtonText: 'لغو'
    }).then((result) => {
      if (result.isConfirmed) {
        goToSpecificRoute("/")
        logout();
        Swal.fire(
          'خارج شدید!',
          'با موفقیت از حساب کاربری خارج شدید.',
          'success'
        );
      }
    });
  }



  const navigate = useNavigate();
  const goToSpecificRoute = (address) => {
    // console.log(address)
    navigate(address);
  };


  const [openUserArea, setOpenUserArea] = useState(false)

  const openUserAreaHandle = () => {

    setOpenUserArea(prev => !prev)
  }

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
    // console.log("yes")
    setIsBagOpen(prev => !prev)
  }

  const sideCategoryHandler = () => {
    setIsSideCategoryOpen(prev => !prev)
  }

  const searchHandle = () => {
    navigate('/ProductSelector', { state: { searchTerm, type: "search" } })
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      console.log("Enter key pressed!");
      searchHandle()
    }
  };

  const recommendedProduct = (id) => {
    navigate('/productInfo', { state: id })
  }

  const handleBlur = (event) => {
    setTimeout(() => {
      setIsFocused(false);
    }, 100);
  }

  return (
    <div className='custome-container sticky z-40 p-3 sm:p-5 pb-0 rounded-lg inset-0 bg-white '>
      {/* topbar */}
      <div style={{ zIndex: 60 }} className={`flex ${isVisible ? "flex opacity-100 translate-y-0  mb-4 sm:mt-5" : " opacity-0 -translate-y-full max-h-0 overflow-hidden  "} transition-all  duration-150 justify-between items-center`} >
        {/* logo */}
        <Link to="/" className='font-MorabbaBold text-xl md:text-2xl' >
          پخش موسوی
        </Link>
        <div className=' z-30 flex gap-2 flex-row-reverse'>
          {/* login / sign up */}
          {
            isLoggedIn ? (
              <div className='z-30 ' style={{ zIndex: 60 }}>
                <Link to="/profile" className='hidden md:flex btn px-2 md:px-4 z-30 ' >
                  <RiAccountCircleLine className='size-6' />
                  <span>حساب کاربری</span>
                </Link>
                <div className='flex md:hidden relative z-30' style={{ zIndex: 60 }}>
                  <span onClick={() => openUserAreaHandle()} className={`${openUserArea ? "rounded-b-none" : ""} btn px-2 md:px-4`}>
                    <FaUser />
                    ناحیه کاربری
                  </span>
                  <div className={`${openUserArea ? "flex" : "hidden"} rounded-lg rounded-t-none z-30  bg-corn-flower flex-col absolute top-[100%] w-full `} style={{ zIndex: 60 }}>
                    <div onClick={() => goToSpecificRoute("/profile")} className='flex btn' >
                      <span>پروفایل</span>
                    </div>
                    <div onClick={() => goToSpecificRoute("/profile/orders/AwaitingPayment")} className='flex btn  border-y-2 rounded-none border-blue-900/50' >
                      <span>سفارشات</span>
                    </div>
                    <div onClick={() => exitControl()} className='flex btn' >
                      <span>خروج از حساب</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/register" className='btn px-2 md:px-4' >
                <FiLogIn className='size-5' />
                <span>ورود | ثبت نام</span>
              </Link>
            )
          }
          {
            isLoggedIn && user.role === "ADMIN" ? (
              <Link to="/p-admin" className='btn px-2 md:px-4' >
                <RiAdminLine className='size-5' />
                <span>پنل ادمین</span>
              </Link>
            ) : null
          }
        </div>
      </div>
      {/* downbar */}
      <div style={{ zIndex: 20 }} className='grid z-30 grid-cols-2 md:grid-cols-[150px_8fr_150px] sm:gap-4 items-center'>
        {/* Category btn */}
        <div className='col-span-1 md:col-auto relative group '>
          <div className=' justify-center  '>
            <div onClick={() => sideCategoryHandler()} className='cursor-pointer max-w-[150px] sm:max-w-max btn px-2 md:px-4 flex '>
              <TbCategory className='size-5' />
              <span >دسته بندی ها</span>
            </div>
          </div>

          <div dir='rtl' className={`${isSideCategoryOpen && screen < 1024 ? "block" : "hidden"} transform transition-transform duration-300 ease-out inset-0 fixed right-0 top-0 w-full min-h-screen z-40`}>
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
        <div className={` ${openUserArea ? "-z-10" : "z-10"} order-first  relative  md:order-none col-span-2 md:col-auto  flex items-center rounded-md px-2 border border-soft-blue`}>

          <IoMdSearch onClick={() => searchHandle()} className='size-8 -scale-x-100' />
          <input
            className='w-full  text-sm sm:text-base outline-none px-3 h-9'
            type="text"
            placeholder='محصول مورد نظر خود را جستجو کنید ...'
            onFocus={() => setIsFocused(true)}
            onBlur={(event) => handleBlur(event)}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {
            isFocused && (
              <div className='absolute top-[103%] w-full z-20 rounded-b-xl bg-white divide-y-2 divide-black/30 flex flex-col left-1/2 -translate-x-1/2 '>
                {
                  results.map((item) => (
                    <div key={item.id} onClick={() => recommendedProduct(item.id)} className='w-full flex justify-start py-4 px-2 '>
                      {
                        item.title
                      }
                    </div>
                  ))
                }
              </div>
            )
          }
        </div>

        {/* bag btn */}
        <div className={`col-span-1  ${openUserArea ? "-z-10" : "z-10"}   md:col-auto flex justify-start`}>
          {/* <button onClick={() => baHandler()} className='sm:btn  max-w-[150px] sm:w-full h-10 justify-center  '>
            <IoBagHandleOutline className='size-5' />
            <span className=' hidden sm:block' >سبد خرید</span>
          </button> */}
          {/* bag */}
            
            <Bag  />
    
        </div>

      </div>
    </div>
  )
}
