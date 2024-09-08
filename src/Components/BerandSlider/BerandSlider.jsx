import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaAngleLeft } from "react-icons/fa6";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './style.css';

// import required modules
import { FreeMode, Autoplay } from 'swiper/modules';


export default function App() {
    const brandData = [
        { "url": "./images/brands/active.png", "name": "product" },
        { "url": "./images/brands/latifeh.png", "name": "product" },
        { "url": "./images/brands/elit.png.webp", "name": "product" },
        { "url": "./images/brands/chitoze.webp", "name": "product" },
        { "url": "./images/brands/par.png", "name": "product" },
        { "url": "./images/brands/zar.jpg", "name": "product" },
        { "url": "./images/brands/nescafe.png", "name": "product" },
        { "url": "./images/brands/kaleh.jpg", "name": "product" },
    ]
    return (
        <>
            <div className='custome-container  my-5 '>
                <div className='flex justify-between px-4 lg:my-3 items-center  ' >
                    <div className=' border-r-4 sm:border-r-4 border-orange-400 pr-1 sm:pr-3'>
                        <span className='text-sm md:text-3xl  font-MorabbaBold'>
                            برند های معروف
                        </span>
                    </div>
                    <dir>
                        <button className='px-2 md:px-4 text-xs font-DanaMedium flex items-center justify-center gap-x-1' >
                            مشاهده همه
                            <FaAngleLeft className='-translate-y-[1px]' />
                        </button>
                    </dir>
                </div>
                <div className=' px-10 md:px-20'>

                    <Swiper
                        breakpoints={{
                            300: {
                                slidesPerView: 2
                            },
                            540: {
                                slidesPerView: 3
                            },
                            640: {
                                slidesPerView: 4
                            },
                            768: {
                                slidesPerView: 5
                            },
                            1024: {
                                slidesPerView: 7
                            },

                        }}
                        loop={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                            reverseDirection: true
                        }}
                        slidesPerView={9}
                        spaceBetween={20}
                        centeredSlides={true}
                        FreeMode={true}
                        modules={[Autoplay, FreeMode]}
                        className="mySwiper mt-5"
                    >

                        {
                            brandData.map((data, index) => (
                                <SwiperSlide key={index} >
                                    <img className='object-contain aspect-[3/2]' src={data.url} alt={data.name} />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </div>

        </>
    );
}
