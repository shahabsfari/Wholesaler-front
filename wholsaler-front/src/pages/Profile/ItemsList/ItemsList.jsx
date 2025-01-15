import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import ProductInOrder from '../../../Components/PAdmin/ProductInOrder/ProductInOrder';
import AuthContext from '../../../AuthContext';
export default function ItemsList({ data = undefined, className, src = "../images/products/oil.webp", spanColor = "text-gray-500" }) {
    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const { convertToJalali, fetchLoading } = useContext(AuthContext)

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(-1);
    };
    console.log(data)
    if (fetchLoading || data === undefined) {
        return <div>Loading...</div>
    }
    return (
        <div className={`w-full h-full grid grid-cols-12 text-base  gap-y-4 ${className}`}>

            <div className='col-span-12 flex justify-between'>
                <span className='flex justify-center gap-x-1 items-center ' >
                    <span className='cursor-pointer' onClick={handleClick}>
                        <MdOutlineKeyboardBackspace size={25} className='rotate-180' />
                    </span>
                    <span>
                        جزئیات سفارش
                    </span>
                </span>
                <span>
                    {data.status === "PAID_AND_DELIVERED" ? "دریافت شده" : null}
                    {data.status === "PAID_NOT_DELIVERED" ? "در انتظار ارسال" : null}
                    {data.status === "NOT_PAID" ? "پرداخت نشده" : null}
                </span>
            </div>
            {/* customerCode and date */}
            <div className='col-span-12'>
                <div className='w-full flex justify-between'>
                    <span className={`${spanColor}`} >کد پیگیری سفارش :</span>
                    <span>{data.id}</span>
                </div>
                <div className='w-full flex justify-between'>
                    <span className={`${spanColor}`}>تاریخ ثبت صفارش :</span>
                    <span className='flex justify-center items-center'>
                        {convertToJalali(data.invoiceDate)}
                    </span>
                </div>
            </div>
            {/* address name and phonenumber */}
            <div className='col-span-12' >
                <div className='col-span-12 flex justify-between'>
                    <span className={`${spanColor}`}>تحویل گیرنده:</span>
                    <span className='flex gap-x-1 ' >
                        <span>
                            {data.customer.firstName}
                        </span>
                        <span>
                            {data.customer.lastName}
                        </span>
                    </span>
                </div>
                <div className='col-span-12 flex justify-between'>
                    <span className={`${spanColor}`}>شماره موبایل:</span>
                    <span>{data.customer.mobile}</span>
                </div>
                <div className='col-span-12 flex flex-col md:flex-row md:justify-between '>
                    <span className={`${spanColor}`}>آدرس :</span>
                    <span>{data.customer.address}</span>
                </div>
            </div>
            {/* price and paymentType*/}
            <div className='col-span-12' >
                <div className='col-span-12 flex justify-between items-center'>
                    <span className={`${spanColor}`}>مبلغ:</span>
                    <span className='flex items-center gap-1'>
                        <span>{formatNumber(data.totalPrice)}</span>
                        <span className='text-sm' >تومان</span>
                    </span>
                </div>
                <div className='col-span-12 flex justify-between'>
                    <span className={`${spanColor}`}>نوع پرداخت :</span>
                    <span>پرداخت اینترنتی</span>
                </div>
            </div>
            {/* list of items */}
            <div className='col-span-12 gap-2 flex flex-col'>
                {
                    data.orderItems.map((item, index) => (
                        <div>
                            <ProductInOrder data={item} />
                        </div>
                    ))
                }

            </div>
        </div>
    )
}
