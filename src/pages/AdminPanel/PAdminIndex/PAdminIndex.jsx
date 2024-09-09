import React, { useState } from 'react'
import moment from 'jalali-moment'
import Chart1 from '../../../Components/Chart/Chart1'
export default function PAdminIndex() {
  // const [todayJalali , setTodayJalali] = useState(new Date())
  const todayJalali = moment().locale('fa').format('YYYY/MM/DD')

  const convertToPersianNumbers = (input) => {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return input.replace(/\d/g, (x) => persianDigits[x]);
  };

  const todayJalaliInPersian = convertToPersianNumbers(todayJalali);
  console.log(todayJalali)
  return (
    <div>
      {/* top bar */}
      <div className='flex justify-end md:justify-between px-2 md:px-10'>
        <span className='hidden md:block font-MorabbaMedium text-3xl text-white' >داشبورد</span>
        <div className='flex gap-x-2 justify-center items-center text-white font-MorabbaMedium text-base md:text-xl relative py-1 px-4 bg-[#2E2E48] rounded-lg'>
           <span>تاریخ :</span>
          {todayJalaliInPersian}
        </div>
      </div>
      <div>
        <Chart1/>
      </div>
    </div>
  )
}
