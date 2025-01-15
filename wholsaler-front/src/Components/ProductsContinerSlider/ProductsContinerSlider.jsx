import React, { useRef, useState } from 'react';
import ProductBox from '../ProductBox/ProductBox';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaAngleLeft } from "react-icons/fa6";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './style.css';
import { useNavigate } from 'react-router-dom';

// import required modules


export default function App({ data, title, sort = 3, enable = true }) {
    const navigate = useNavigate()
    const gotospeceficRoute = () => {
        navigate('/ProductSelector', { state: { sort, type: "filter" } })
    }

    return (
        <>
            <div dir='rtl' className='custome-container px-2 pb-2 rounded-xl md:rounded-3xl my-5  bg-soft-blue flex flex-col  '>
                <div className='flex justify-between  md:px-4 lg:my-3 items-center  ' >
                    <div className=' border-r-4 sm:border-r-4 my-2 md:my-0 border-orange-400/50 pr-1 sm:pr-3'>
                        <span className='text-sm md:text-3xl  font-MorabbaBold'>
                            {title}
                        </span>
                    </div>
                    <dir>
                        {
                            enable ? (
                                <button onClick={() => gotospeceficRoute()} className=' md:px-4   text-xs font-DanaMedium flex items-center justify-end ' >
                                    مشاهده همه
                                    <FaAngleLeft className='-translate-y-[1px]' />
                                </button>
                            ) : null
                        }

                    </dir>
                </div>
                <Swiper
                    freeMode={true}
                    breakpoints={{
                        100: {
                            slidesPerView: 1.7,
                            spaceBetween: 10
                        },
                        370: {
                            slidesPerView: 2.5,
                            spaceBetween: 10
                        },
                        540: {
                            slidesPerView: 3,
                            spaceBetween: 30
                        },
                        640: {
                            slidesPerView: 3,
                            spaceBetween: 20
                        },
                        768: {
                            slidesPerView: 3.70,
                            spaceBetween: 20
                        },
                        1024: {
                            slidesPerView: 4.2,
                            spaceBetween: 20
                        },
                        1276: {
                            slidesPerView: 6.2,
                            spaceBetween: 15
                        },

                    }}
                    slidesPerView={9}
                    // spaceBetween={20}
                    // centeredSlides={true}

                    className="mySwiper "
                >

                    {
                        data.map((productData, index) => {
                            // console.log( "productData:" ,productData)
                            return (
                                <SwiperSlide key={productData.id} className='rounded-2xl '>
                                    <ProductBox {...productData} />
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div>

        </>
    );
}
