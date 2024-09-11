import React from 'react'
import ReactPaginate from 'react-paginate'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
export default function PaginationButtons() {
    console.log("paginate")
    return (
        <div dir='ltr' className='' >

            <ReactPaginate
                breakLabel={
                    <div className='text-white' >
                        ...
                    </div>
                }
                nextLabel={
                    <div className='p-1 rounded-lg bg-gray-400 py-[6px] w-8 flex justify-center'>
                        <FaAngleRight />
                    </div>
                }
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                pageCount={20}
                previousLabel={
                    <div className='p-1 rounded-lg bg-gray-400 py-[6px] w-8 flex justify-center'>
                        <FaAngleLeft />
                    </div>
                }
                renderOnZeroPageCount={null}
                containerClassName='flex  justify-center items-center font-DanaDemiBold text-xl gap-1 md:gap-5'
                pageClassName=' w-8 pt-1 flex justify-center items-center  text-white rounded-lg hover:bg-gray-600'
                activeClassName='bg-green-400 text-zinc-800 '
                
            />
        </div>
    )
}
