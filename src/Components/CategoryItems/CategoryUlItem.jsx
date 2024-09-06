import React from 'react'
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

export default function CategoryUlItem({title , list}) {
    return (
        <>
            <div>
                <span className='text-base flex mb-2 items-center gap-x-1 font-DanaMedium border-r-2 pr-2 border-orange-300'>
                    {title}
                    <MdOutlineKeyboardArrowLeft className='text-orange-400' />
                </span>
                <ul className='space-y-1 pr-1'>
                    {list.map((item, index)=> {
                        return (
                            <li className='text-zinc-500' key={index}>{item}</li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}
