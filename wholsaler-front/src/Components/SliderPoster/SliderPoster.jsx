import React, { useEffect, useRef, useState } from 'react';
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

  const [sliders, setSliders] = useState([]);
  const [error, setError] = useState(null);

  const fetchSliders = async () => {
    try {

      const response = await fetch('/api/slider/getAllEnables');
      const data = await response.json();
      if (data.status === 'SUCCESS' && data.dataList) {
        const updatedSliders = await Promise.all(
          data.dataList.map(async (item) => {
            try {
              const imageResponse = await fetch(  `/api/filehandler/files/${item.image}`);
              if (imageResponse.status === 200) {
                const imageUrl = imageResponse.url;
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

        setSliders(updatedSliders);
      } else {
        setError(data.message || 'Failed to fetch sliders');
      }
    } catch (error) {
      setError('Error fetching sliders');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSliders();
  }, []);

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
            sliders.map((item, index) => (
              <SwiperSlide key={item.id}>
                <Poster data={item} />
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div >
    </>
  );
}
