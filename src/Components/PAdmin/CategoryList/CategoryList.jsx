import React from 'react'
import CategoryItem from '../CategoryItem/CategoryItem'
import PaginationButtons from '../../PaginationButtons/PaginationButtons'
export default function CategoryList() {

  return (
    <>
      <div className='col-span-8 sm:col-span-5 lg:col-span-6 grid gap-5  grid-cols-6 lg:m-5' >
        <div dir='ltr' className='col-span-8 grid gap-5  grid-cols-6 m-5 mb-0 '>
          <CategoryItem />
          <CategoryItem />
          <CategoryItem />
          <CategoryItem />
          <CategoryItem />
          <CategoryItem />
          <CategoryItem />
        </div>
        <div className='flex justify-center col-span-8 items-center' >
          <PaginationButtons />
        </div>

      </div>
    </>
  )
}
