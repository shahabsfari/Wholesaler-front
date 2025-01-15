import React, { useContext, useState } from 'react'
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import AuthContext from '../../AuthContext';
import Swal from 'sweetalert2';
export default function ProductBag({ data }) {

    const { increaseQuantity, decreaseQuantity, isLoggedIn, deleteCartItem } = useContext(AuthContext)
    const [isProcessing, setIsProcessing] = useState(false);
    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    const showStockAlert = (requestedCount, availableStock) => {
        Swal.fire({
          title: 'موجودی ناکافی',
          text: `موجودی انبار (${availableStock}) برای تعداد درخواستی شما (${requestedCount}) کافی نیست.`,
          icon: 'error',
          confirmButtonText: 'باشه',
          confirmButtonColor: '#d33',
        });
      };

    const decreaseBtn = () => {
        if (data.count > 1) {
            isLoggedIn ? decreaseQuantity(data.productId) : decreaseQuantity(data.id)
        }
    }
    const increaseBtn = () => {
        if (isProcessing) return; 
        setIsProcessing(true);
        if(data.count + 1 <= data.stock){
            isLoggedIn ? increaseQuantity(data.productId , data.count ) : increaseQuantity(data.id , data.count)
        } else {
            showStockAlert(data.count +1 , data.stock )
        }
        setTimeout(() => setIsProcessing(false), 300); 
    }

    const deleteBtn = () => {
        isLoggedIn ? deleteCartItem(data.productId) : deleteCartItem(data.id)
    }

    return (
        <div className=' p-1 md:p-3 border border-zinc-400 rounded-lg mx-3 space-y-2'>
            <div dir='rtl' className='flex'>
                {/* image & number */}
                <div className='flex border md:min-h-[120px] justify-center items-center max-w-16 min-w-16 md:max-w-28 md:min-w-28 border-zinc-400 rounded-lg p-1 flex-col gap-y-2 ml-2'>
                    <img className='' src={data.imageUrl} alt="product" />
                </div>
                {/* description & price */}
                <div className=' flex flex-col justify-between w-full'>
                    <div className='flex pt-1 justify-between'>
                        <span  className='md:w-[60%] text-sm md:text-[13px] line-clamp-2 text-start '>
                            {data.title}
                        </span>
                        <div>
                            {
                                data.hasDiscount ? (
                                    <div className='w-full flex justify-end'>
                                        <div className='relative  text-gray-500 flex text-sm md:text-base'>
                                            <span >{formatNumber(data.price * data.count)}</span>
                                            <span >تومان</span>
                                            <span className='absolute my-auto bottom-0 left-0  top-0 min-w-full max-h-[1px] min-h-[1px] bg-black  '></span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='opacity-0 relative md:ml-9 text-gray-500 text-sm md:text-base'>
                                        <span >{formatNumber(data.priceWithDiscount * data.count)}</span>
                                        <span >تومان</span>
                                        <span className='absolute my-auto bottom-0 left-0  top-0 min-w-full max-h-[1px] min-h-[1px] bg-black  '></span>
                                    </div>
                                )
                            }
                            <span className='text-sm md:text-xl flex items-center gap-1 justify-end' >
                                <span className='font-DanaDemiBold' >{formatNumber(data.priceWithDiscount * data.count )}</span>
                                <span className='text-sm' >تومان</span>
                            </span>
                        </div>
                    </div>
                    <div className='hidden md:flex gap-x-3'>
                        <button onClick={()=>deleteBtn()} className='btn justify-center flex items-center gap-1'>
                            <MdOutlineDeleteOutline className='size-6' />
                            <span className=' hidden md:block' >حذف</span>
                        </button>
                        <div className='flex border border-corn-flower w-full justify-around items-center p-1 gap-x-2 rounded-lg'>
                            <span onClick={() => increaseBtn(data.productId)} > <GoPlus className='size-6 text-corn-flower cursor-pointer' /></span>
                            <span className='text-base'>{data.count}</span>
                            <span onClick={() => decreaseBtn(data.productId)} ><FiMinus className='size-6 text-corn-flower cursor-pointer' /></span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex md:hidden gap-x-4 '>
                <div className='flex border-2 border-corn-flower w-full justify-around items-center p-1 gap-x-2 rounded-lg'>
                    <span  onClick={() => increaseBtn(data.productId)} > <GoPlus className='size-4 text-corn-flower cursor-pointer' /></span>
                    <span className='text-base'>{data.count}</span>
                    <span onClick={() => decreaseBtn(data.productId)} ><FiMinus className='size-4 text-corn-flower cursor-pointer' /></span>
                </div>
                <button onClick={()=>deleteBtn()} className='bg-corn-flower rounded-lg px-[18px] justify-center flex items-center gap-1'>
                    <MdOutlineDeleteOutline className='size-6 text-white' />
                    <span className=' hidden md:block' >حذف</span>
                </button>
            </div>
        </div>

    )
}
