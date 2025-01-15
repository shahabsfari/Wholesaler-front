import React from 'react'

export default function InformationProduct({ value = "specifications", setValue }) {
    const data = [
        [
            "نوع فروش",
            "بسته شرینگ شده"
        ],
        [
            "وزن محصول",
            "	1.35 کیلوگرم"
        ],
        [
            "حجم محصول",
            "	1.5 لیتر"
        ],
        [
            "نوع بسته بندی",
            "پلاستیک"
        ],
        [
            "تعداد در بسته بندی",
            "8 عدد"
        ],
        [
            "وزن بسته بندی",
            "11.2 کیلوگرم"
        ],
        [
            "شماره مجوز بهداشت",
            "22/12902"
        ],
    ]
    const introductionValue = "روغن بهارالماس باشعار اینکه بدون پالم تهیه می‌شود، روانه بازار شد. روغن بهار الماس در برابر حرارت مقاوم است و دود نمی‌کند. این روغن در برابر اکسیدشدن مقاوم است؛ بنابراین با حرارت دیدن بوی بدی به‌خود نمی‌گیرد و طعم غذایتان را تحت تاثیر قرار نمی‌دهد. روغن بهارالماس بدون پالم، رسوبی از خود به جای نمی‌گذارد. بهار این روغن را در بسته‌بندی 1350 میلی لیتری در اختیار مصرف‌کنندگان قرار داده است و دسته کاربردی آن باعث می‌شود به راحتی بتوانید روغن را در ظرف مورد نظر خود بریزید. اگر می‌خواهید غذایتان بدون ایجاد مواد سرطان‌زا سرخ شود و با خیال راحت حرارت ببیند، از روغن سرخ‌کردنی استفاده کنید تا تجربه‌ای خوب از درست کردن انواع مرغ سوخاری، سیب‌زمینی سرخ‌کرده، انواع کوکو و کتلت، فلافل و ... داشته باشید."
    const renderContetnt = () => {
        if (value === "specifications") {
            return (
                <table className="table-auto w-full border-x-[1px]  border-corn-flower/50" >
                    <tbody>
                        {
                            data.map((item, index) => (
                                <tr key={index} className='border-b-[1px]  border-corn-flower/50 w-full'>
                                    <td className='whitespace-nowrap px-2 pl-10 py-1 border-l-[1px]  border-corn-flower/50  w-fit'>
                                        {item[0]}
                                    </td>
                                    <td className='w-full px-3'>
                                        {item[1]}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table >
            )
        } else if (value === "introduction") {
            return (
                <div className='w-full p-2 leading-relaxed text-justify' >
                    {introductionValue}
                </div>
            )
        }
    }
    return (
        <div className='custome-container md:px-5 mt-5' >
            <div className=' grid grid-cols-12 text-dana  rounded-xl'>
                <div className=' col-span-12 flex border-b-2 border-corn-flower w-full'>
                    <span onClick={() => setValue("specifications")} className={`cursor-pointer text-base px-4 py-2 ${value === "specifications" ? " bg-corn-flower rounded-t-xl text-white" : ""}`} >
                        مشخصات
                    </span>
                    <span onClick={() => setValue("introduction")} className={`cursor-pointer text-base px-4 py-2 ${value === "introduction" ? " bg-corn-flower rounded-t-xl text-white" : ""}`}>
                        معرفی
                    </span>
                </div>
                <div className='col-span-12' >
                    {renderContetnt()}
                </div>
            </div>
        </div>
    )
}
