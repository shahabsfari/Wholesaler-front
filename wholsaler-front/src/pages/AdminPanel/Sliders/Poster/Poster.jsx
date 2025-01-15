import React, { useEffect, useReducer, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { GoInfo } from "react-icons/go";
import LoadingSec from '../../../../Components/LoadingSec/LoadingSec';
export default function Poster() {
  const [posters, setPosters] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState(null);
  const [posterLoading, setPosterLoading] = useState(true)
  useEffect(() => {
    const fetchposter = async () => {
      try {
        setPosterLoading(true)
        const response = await fetch('/api/poster?pageSize=100&pageNumber=0');
        const data = await response.json();

        if (data.status === "SUCCESS" && !data.hasError) {
          // دریافت و تنظیم URL تصویر برای هر اسلایدر
          const postersWithImages = await Promise.all(data.dataList.map(async (slider) => {
            const imageResponse = await fetch(`/api/filehandler/files/${slider.image}`);
            const imageBlob = await imageResponse.blob();
            const imageUrl = URL.createObjectURL(imageBlob);
            return { ...slider, imageUrl };
          }));

          setPosters(postersWithImages);
          setTotalCount(data.totalCount);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError("خطا در اتصال به سرور");
      } finally {
        setPosterLoading(false)
      }
    };

    fetchposter();
  }, []);

  return (
    <div className='text-white col-span-12 font-Dana flex flex-col py-5'>

      <div className='w-full items-center  flex  justify-between mb-4'>
        <span className='border-r-2 pr-3 border-corn-flower text-xl font-MorabbaBold'>
          پوستر ها
        </span>
        <NavLink to="detailsPoster" className='btn'>
          اضافه کردن
        </NavLink>
      </div>
      <div className='flex-col flex w-full font-Dana text-white '>
        <div className='grid grid-cols-12 w-full  bg-[#2E2E48] rounded-t-xl child:py-2 ' >
          <span className='border-l-2 col-span-6 sm:col-span-4 md:col-span-3  border-[#383843] flex justify-center w-full'>
            تصویر
          </span>
          <span className=' col-span-4 hidden md:flex border-l-2 border-[#383843] justify-center w-full'>
            متن
          </span>
          <span className=' border-l-2 hidden sm:flex col-span-3 md:col-span-2  border-[#383843] justify-center w-full'>
            دسته بندی
          </span>
          <span className='  col-span-3 md:col-span-2  flex border-l-2 border-[#383843]  justify-center w-full'>
            وضعیت
          </span>
          <span className=' flex  col-span-3 sm:col-span-2 md:col-span-1  justify-center w-full'>
            جزئیات
          </span>
        </div>
        {
          posterLoading ? (
            <div className='flex absolute h-full inset-0 md:pr-40 justify-center items-center'>
              <LoadingSec />
            </div>
          ) : (
            posters.length === 0 ? (
              <div className='font-DanaMedium flex-1 text-xl p-16 md:text-2xl h-full flex justify-center items-center'>
                پوستری جهت نمایش وجود ندارد
              </div>
            ) : (
              posters.map((item, index) => {
                return (
                  <div key={item.id} className='grid grid-cols-12 w-full border-b-2 border-[#383843]  bg-[#43436e]  child:py-2 ' >
                    <span className='border-l-2 col-span-6 sm:col-span-4 md:col-span-3  border-[#383843] flex justify-center w-full'>
                      <img src={item.imageUrl} alt="pro" />
                    </span>
                    <span className='h-ful items-center  col-span-4 hidden md:flex border-l-2 border-[#383843] justify-center w-full'>
                      {item.title}
                    </span>
                    <span className=' h-ful items-center border-l-2 hidden sm:flex col-span-3 md:col-span-2  border-[#383843] justify-center w-full'>
                      بیسکوییت
                    </span>
                    <span className='h-ful items-center   col-span-3 md:col-span-2  flex border-l-2 border-[#383843]  justify-center w-full'>
                      {item.enable ? "فعال" : "غیر فعال"}
                    </span>
                    <span className='h-ful items-center  flex  col-span-3 sm:col-span-2 md:col-span-1  justify-center w-full'>
                      <NavLink to="editPster" state={item}>
                        <GoInfo className='text-blue-300' size={30} />
                      </NavLink>
                    </span>
                  </div>
                )
              })
            )
          )
        }


      </div>
    </div>
  )
}
