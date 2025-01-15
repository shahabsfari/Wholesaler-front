import React, { useContext } from 'react'
import Swal from 'sweetalert2';
import AuthContext from '../../AuthContext';
export default function RegistrationForBuy({ cartItems , selectedAddress }) {

  const { user } = useContext(AuthContext)

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const calculateTotalPriceWithDiscount = (items) => {
    return cartItems.reduce((total, item) => total + (item.priceWithDiscount * item.count || 0), 0);
  };
  const calculateTotalPrice = (items) => {
    return cartItems.reduce((total, item) => total + (item.price * item.count || 0), 0);
  };
  const price = calculateTotalPrice(cartItems)
  const priceWithDiscount = calculateTotalPrice(calculateTotalPriceWithDiscount)


  const API_URL = "/api/payment/goToPayment";

  const handlePayment = async () => {
    const totalPrice = calculateTotalPriceWithDiscount();
  
    if (totalPrice <= 5000) {
      Swal.fire({
        title: 'خطا',
        text: 'مبلغ خرید باید بیشتر از ۵۰۰۰ تومان باشد.',
        icon: 'warning',
        confirmButtonText: 'باشه',
      });
      return;
    }
  
    if (!selectedAddress) {
      Swal.fire({
        title: 'خطا',
        text: 'لطفاً آدرس خود را تایید کنید.',
        icon: 'warning',
        confirmButtonText: 'باشه',
      });
      return;
    }
  
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          gateway: "Zarinpal",
        }),
      });
  
      if (!response.ok) {
        throw new Error("خطا در ارسال درخواست به درگاه پرداخت");
      }
  
      const data = await response.json();
      console.log(data);
  
      if (data.status === "SUCCESS") {
        const paymentUrl = data.message;
  
        // هدایت کاربر به آدرس پرداخت
        window.location.href = paymentUrl;
  
      } else {
        Swal.fire({
          icon: "error",
          title: "خطا در پرداخت",
          text: data.message || "مشکلی رخ داده است",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "خطای سیستم",
        text: error.message || "مشکلی در پردازش درخواست وجود دارد",
      });
    }
  };
  

  return (
    <div className='w-full flex flex-col gap-2 sticky top-20 '>
      {/* discountCode */}
      {/* <div className='w-full flex justify-between items-center border-[1px] border-corn-flower rounded-md p-3'>
        <input className='outline-none w-full font-Dana px-2 h-full' placeholder='کد تخفیف ' type="text" />
        <button className='btn py-1 px-3'>ثبت</button>
      </div> */}
      {/* price and payment */}
      <div className='w-full flex flex-col justify-between items-center border-[1px] border-corn-flower rounded-md p-3'>
        <div className='w-full flex justify-between items-center'>
          <span>
            جمع مبلع کالاها:
          </span>
          <span className='flex items-center gap-1'>
            <span className='text-base'>
              {
                formatNumber(calculateTotalPrice())
              }
            </span>
            <span className='text-xs' >
              تومان
            </span>
          </span>
        </div>
        <div className='w-full flex justify-between items-center'>
          <span>
            هزینه ارسال
          </span>
          <span className='flex items-center gap-1'>
            رایگان
          </span>
        </div>
        <div className='w-full flex justify-between items-center'>
          <span>
            تخفیف:
          </span>
          <span className='flex items-center gap-1'>
            <span className='text-base'>
              {
                formatNumber(calculateTotalPrice() - calculateTotalPriceWithDiscount())
              }
            </span>
            <span className='text-xs' >
              تومان
            </span>
          </span>
        </div>
        <div className='w-full flex justify-between items-center mt-4'>
          <span className='text-xl font-DanaMedium'>
            مبلغ نهایی:
          </span>
          <span className='flex items-center gap-1'>
            <span className='text-xl font-DanaDemiBold'>
              {
                formatNumber(calculateTotalPriceWithDiscount())
              }
            </span>
            <span className='text-xs font-DanaMedium' >
              تومان
            </span>
          </span>
        </div>
      </div>
      {/* buy btn */}
      <div className='w-full'>
        <button onClick={handlePayment} className='btn w-full py-3 ' > تایید و ثبت سفارش</button>
      </div>
    </div>
  )
}
