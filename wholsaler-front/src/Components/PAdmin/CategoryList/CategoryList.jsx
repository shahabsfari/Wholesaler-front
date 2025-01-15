import React, { useContext, useEffect, useState } from 'react'
import CategoryItem from '../CategoryItem/CategoryItem'
import PaginationButtons from '../../PaginationButtons/PaginationButtons'
import Header from '../Header/Header';
import AuthContext from '../../../AuthContext';
import LoadingSec from '../../LoadingSec/LoadingSec';
export default function CategoryList({ setUpdate, user, update }) {
  // const [categories, setCategories] = useState([])
  const [error, setError] = useState(null);
  const { categories, fetchCategories, categoriesLoading } = useContext(AuthContext)


  useEffect(() => {
    fetchCategories();
  }, [update]);

  return (
    <div className='flex flex-col h-full '>
      <div className='w-full px-5 justify-start '>
        <div className='sm:px-2 mt-4'>
          <div className={`w-full  border-b-2 border-[#55555e] font-MorabbaMedium text-xl pt-1 pr-0 md:pr-0  pb-3 text-white`} >
            <span>
              ویرایش دسته بندی
            </span>
          </div>
        </div>
      </div>
      <div className='grid gap-5  grid-cols-12 h-full ' >
        <div dir='rtl' className='col-span-12 grid gap-5 h-full auto-rows-min  grid-cols-12 p-5 mb-0 '>
          {
            categoriesLoading ? (
              <div className='flex absolute h-full inset-0 md:pr-40 justify-center items-center'>
                <LoadingSec />
              </div>
            ) : (
              categories.length === 0 ? (
                <div className='font-DanaMedium col-span-12 text-white flex-1 text-xl p-16 md:text-2xl flex justify-center items-center'>
                  دسته بندی ای جهت نمایش وجود ندارد
                </div>
              ) : (
                categories.map((item, index) => (
                  <div dir='ltr' className='col-span-12 sm:col-span-4 lg:col-span-2  h-[180px] flex justify-center items-center relative' key={index}>
                    <CategoryItem user={user} setUpdate={setUpdate} data={item} />
                  </div>
                ))
              )
            )
          }
        </div>
        {/* <div className='flex justify-center col-span-12 mb-4 items-center' >
          <PaginationButtons />
        </div> */}
      </div>
    </div>
  )
}
