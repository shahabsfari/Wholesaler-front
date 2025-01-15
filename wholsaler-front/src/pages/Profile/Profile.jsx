import React, { useContext } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { CgProfile } from "react-icons/cg";
import { GiReturnArrow, GiExitDoor, GiBeachBag } from "react-icons/gi";
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthContext from '../../AuthContext';
export default function Profile() {
    const navigate = useNavigate();
    const goToSpecificRoute = () => {
        navigate("/");
    };

    const { logout } = useContext(AuthContext)
    
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
                goToSpecificRoute()
                logout();
                Swal.fire(
                    'خارج شدید!',
                    'با موفقیت از حساب کاربری خارج شدید.',
                    'success'
                );
            }
        });
    }

    return (
        <div className=' w-full select-none font-Dana box-border items-center min-h-screen bg-white h-full  '>
            <Navbar />
            <div className='w-full flex gap-x-3  px-4 sm:px-10 md:px-14 lg:px-28 box-borderpx  '>
                {/* side */}
                <ul className=' hidden md:flex col-span-3 lg:col-span-2 flex-col gap-2 items-start child:flex-row-reverse'>
                    <NavLink to="" className={({ isActive }) => ` flex w-full justify-end  text-smsm font-DanaMedium items-center gap-x-2 rounded-lg px-3 py-2 ${isActive ? "bg-corn-flower text-white" : ""}`} end>
                        <span >
                            مشاهده پروفایل
                        </span>
                        <CgProfile size={25} />
                    </NavLink >
                    <NavLink to="orders" className={({ isActive }) => ` flex w-full justify-end text-smsm font-DanaMedium items-center gap-x-2 rounded-lg px-3 py-2 ${isActive ? "bg-corn-flower text-white" : ""}`}>
                        <span >
                            سفارش‌های من
                        </span>
                        <GiBeachBag size={25} />
                    </NavLink>
                    {/* <li className='flex justify-start text-sm font-DanaMedium items-center gap-x-2 rounded-lg px-3 py-2'>
                        <span >
                            مرجوعی ها
                        </span>
                        <GiReturnArrow size={25} />
                    </li> */}
                    <li onClick={() => exitControl()} className='cursor-pointer flex justify-start text-sm font-DanaMedium items-center gap-x-2 rounded-lg px-3 py-2'>
                        <span >
                            خروج از حساب
                        </span>
                        <GiExitDoor size={25} />
                    </li>
                </ul>
                <div className=' col-span-12 md:col-span-9 lg:col-span-10 flex-1' >
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
