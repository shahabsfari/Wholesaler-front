import React, { useState } from 'react'

export default function InputeNum({readOnly=false , value = '' , title, className , setFunc, maxNum = 990000000, unit = "تومان" }) {
    const [showValue, setShowValue] = useState(value);
    const min = 0;
    const max = maxNum

    const handleInputChange = (e) => {  
        if (e.target.value === '') {
            setFunc('')
            return setShowValue('')
            
        }
        // console.log("e" , e.target.value)
        const newnum = parseInt(e.target.value.replace(/,/g, ""), 10);
        // console.log("newnume" , newnum)
        if (!isNaN(newnum) && ((newnum >= min) || newnum === '') && (newnum <= max)) {
            setShowValue(newnum);
            setFunc(newnum)
        }
    };

    const MIN = 0; // حداقل مقدار کلی
    const MAX = 99000000; // حداکثر مقدار کلی

    // تابع قالب‌بندی عدد برای اضافه کردن ویرگول
    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <div className={`${className} relative  items-center px-5 justify-between flex bg-transparent border-2  rounded-md h-11 border-[#55555e]`}>
            <div className='w-full flex justify-center'>
                <input readOnly={readOnly} dir='ltr' onChange={(e) => handleInputChange(e)} value={formatNumber(value.toString())} className='outline-none text-center lg:text-right xl:text-center pr-2 text-white text-base font-Dana bg-transparent w-[130px] rounded-md h-11' type="text" />
            </div>
            <span className= {`absolute left-2 font-Dana text-white text-sm`}>{unit}</span>
            <span className='absolute  -top-3 right-2 text-white text-sm font-Dana bg-[#383854] ' >{title}</span>
        </div>
    )
}
