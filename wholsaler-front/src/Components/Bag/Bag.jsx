import React, { useContext, useState } from 'react'
import { IoClose } from "react-icons/io5";
import ProductBag from "../ProductBag/ProductBag"
import AuthContext from '../../AuthContext'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IoBagHandleOutline } from "react-icons/io5";
export default function Bag() {

  const { cartItems, isLoggedIn } = useContext(AuthContext)

  const [isBagOpen, setIsBagOpen] = useState(false)

  const baHandler = () => {
    // console.log("yes")
    setIsBagOpen(prev => !prev)
  }


  const navigate = useNavigate();

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const goToSpecificRoute = () => {
    if (!isLoggedIn) {
      Swal.fire({
        title: 'وارد سایت نشده‌اید',
        text: 'برای ادامه لطفاً وارد حساب کاربری خود شوید یا یک حساب کاربری بسازید.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ورود به حساب کاربری',
        cancelButtonText: 'نادیده گرفتن'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/register');
        }
      });
    }
    else if (cartItems.length > 0) {
      navigate("/orderRegistration");
    } else {
      Swal.fire(
        'سبد خرید خالی است!',
        'لطفا ابتدا محصولات مورد نظر را انتخاب کنید',
        'error'
      );
    }
  };

  const sumPrices = (array) => {
    return array.reduce((sum, item) => sum + (item.priceWithDiscount * item.count || 0), 0)
  }

  // console.log("cartItems : ", cartItems)

  // console.log( sumPrices(cartItems))

  return (
    <div className='relative z-50 w-full text-end'>
      <button onClick={() => baHandler()} className='sm:btn  max-w-[150px] sm:w-full h-10 justify-center  '>
        <IoBagHandleOutline className='size-5' />
        <span className=' hidden sm:block' >سبد خرید</span>
      </button>

      {/* <div dir='ltr' className='relative inset-0 z-50 min-w-full min-h-screen  bg-zinc-500/50' > */}
      <div dir='ltr' className={`min-h-screen fixed flex flex-col top-0 left-0 w-full shadow-r-lg  md:w-[570px] bg-white shadow-lg 
         justify-between transform ${isBagOpen ? "translate-x-0" : "-translate-x-full"} transition-transform
          duration-300 ease-in-out`}>
        {/* top */}
        <div className='flex justify-between items-center'>
          <span className='text-2xl font-MorabbaBold m-5' >سبد خرید</span>
          <IoClose className='size-7 m-5 cursor-pointer' onClick={() => baHandler()} />
        </div>
        {/* mid */}
        <ul className='flex flex-col gap-2 flex-1 overflow-y-auto'>
          {
            cartItems.map((item, index) => (
              <ProductBag key={item.id} data={item} />
            ))
          }
        </ul>
        {/* buttom */}
        <div className='flex flex-col p-2 gap-2 md:p-5'>

          <div dir='rtl' className='flex px-1 items-center justify-between'>
            <div className='flex items-center gap-x-4'>
              <span className='md:text-xl text-base'>قیمت نهایی :</span>
            </div>
            <div>
              <span className='md:text-xl text-base'>{formatNumber(sumPrices(cartItems))}</span>
              <span>تومان</span>
            </div>
          </div>
          <button onClick={goToSpecificRoute} className='btn px-1' > ثبت سفارش </button>
        </div>
      </div>

      {/* </div> */}
    </div>
  )
}
