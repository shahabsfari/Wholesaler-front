import React from 'react'
import TopBarInPayments from '../../../Components/PAdmin/TopBarInPayments/TopBarInPayments'
import PaymentList from '../../../Components/PAdmin/PaymentList/PaymentList'
import Index from './IndexOfPayments/IndexOfPayments'
import { Outlet } from 'react-router-dom'

export default function Payments() {
    return (
        <div className='flex gap-y-4 flex-col p-2 md:p-4  md:pt-7 h-full' >
            {/* topbar */}
            <Outlet/>
        </div>
    )
}
