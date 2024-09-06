import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductCategory from '../ProductCategory/ProductCategory';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './style.css';

// import required modules
import { Autoplay, Pagination } from 'swiper/modules';

export default function App() {
  return (
    <>
      <div className='custome-container'>
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
              slidesPerView: 6
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
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper mt-5"
        >
          <SwiperSlide>
            <ProductCategory url="./images/category/kerem.png" text="محصولات سلولزی" />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCategory url="./images/category/oil.png" text="آجیل و خشک بار" />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCategory url="./images/category/rice.png" text="محصولات سلولزی" />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCategory url="./images/category/snacks.png" text="تنقلات" />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCategory url="./images/category/snacks.png" text="شوینده و مواد ضد عفونی کننده" />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCategory url="./images/category/oil.png" text="لوازم تحریر و اداری" />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCategory url="./images/category/oil.png" text="نوشیدنی" />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCategory url="./images/category/snacks.png" text="شوینده و مواد ضد عفونی کننده" />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCategory url="./images/category/oil.png" text="لوازم تحریر و اداری" />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCategory url="./images/category/oil.png" text="نوشیدنی" />
          </SwiperSlide>
        </Swiper>
      </div>

    </>
  );
}
