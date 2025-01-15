import React, { useContext } from 'react'
import SortSection from '../SortSection/SortSection'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import LoadingSec from '../../LoadingSec/LoadingSec'
import AuthContext from '../../../AuthContext'
export default function PaymentList({ showSort = false, invoices, invoicesLoading }) {
    const {formatNumber} = useContext(AuthContext)
    const sortData = [
        ["delivered", "تحویل‌شده"],
        ["not delivered", "تحویل‌نشده"],
        ["new", "جدید‌ترین"],
        ["oldest", "قدیمی‌ترین"],
    ]

    const navigate = useNavigate();
    const goToSpecificRoute = (index) => {
        navigate("/p-admin/payments/details", { state: invoices[index] });
    };

    console.log("invoices :", invoices)


    return (
        <div className='space-y-6 h-full '>
            {
                showSort && <SortSection data={sortData} />
            }
            {
                invoicesLoading ? (
                    <div className='flex absolute h-full inset-0 md:pr-40 justify-center items-center'>
                        <LoadingSec />
                    </div>
                ) : (   
                    <div className='flex-col w-full h-full font-Dana text-white  '>
                        <div className='flex justify-around w-full  bg-[#2E2E48] rounded-t-xl child:py-2 ' >
                            <span className='border-l-2 border-[#383843] flex justify-center w-full'>
                                کد سفارش
                            </span>
                            <span className='border-l-2 border-[#383843] hidden lg:flex justify-center w-full'>
                                کد مشتری
                            </span>
                            <span className=' border-l-2 border-[#383843] hidden sm:flex justify-center w-full'>
                                نام
                            </span>
                            <span className=' border-l-2 border-[#383843] hidden sm:flex justify-center w-full'>
                                نام‌خانوادگی
                            </span>
                            <span className='hidden xl:flex border-l-2 border-[#383843] justify-center w-full'>
                                شماره تماس
                            </span>
                            <span className=' flex border-l-2 border-[#383843]  justify-center w-full'>
                                مبلغ سفارش
                            </span>
                            <span className='border-l-2 border-[#383843] flex justify-center w-full'>
                                وضعیت
                            </span>
                            <span className=' flex justify-center w-full'>
                                جزئیات
                            </span>
                        </div>
                        {
                            invoices.length === 0 ? (
                                <div className='font-DanaMedium flex-1 text-xl p-16 md:text-2xl  flex justify-center items-center'>
                                    سفارشی جهت نمایش وجود ندارد
                                </div>
                            ) : (
                                invoices.map((order, index) => (
                                    <div key={index} className={`flex justify-around w-full ${index % 2 === 0 ? "bg-[#3b3b5c]" : "bg-[#313149]"}  child:py-2 child:items-center`}  >
                                        <span className='border-l-2 border-[#383843] flex justify-center w-full'>
                                            {order.id}
                                        </span>
                                        <span className='border-l-2 border-[#383843] hidden lg:flex justify-center w-full'>
                                            {order.customer.id}
                                        </span>
                                        <span className=' border-l-2 border-[#383843] hidden sm:flex justify-center w-full'>
                                            {order.customer.firstName}
                                        </span>
                                        <span className=' border-l-2 border-[#383843] hidden sm:flex justify-center w-full'>
                                            {order.customer.lastName}
                                        </span>
                                        <span className='hidden xl:flex border-l-2 border-[#383843] justify-center w-full'>
                                            {order.customer.mobile}
                                        </span>
                                        <span className=' flex border-l-2 border-[#383843]  justify-center w-full'>
                                            {formatNumber(order.totalPrice)}
                                        </span>
                                        <span className='border-l-2 border-[#383843] flex justify-center w-full'>
                                            {
                                                order.status === "PAID_NOT_DELIVERED" ? (
                                                    <span className='text-red-400' >
                                                        تحویل نشده
                                                    </span>
                                                ) : null
                                            }

                                            {
                                                order.status === "PAID_AND_DELIVERED" ? (
                                                    <span className='text-green-400' >
                                                        تحویل شده
                                                    </span>
                                                ) : null
                                            }

                                            {
                                                order.status === "NOT_PAID" ? (
                                                    <span className='text-yellow-400' >
                                                        پرداخت نشده
                                                    </span>
                                                ) : null
                                            }

                                        </span>
                                        <span className=' flex justify-center w-full'>
                                            <div onClick={() => goToSpecificRoute(index)} state={invoices[index]} className='btn px-4 cursor-pointer '>جزئیات </div>
                                        </span>
                                    </div>
                                ))
                            )
                        }

                    </div>
                )

            }

        </div>
    )
}
