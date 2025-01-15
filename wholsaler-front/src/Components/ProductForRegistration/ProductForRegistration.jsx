import React, { useContext, useEffect, useState } from 'react'
import OrderProductForRegister from '../OrderProductForRegister/OrderProductForRegister'
import AuthContext from '../../AuthContext'
import AddAddres from '../AddAddres/AddAddres'
import { CgAddR } from "react-icons/cg";
export default function ProductForRegistration({ selectedAddress, setSelectedAddress, customerData, setCustomerData }) {
    const { user, userloading, cartItems } = useContext(AuthContext)
    const [openAddAddress, setOpenAddAddress] = useState(false)
    const openAddAddressHnadler = () => {
        setOpenAddAddress(prev => !prev)
    }
    const addresses = [
        "استان سمنان / شاهرود / پیشوا / خیابان امام علی / روبه روی داروخانه",
        "v سمنان / شاهرود / پیشوا / خیابان امام علی / روبه روی داروخانه",
        "3 سمنان / شاهرود / پیشوا / خیابان امام علی / روبه روی داروخانه",
        "استان h / شاهرود / پیشوا / خیابان امام علی / روبه روی داروخانه",
        "s سمنان / شاهرود / پیشوا / خیابان امام علی / روبه روی داروخانه",
    ]


    const chooseAddress = (e, item) => {
        if (e.target.value) {
            setSelectedAddress(prev => prev === item ? null : item)
        }
    }
    const cheackSelected = (address) => {
        if (address === selectedAddress) {
            return true
        } else {
            return false
        }
    }
    const renderAddress = () => {
        if (customerData === null || customerData.address === 'null') {
            return (
                <div className='w-full flex border-[1px] border-corn-flower  p-5 rounded-lg justify-between items-center'>
                    <div className='text-xs sm:text-base overflow-hidden text-gray-600 line-clamp-1' >
                        آدرسی جهت نمایش وجود ندارد لطفا یک ادرس اضافه کنید
                    </div>
                    <button onClick={openAddAddressHnadler} className='btn hidden md:flex'>اضافه کردن ادرس</button>
                    <button onClick={openAddAddressHnadler} className='flex md:hidden'>
                        <CgAddR size={24} className='text-corn-flower' />
                    </button>
                </div>
            )
        } else {
            return (
                <div className=' relative w-full flex border-[1px] border-corn-flower py-4 px-2 lg:p-5 rounded-lg justify-between items-center' >
                    <span className='absolute -top-3 right-5 z-10 bg-white px-1 ' > یک ادرس انتخاب کنید</span>
                    <ul className='flex flex-col gap-y-3 max-h-24 lg:max-h-16 overflow-y-auto lg:pr-5 w-full'>

                        <li key={customerData.id} className=' flex justify-start gap-x-4 items-center'>
                            <input className='size-4' onChange={(e) => chooseAddress(e, customerData.address)} checked={cheackSelected(customerData.address)} type="checkbox" />
                            {customerData.address}
                        </li>


                    </ul>
                </div>
            )
        }
    }

    return (
        <div className='w-full flex flex-col pt-4 md:pt-0'>
            <div className='w-full'>
                {
                    renderAddress()
                }
            </div>
            <div className='w-full mt-3'>
                {/* title */}
                <div className='w-full flex justify-start'>
                    <span className='text-2xl font-MorabbaBold border-r-4 pr-5 border-corn-flower'>
                        کالا های انتخاب شده
                    </span>
                </div>
                <div className='w-full'>
                    {
                        cartItems.map((product, index) => (
                            <div key={product.id} className='w-full'>
                                <OrderProductForRegister product={product} cartItems={cartItems} />
                            </div>
                        ))
                    }

                </div>
            </div>

            {
                openAddAddress ? (
                    <AddAddres
                        setCustomerData={setCustomerData}
                        customerData={customerData}
                        onClose={openAddAddressHnadler}
                    />
                ) : null
            }
        </div>
    )
}
