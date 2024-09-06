import React from 'react'
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import CategoryUlItem from './CategoryUlItem'
export default function CategoryUl({ categorys = [], title }) {
    const colmuns = [[], [], [], []]
    let x = 0
    for (let item in categorys) {
        colmuns[x % 4].push(item)
        x++;
    }

    // console.log(colmuns)


    return (
        <>
            <div className='text-base text-orange-400 flex items-center font-DanaMedium pt-2 pr-2' >
                <div>
                    <span>
                        همه محصولات
                    </span>
                    <span>
                        { " "+ title}
                    </span>
                </div>
                <MdOutlineKeyboardArrowLeft className='text-orange-400 size-5 -translate-y-[1px]' />
            </div>
            <div className='grid grid-cols-4 gap-x-6  grid-flow-row h-[90%] w-full overflow-y-scroll   p-3' >
                {colmuns.map((column, index) => (
                    <div className='flex flex-col gap-y-4' key={index}>
                        {
                            column.map((item, index) => {
                                return (
                                    <CategoryUlItem key={index} title={item} list={categorys[item]} />
                                )
                            })
                        }
                    </div>
                ))}
            </div>
        </>
    )
}
