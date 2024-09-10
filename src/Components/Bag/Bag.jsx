import React from 'react'
import { IoClose } from "react-icons/io5";
import ProductBag from "../ProductBag/ProductBag"
export default function Bag({ bagHandler }) {
  return (
    <div dir='ltr' className='flex fixed z-50 min-w-full min-h-screen  bg-zinc-500/50' >
      <div className='min-h-screen md:w-[570px] bg-white shadow-lg flex flex-col justify-between h-full'>
        <div className='flex flex-col'>
          <div className='flex justify-between items-center'>
            <span className='text-2xl font-MorabbaBold m-5' >سبد خرید</span>
            <IoClose className='size-7 m-5 cursor-pointer' onClick={() => bagHandler()} />
          </div>
          <ul>
            <ProductBag />
          </ul>
        </div>
        <div dir='rtl' className='flex p-5 items-center justify-between'>
          <div className='flex  items-center gap-x-4'>
            <button className='btn' > ثبت سفارش </button>
            <span className='text-xl'>قیمت نهایی :</span>
          </div>
          <div>
              <span className='text-xl'>12,000,000</span>
              <span>تومان</span>
          </div>
        </div>
      </div>
    </div>
  )
}
