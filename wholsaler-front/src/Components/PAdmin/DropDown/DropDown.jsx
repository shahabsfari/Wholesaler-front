import React, { useState } from 'react'

export default function DropDown({ title, setFunc = false , readOnly = true, list, value, className, classNameList }) {
    const [openDropDown, setOpenDropDown] = useState(false)

    const filteredItems = list.filter((item) =>
        item.includes(value)
    );
    const handleItemClick = (item) => {
        console.log(item)
        if (setFunc) {
            setFunc(item);
        }
        setOpenDropDown(false);
    };
    return (
        <div className={`${className} relative  cursor-pointer w-full  flex justify-center rounded-md max-h-11`}>
            <input onBlur={() => setTimeout(() => setOpenDropDown(false), 200)} onFocus={() => setOpenDropDown(true)} onChange={(e) => setFunc(e.target.value)} className='cursor-pointer w-full outline-none text-center pr-2 text-white text-base font-Dana bg-transparent h-11 ' type="text" placeholder='هیچکدام' readOnly={readOnly} value={value} />
            <span className='absolute -top-3 right-1 text-white px-2 text-sm font-Dana bg-[#383854]' > {title} </span>
            <div className={` ${openDropDown ? "flex" : "hidden"} ${classNameList}  overflow-auto max-h-[200px] font-Dana  absolute top-[100%] text-white flex flex-col  z-30 bg-[#383854] text-sm w-full`} >
                {
                    !readOnly && (
                        filteredItems.map((item, index) => (
                            <span className='hover:bg-zinc-600/50 w-full px-1 py-1' key={index} onClick={() => handleItemClick(item)}> {item} </span>
                        )))
                }
                {
                    readOnly && (
                        list.map((item, index) => (
                            <span className='hover:bg-zinc-600/50 w-full px-1 py-1' key={index} onClick={() => handleItemClick(item)}> {item} </span>
                        )))
                }
            </div>
        </div>
    )
}
