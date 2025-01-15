import React, { useContext, useEffect, useState } from 'react'
import InputText from '../../../../Components/InputText/InputText'
import AuthContext from '../../../../AuthContext'
import DropDown from '../../../../Components/PAdmin/DropDown/DropDown'
import { useLocation, useNavigate } from 'react-router-dom'
import MapButtton from '../../../../Components/PAdmin/MapButtton/MapButtton'
import ProductInOrder from '../../../../Components/PAdmin/ProductInOrder/ProductInOrder'
import Swal from 'sweetalert2'
export default function Details({ }) {
    const { formatNumber, user } = useContext(AuthContext)
    const location = useLocation()
    const [invoice, setInvoice] = useState(location.state || {})
    const [status, setStatus] = useState(invoice.status === "PAID_AND_DELIVERED" ? "تحویل‌شده" : invoice.status === "PAID_NOT_DELIVERED"? "تحویل‌نشده" : "پرداخت نشده" )
    const Navigate = useNavigate();
    console.log(invoice)    
    // useEffect(()=>{
    //     if (invoice.status === "PAID_AND_DELIVERED"){
    //         setStatus("تحویل‌شده")
    //     } else if (invoice.status === "PAID_NOT_DELIVERED"){
    //         setStatus("تحویل‌نشده")
    //     } else {
    //         setStatus("پرداخت نشده")
    //     }
    // } , [])
    const setStatusHandle = (text) => {
        console.log( "text", text)
        setStatus(text)
    }
    const handleDeliveryStatus = async () => {
        console.log(status)
        if (user !== null && status !== "پرداخت نشده") {
            console.log(user)
            const isDelivered = status === "تحویل‌شده" ? 1 : 0;
            try {
                Swal.fire({
                    title: 'در حال پردازش...',
                    text: 'لطفاً منتظر بمانید',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    },
                });
                const response = await fetch(`/api/invoice/deliver/${invoice.id}/${isDelivered}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`,
                    },
                });
                
                console.log(response)
                const result = await response.json();

                console.log(result)

                if (response.ok && result.status === 'SUCCESS') {

                    Swal.fire({
                        icon: 'success',
                        title: 'عملیات موفق',
                        text: 'وضعیت سفارش با موفقیت به‌روزرسانی شد.',
                    });
                    Navigate(-1)
                } else {

                    Swal.fire({
                        icon: 'error',
                        title: 'خطا',
                        text: result.message || 'عملیات با خطا مواجه شد.',
                    });
                }
            } catch (error) {

                Swal.fire({
                    icon: 'error',
                    title: 'خطای سرور',
                    text: 'مشکلی در اتصال به سرور وجود دارد. لطفاً دوباره تلاش کنید.',
                });
            }
        }
    };

    return (
        <div className='w-full grid grid-cols-12 gap-5 p-5'>
            <InputText bg="bg-transparent" mode="bg-[#383854]" value={invoice.customer.id} className=' col-span-6 sm:col-span-4 lg:col-span-2 font-Dana text-white  flex justify-center items-center child:text-center ' title=" کد مشتری" />
            <InputText bg="bg-transparent" mode="bg-[#383854]" value={invoice.id} className=' col-span-6 sm:col-span-4 lg:col-span-2 font-Dana text-white flex justify-center items-center child:text-center ' title="کد سفارش" />
            <InputText bg="bg-transparent" mode="bg-[#383854]" value={invoice.customer.firstName} className=' col-span-6 sm:col-span-4 lg:col-span-2 font-Dana text-white flex justify-center items-center child:text-center ' title="نام" />
            <InputText bg="bg-transparent" mode="bg-[#383854]" value={invoice.customer.lastName} className=' col-span-6 sm:col-span-4 lg:col-span-2 font-Dana text-white flex justify-center items-center child:text-center ' title="نام‌خانوادگی" />
            <InputText bg="bg-transparent" mode="bg-[#383854]" value={invoice.customer.mobile} className=' col-span-6 sm:col-span-4 lg:col-span-2 font-Dana text-white flex justify-center items-center child:text-center ' title=" شماره تماس" />
            <InputText bg="bg-transparent" mode="bg-[#383854]" value={formatNumber(invoice.totalPrice)} className=' col-span-6 sm:col-span-4 lg:col-span-2 font-Dana text-white flex justify-center items-center child:text-center ' title="مبلغ سفارش" />
            <InputText bg="bg-transparent" mode="bg-[#383854]" value={invoice.customer.address} className='col-span-12 md:col-span-6 lg:col-span-8 font-Dana text-white' title="آدرس" />
            <MapButtton className=" col-span-6 md:col-span-3 lg:col-span-2" longitude={invoice.customer.longitude} latitude={invoice.customer.latitude} />
            <DropDown readOnly={true} classNameList="binvoice-[1px]  binvoice-corn-flower shadow-xl shadow-gray-500/70" className="border-[1px] border-corn-flower col-span-6 md:col-span-3 lg:col-span-2 binvoice-[1px] binvoice-corn-flower" title="وضعیت" value={status} setFunc={setStatusHandle} list={["تحویل‌نشده", "تحویل‌شده"]} />
            {
                invoice.orderItems.map((product) => (
                    <div className='col-span-12 flex flex-col' >
                        <ProductInOrder data={product} clasNameSpan='text-black text-base' className="text-white" src={product.productDetails.imageName} />
                    </div>
                ))
            }
            <button onClick={handleDeliveryStatus} className=' col-span-12 md:col-span-2 btn px-2 font-DanaMedium' > ثبت وضعیت </button>

        </div>
    )
}