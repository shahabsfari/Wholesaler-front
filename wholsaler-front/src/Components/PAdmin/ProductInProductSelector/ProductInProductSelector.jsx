import React, { useState } from 'react'
import ProductBox from '../../ProductBox/ProductBox'
import PaginationButtons from '../../PaginationButtons/PaginationButtons'
import LoadingSec from '../../LoadingSec/LoadingSec'
export default function ProductInProductSelector({ loading, currentPage, pageCount, handlePageClick, data, openFilter }) {
    // console.log("pageCount : ", pageCount)
    return (
        <div className='  flex flex-col bg-soft-blue auto-rows-min rounded-3xl w-full h-full ' >
            {
                loading ? (
                    <div className='flex-1'>
                        <LoadingSec className='h-fit' />
                    </div>
                ) : (
                    <div className={`${openFilter ? " grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-5 " : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4  xl:grid-cols-6"} grid auto-rows-min flex-1 sm:p-4 gap-2 md:gap-2 p-2`} >
                        {
                            data.length !== 0 ? (
                                data.map((productData, index) => (
                                    <ProductBox key={index} {...productData} />
                                ))
                            ) : (
                                <div className='col-span-full flex justify-center text-base py-14 sm:text-xl font-DanaMedium items-center'>
                                    محصولی با این مشخصات وجود ندارد
                                </div>
                            )
                        }

                    </div>
                )
            }

            <div className='w-full pb-5 '>
                <PaginationButtons nextAndLeft='bg-gray-100' pageCount={pageCount} currentPage={currentPage} handlePageClick={handlePageClick} />
            </div>
        </div>
    )
}
