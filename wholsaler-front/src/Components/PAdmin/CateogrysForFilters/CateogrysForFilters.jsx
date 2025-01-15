import React, { useContext, useState } from 'react'
import { HiCheckCircle } from "react-icons/hi2";
import { IoIosArrowUp } from "react-icons/io";
import AuthContext from '../../../AuthContext';
export default function CateogrysForFilters({ handleCategoryChange, categoryValue, className = "text-white text-base font-DanaMedium" }) {

    const [showCategory, setShowCategory] = useState(false)
    const { categories } = useContext(AuthContext)

    function getIdByTitleCategories(title) {
        const item = categories.find(item => item.title === title);
        return item ? item.id : null;
    }

    const slectedCategoryHandler = (category) => {
        if (categoryValue === category) {
            handleCategoryChange('')
        } else {
            handleCategoryChange(category)
        }
    }

    return (
        <div className={` ${className} select-none`}>
            <span onClick={() => setShowCategory(prev => !prev)} className='cursor-pointer flex w-full justify-between items-center py-1 '>
                دسته بندی ها
                <span>
                    <IoIosArrowUp className={`${showCategory ? "rotate-180" : "-rotate-90"}`} />
                </span>
            </span>
            <div className={`${showCategory ? "" : "hidden"} flex flex-col gap-y-3 pt-2`}>
                <div className='flex flex-col gap-2'>
                    {
                        categories.map((item, index) => (
                            <span key={item.id} onClick={() => slectedCategoryHandler(item.id)} className='flex w-full items-center text-sm justify-between px-4'>
                                {item.title}
                                <HiCheckCircle className={`text-blue-500 size-5 ${categoryValue ===  item.id ? "block" : "hidden"}`} />
                            </span>
                        ))
                    }

                </div>
            </div>

        </div>
    )
}
