import React, { useContext } from 'react'
import SortSection from '../SortSection/SortSection'
import { Link, NavLink } from 'react-router-dom'
import LoadingSec from '../../LoadingSec/LoadingSec'
import AuthContext from '../../../AuthContext'
export default function UsersList({ showSort = false, users, userLoading }) {
    const {setTargetUser} = useContext(AuthContext)
    const clickHandle = (user) => {
        setTargetUser(user)
    }
    const sortData = [
        ["delivered", "بیشترین‌خرید"],
        ["not delivered", "کمترین‌خرید"],
        ["new", "جدید‌ترین"],
        ["oldest", "قدیمی‌ترین"],
    ]

    console.log("yes")


    return (
        <div className='space-y-6 h-full pt-10'>
            {
                showSort && <SortSection data={sortData} />
            }
            {
                userLoading ? (
                    <div className='flex absolute h-full inset-0 md:pr-40 justify-center items-center'>
                        <LoadingSec />
                    </div>
                ) : (
                    <div className='flex-col h-full w-full font-Dana text-white '>
                        <div className='flex justify-around w-full  bg-[#2E2E48] rounded-t-xl child:py-2 ' >
                            <span className='border-l-2 border-[#383843] flex justify-center w-full'>
                                کد مشتری
                            </span>
                            <span className=' border-l-2 border-[#383843] flex justify-center w-full'>
                                نام
                            </span>
                            <span className=' border-l-2 border-[#383843] flex justify-center w-full'>
                                نام‌خانوادگی
                            </span>
                            <span className='hidden xl:flex border-l-2 border-[#383843] justify-center w-full'>
                                شماره تماس
                            </span>
                            <span className=' hidden sm:flex border-l-2 border-[#383843]   justify-center w-full'>
                                نقش کاربر
                            </span>
                            <span className=' flex justify-center w-full'>
                                جزئیات
                            </span>
                        </div>
                        {
                            users.length === 0 ? (
                                <div className='font-DanaMedium flex-1 text-xl p-16 md:text-2xl h-full flex justify-center items-center'>
                                    کاربری جهت نمایش وجود ندارد
                                </div>
                            ) : null
                        }
                        {
                            users.map((order, index) => (
                                <div key={index} className='flex justify-around w-full  bg-[#3b3b5c] child:py-2 child:items-center ' >
                                    <span className='border-l-2 border-[#383843] flex justify-center w-full'>
                                        {order.id}
                                    </span>
                                    <span className=' border-l-2 border-[#383843] flex justify-center w-full'>
                                        {order.firstName}
                                    </span>
                                    <span className=' border-l-2 border-[#383843] flex justify-center w-full'>
                                        {order.lastName}
                                    </span>
                                    <span className='hidden xl:flex border-l-2 border-[#383843] justify-center w-full'>
                                        {order.username}
                                    </span>
                                    <span className='hidden sm:flex border-l-2 border-[#383843]  justify-center w-full'>
                                        {order.role === "ADMIN" ? "ادمین" : "کاربر عادی"}
                                    </span>
                                    <span className=' flex justify-center w-full'>
                                        <NavLink onClick={()=> clickHandle(order)} state={{ userInfo: users[index] }} to={"detailsOfUser"} className='btn px-4 '>جزئیات </NavLink>
                                    </span>
                                </div>
                            ))
                        }

                    </div>
                )
            }
        </div>
    )
}
