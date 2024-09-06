import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function SlidePoster() {
  const url = "./images/slider/biss1.png"
  const url2 = "./images/slider/chash1.png"
  const url3 = "./images/slider/del.jpg"
  const url4 = "./images/slider/s1.png"
  return (
    <>
      <div className='custome-container h-auto mt-5'>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            reverseDirection: true
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide >
            <div className='relative w-full h-full' >
              <div className='bg-cover w-full  aspect-[3/1] lg:aspect-auto lg:h-[400px] flex items-center  ' style={{ backgroundImage: `url(${url})` }}>
                <div className=' mr-2 sm:mr-10 sm:space-y-4 items-start'>
                  <span className='font-MorabbaBold text-base sm:text-3xl md:text-4xl lg:text-5xl' >خرید انواع بیسکویت و ویفر</span>
                  <button className='btn px-1 sm:px-3 sm:mx-5 text-xs sm:text-xl font-DanaDemiBold' >همین الان خرید کن</button>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide >
            <div className='relative w-full h-full' >
              <div className='bg-cover w-full  aspect-[3/1] lg:aspect-auto lg:h-[400px] flex items-center  ' style={{ backgroundImage: `url(${url2})` }}>
                <div className=' mr-2 sm:mr-10 sm:space-y-4 items-start'>
                  <span className='font-MorabbaBold text-base sm:text-3xl md:text-4xl lg:text-5xl' >خرید انواع ادویه و چاشنی ها</span>
                  <button className='btn px-1 sm:px-3 sm:mx-5 text-xs sm:text-xl font-DanaDemiBold' >همین الان خرید کن</button>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide >
            <div className='relative w-full h-full' >
              <div className='bg-cover w-full  aspect-[3/1] lg:aspect-auto lg:h-[400px] flex items-center  ' style={{ backgroundImage: `url(${url3})` }}>
                <div className=' mr-2 sm:mr-10 sm:space-y-4 items-start'>
                  <span className='font-MorabbaBold text-base sm:text-3xl md:text-4xl lg:text-5xl' >خرید از شما ، ارسالش با  ما 😁</span>
                  <button className='btn px-1 sm:px-3 sm:mx-5 text-xs sm:text-xl font-DanaDemiBold' >همین الان خرید کن</button>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide >
            <div className='relative w-full h-full' >
              <div className='bg-cover w-full  aspect-[3/1] lg:aspect-auto lg:h-[400px] flex items-center  ' style={{ backgroundImage: `url(${url4})` }}>
                <div className=' mr-2 sm:mr-10 sm:space-y-4 items-start justify-center flex flex-col w-[200px] md:w-[500px] h-full'>
                  <span className='font-MorabbaBold text-base  sm:text-3xl md:text-4xl lg:text-5xl text-start ' >بنک مارکت بزرگ ترین فروشگاه انلاین شاهرود</span>
                  <button className='btn px-1 sm:px-3 sm:mx-5 text-xs sm:text-xl font-DanaDemiBold' >همین الان خرید کن</button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div >
    </>
  );
}
