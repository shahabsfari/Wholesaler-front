import React, { useContext, useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import AuthContext from '../../../../AuthContext';
export default function OrdersOfUsers() {

  const { user, isLoggedIn, targetUser } = useContext(AuthContext)
  const location = useLocation();
  const userInfo = location.state;
  const checkActive = (text) => {
    return location.pathname.startsWith(text)
  }


  console.log("userInfo in orders :", targetUser)





  return (
    <div className='w-full text-white h-full font-Dana flex flex-col pt-5 p-5'>
      <div className='flex border-b-2 border-corn-flower '>
        <NavLink state={userInfo} to="awaitingPaymentOrderInUser" className={`${checkActive("/p-admin/users/ordersOfUsers/awaitingPaymentOrderInUser") ? " text-white bg-corn-flower rounded-t-lg" : ""} px-5 py-2 cursor-pointer`}>
          در انتظار ارسال
        </NavLink >
        <NavLink state={userInfo} to="paidOrdersOfUser" className={`${checkActive("/p-admin/users/ordersOfUsers/paidOrdersOfUser") ? " text-white bg-corn-flower rounded-t-lg" : ""} px-5 py-2 cursor-pointer`} >
          دریافت شده
        </NavLink >
        {/* <NavLink to="canceledOrdersInUsers" className={`${checkActive("/p-admin/users/ordersOfUsers/canceledOrdersInUsers") ? " text-white bg-corn-flower rounded-t-lg" : ""} px-5 py-2 cursor-pointer`} >
          لغو شده
        </NavLink > */}
      </div>
      <div className='flex-1 h-full'>
        <Outlet />
      </div>
    </div>
  )
}
