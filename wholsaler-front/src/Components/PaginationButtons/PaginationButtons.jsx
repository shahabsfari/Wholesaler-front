import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
export default function PaginationButtons({ pageCount=5 , dotColor = "text-white", nextAndLeft = "bg-gray-400" , handlePageClick , currentPage=1 }) {
   
    // const [currentPage, setCurrentPage] = useState(0); // ذخیره صفحه فعلی
    // const handlePageClick = (event) => {
    //     setCurrentPage(event.selected); // صفحه انتخاب شده را ذخیره می‌کند
    //     console.log("کاربر به صفحه:", event.selected + 1, "رفته است");
    //     // به جای console.log می‌توانید هر کار دیگری انجام دهید
    // };

    return (
        <div dir='ltr' className='' >

            <ReactPaginate
                breakLabel={
                    <div className={dotColor} >
                        ...
                    </div>
                }
                nextLabel={
                    <div className={`p-1 rounded-lg  py-[6px] w-8 flex justify-center ${nextAndLeft} `}>
                        <FaAngleRight />
                    </div>
                }
                forcePage={currentPage}
                onPageChange={handlePageClick}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                pageCount={pageCount}
                previousLabel={
                    <div className={`p-1 rounded-lg  py-[6px] w-8 flex justify-center ${nextAndLeft} `}>
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
