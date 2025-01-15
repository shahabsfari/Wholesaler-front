import React, { useContext, useState } from 'react'
import CategoryUl from './CategoryUl';
import AuthContext from '../../AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';
export default function CategoryItems() {
    const navigate = useNavigate();

    const gotospeceficRoute = (item) => {
        navigate("/ProductSelector", { state: { ...item, type: "category" } });
    }
    const { categories } = useContext(AuthContext)

    return (
        <>
            {/* <div className='w-[768px] flex max-h-[400px] min-h-[400px] z-50 bg-white backdrop-blur-[100px] rounded-lg' style={{ boxShadow: "0px 30px 70px rgba(0,0,0,0.4) " }}>

                <ul dir='ltr' className='min-h-full min-w-fit child:text-[14px] child:font-DanaMedium border-l border-gray-400/50 child:cursor-pointer child:w-full child:flex   child:items-center overflow-y-scroll flex flex-col  divide-y divide-gray-400/50 child:p-1 child:pl-3'>
                    {
                        categoryKeys.map((category, index) => (
                            <li className={`${slectedCategory === category ? "text-orange-400" : ""}`} dir='rtl' key={index} onMouseEnter={() => setSlectedCategory(category)}>  {category} </li>
                        ))
                    }
                </ul>
                <div className='w-full'>
                    <CategoryUl categorys={categorys[slectedCategory]} title={slectedCategory} />
                </div>
            </div> */}
            <div className='w-[768px] max-h-[400px] overflow-auto grid grid-cols-12 gap-2 bg-white p-5 auto-rows-[60px]'>
                {
                    categories.map((item) => (
                        <div
                            onClick={() => gotospeceficRoute(item)}
                            key={item.id}
                            className="col-span-3 h-full text-center p-2 rounded-lg flex
                                      bg-corn-flower/60 text-base felx justify-center items-center"
                    
                            
                        >
                            {item.title}
                        </div>
                    ))
                }
            </div>
        </>

    )
}
