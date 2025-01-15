import React, { useState } from 'react'
import { HiCheckCircle } from "react-icons/hi2";
import { IoIosArrowUp } from "react-icons/io";
import { Range, getTrackBackground } from "react-range";
import './style.css'
export default function PriceRange({ priceRange, handleMinPriceChange, handleMaxPriceChange, className, borderBg, spanBg = "bg-[#1e1e32]" }) {
    // const [values, setValues] = useState([0, 10000000]); // مقادیر حداقل و حداکثر

    const STEP = 1000; // گام افزایش/کاهش
    const MIN = 0; // حداقل مقدار کلی
    const MAX = 10000000; // حداکثر مقدار کلی

    // تابع قالب‌بندی عدد برای اضافه کردن ویرگول
    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // تابع برای مدیریت تغییر مقدار حداقل
    const handleMinInputChange = (e) => {
        const newMin = parseInt(e.target.value.replace(/,/g, ""), 10);
        if (!isNaN(newMin) && newMin <= priceRange.max) {
            handleMinPriceChange(newMin)
            // setValues([newMin, priceRange.max]);
        }
    };

    // تابع برای مدیریت تغییر مقدار حداکثر
    const handleMaxInputChange = (e) => {
        const newMax = parseInt(e.target.value.replace(/,/g, ""), 10);
        if (!isNaN(newMax) && newMax >= priceRange.min) {
            handleMaxPriceChange(newMax)
            // setValues([priceRange.min, newMax]);
        }
    };

    // تابع برای مدیریت تغییر مقدار رنج
    const handleRangeChange = (newValues) => {
        // setValues(newValues);
        // setValues([MAX - newValues[1], MAX - newValues[0]]);
        handleMinPriceChange(MAX - newValues[1])
        handleMaxPriceChange(MAX - newValues[0])
    };

    const [showPriceRange, setShowPriceRang] = useState(true)

    return (
        <div className={` ${className} select-none`}>
            <span onClick={() => setShowPriceRang(prev => !prev)} className='cursor-pointer flex w-full justify-between items-center py-1 '>
                بازه قیمتی
                <span>
                    <IoIosArrowUp className={`${showPriceRange ? "rotate-180" : "-rotate-90"}`} />
                </span>
            </span>
            <div className={`${showPriceRange ? "" : "hidden"} flex pb-4 flex-col gap-y-2 pt-2`}>

                <div className='flex gap-x-2 pt-4' >
                    <div className={`relative flex justify-center items-center min-h-10 border-2 rounded-lg px-2 ${borderBg} `}>
                        <span className={`absolute -top-3 right-2  px-1 ${spanBg}`}> از </span>
                        <input className='font-DanaMedium h-full w-full outline-none bg-transparent px-2 text-center' value={formatNumber(priceRange.min.toString())} type="text" onChange={(e) => handleMinInputChange(e)} />
                        <span className='text-sm'>تومان</span>
                    </div>

                    <div className={`relative flex justify-center items-center min-h-10 border-2 rounded-lg px-2 ${borderBg}`}  >
                        <span className={`absolute -top-3 right-2  px-1 ${spanBg}`} > تا </span>
                        <input className='font-DanaMedium h-full w-full outline-none bg-transparent px-2 text-center' value={formatNumber(priceRange.max.toString())}
                            type="text" onChange={(e) => handleMaxInputChange(e)} />
                        <span className='text-sm'>تومان</span>
                    </div>
                </div>
                <div dir='ltr' className='pt-4 px-3'>
                    <Range
                        values={[MAX - priceRange.max, MAX - priceRange.min]}
                        step={STEP}
                        min={MIN}
                        max={MAX}
                        onChange={handleRangeChange} // همگام سازی مقدار رنج
                        renderTrack={({ props, children }) => (
                            <div
                                onMouseDown={props.onMouseDown}
                                onTouchStart={props.onTouchStart}
                                style={{
                                    ...props.style,
                                    height: "6px",
                                    display: "flex",
                                    width: "100%",
                                }}
                            >
                                <div
                                    ref={props.ref}
                                    style={{
                                        height: "6px",
                                        width: "100%",
                                        borderRadius: "4px",
                                        background: getTrackBackground({
                                            values: [MAX - priceRange.max, MAX - priceRange.min],
                                            colors: ["#ccc", "#548BF4", "#ccc"],
                                            min: MIN,
                                            max: MAX,
                                        }),
                                        alignSelf: "center",
                                    }}
                                >
                                    {children}
                                </div>
                            </div>
                        )}
                        renderThumb={({ props, isDragged }) => {
                            const { key, ...restProps } = props;
                            return (
                                <div
                                    key={key} // `key` را مستقیماً اضافه می‌کنیم
                                    {...restProps}
                                    
                                    style={{
                                        ...props.style,
                                        height: "24px",
                                        width: "24px",
                                        borderRadius: "50%",
                                        backgroundColor: "#FFF",
                                        border: "1px solid #ccc",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        boxShadow: "0px 2px 6px #AAA",
                                    }}
                                >
                                    <div

                                        style={{
                                            height: "16px",
                                            width: "5px",
                                            backgroundColor: isDragged ? "#548BF4" : "#CCC",
                                        }}
                                    />
                                </div>
                            )
                        }}
                    />

                </div>
            </div>

        </div>
    )
}
