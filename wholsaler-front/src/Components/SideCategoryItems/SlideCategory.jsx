import React, { useContext, useState } from 'react'
import SideCategoryItems from './SideCategoryItems'
import { IoClose } from "react-icons/io5";
import { FaAngleLeft } from "react-icons/fa6";
import AuthContext from '../../AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';
export default function SlideCategory({ sideCategoryHandler }) {
    const { categories } = useContext(AuthContext)
    const [showCategoies, setShowCategoies] = useState(true)


    const navigate = useNavigate()
    const gotospeceficRoute = (id, event) => {
        event.stopPropagation()
        navigate('/ProductSelector', { state: { id, type: "category" } })
    }

    return (
        <div dir='rtl' className='flex fixed z-50 min-w-full min-h-screen  bg-zinc-500/50' >
            <div className='min-h-screen md:w-[570px] bg-white shadow-lg'>
                <div className='flex justify-between items-center'>
                    <span className='text-2xl font-MorabbaBold m-5' >دسته بندی ها </span>
                    <IoClose className='size-7 m-5 cursor-pointer' onClick={() => sideCategoryHandler()} />
                </div>
                <ul dir='rtl' className='pr-4 w-full space-y-3 overflow-y-scroll max-h-screen pb-3 text-base'>
                    {
                        categories.map((item) => (
                            <div
                                onClick={(event) => gotospeceficRoute(item.id, event)}
                                key={item.id}
                                className='text-base flex justify-start pl-6 pr-2 items-center
                                           font-MorabbaMedium'
                            >
                                <span>
                                    {item.title}
                                </span>
                            </div>
                        ))
                    }

                </ul>
                <div>

                </div>
            </div>
        </div>
    )
}
