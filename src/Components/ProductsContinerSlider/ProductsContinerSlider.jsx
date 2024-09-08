import React, { useRef, useState } from 'react';
import ProductBox from '../ProductBox/ProductBox';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaAngleLeft } from "react-icons/fa6";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './style.css';

// import required modules
import { FreeMode } from 'swiper/modules';

export default function App({ data, title }) {
    return (
        <>
            <div dir='rtl' className='custome-container px-2 pb-2 rounded-3xl my-5 bg-soft-blue flex flex-col  '>
                <div className='flex justify-between px-4 lg:my-3 items-center  ' >
                    <div className=' border-r-4 sm:border-r-4 border-orange-400 pr-1 sm:pr-3'>
                        <span className='text-sm md:text-3xl  font-MorabbaBold'>
                            {title}
                        </span>
                    </div>
                    <dir>
                        <button className='px-2 md:px-4 text-xs font-DanaMedium flex items-center justify-center gap-x-1' >
                            مشاهده همه
                            <FaAngleLeft className='-translate-y-[1px]' />
                        </button>
                    </dir>
                </div>
                <Swiper
                    breakpoints={{
                        100: {
                            slidesPerView: 1.7,
                            spaceBetween: 15
                        },
                        370: {
                            slidesPerView: 2.5,
                            spaceBetween: 20
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
                    freeMode={true}
                    modules={[FreeMode]}
                    className="mySwiper "
                >

                    {
                        data.map((productData, index) => (
                            <SwiperSlide key={index} className='rounded-2xl '>
                                <ProductBox productData={productData} />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>

        </>
    );
}
