import React, { useContext, useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductCategory from '../ProductCategory/ProductCategory';
import AuthContext from '../../AuthContext';
import LoadingSec from '../LoadingSec/LoadingSec';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './style.css';

// import required modules
import { Autoplay, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

export default function CategorySlider() {
  const { categories, loading } = useContext(AuthContext);
  const [categoriesWithImages, setCategoriesWithImages] = useState([]);
  const [cloacding, setCloading] = useState(true)


  const navigate = useNavigate()
  const gotospeceficRoute = (id, event) => {
    event.stopPropagation()
    console.log("ygydgs")
    navigate('/ProductSelector', { state: { id, type: "category" } })
  }


  const fetchImages = async () => {
    try {
      const updatedCategories = await Promise.all(
        categories.map(async (item) => {
          try {
            const response = await fetch(`/api/filehandler/files/${item.image}`);
            if (response.status === 200) {
              const imageUrl = response.url;
              return { ...item, imageUrl };
            } else {
              console.error('Failed to fetch image for:', item.image);
              return { ...item, imageUrl: null };
            }
          } catch (error) {
            console.error('Error fetching image for:', item.image, error);
            return { ...item, imageUrl: null };
          }
        })
      );

      setCategoriesWithImages(updatedCategories);
      setCloading(false)
    } catch (error) {
      console.error('Error fetching images', error);
    }
  };
  useEffect(() => {
    if (categories) {
      fetchImages();
    }
  }, [categories]);

  if (cloacding) {
    return (
      <div>
        <LoadingSec className='h-fit' />
      </div>
    )
  }

  return (
    <>
      <div className='custome-container'>
        <Swiper
          initialSlide={Math.floor(categoriesWithImages.length / 2)}
          breakpoints={{
            300: {
              slidesPerView: 2,
            },
            540: {
              slidesPerView: 3,
            },
            640: {
              slidesPerView: 4,
            },
            768: {
              slidesPerView: 5,
            },
            1024: {
              slidesPerView: 6,
            },
          }}
          loop={true} // فعال کردن لوپ
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            reverseDirection: true,
          }}
          spaceBetween={20}
          centeredSlides={true} // نمایش اسلاید‌ها با اسلاید وسط در مرکز
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper mt-5"
        >
          {categoriesWithImages.map((item) => (
            <SwiperSlide
              onClick={(event) => gotospeceficRoute(item.id, event)}
              key={item.id}
            >
              <ProductCategory url={item.imageUrl} text={item.title} id={item.id} />
            </SwiperSlide>
          ))}
        </Swiper>

      </div>

    </>
  );
}
