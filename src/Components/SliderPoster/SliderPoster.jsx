import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Poster from './Poster';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function SlidePoster() {
  const SlidersData = [
    {"url" : "./images/slider/biss1.png" , "searchWord" : "ویفر" , "description" : "خرید انواع بیسکویت و ویفر" , "btnText" :"همین الان خرید کن"  },
    {"url" : "./images/slider/chash1.png" , "searchWord" : "ادویه" , "description" : "خرید انواع ادویه و چاشنی" , "btnText" :"همین الان خرید کن"  },
    {"url" : "./images/slider/del.jpg" , "searchWord" : "همه" , "description" : " خرید از شما ارسالش با ما😁" , "btnText" :"همین الان خرید کن"  },
    {"url" : "./images/slider/s1.png" , "searchWord" : "همه" , "description" : "بنک مارکت بزرگ ترین فروشگاه انلاین شاهرود" , "btnText" :"همین الان خرید کن"  }
  ]
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
          {
            SlidersData.map( (data , index) =>(
              <SwiperSlide key={index}>
                <Poster data={data} />
              </SwiperSlide>   
            ))
          }
        </Swiper>
      </div >
    </>
  );
}
