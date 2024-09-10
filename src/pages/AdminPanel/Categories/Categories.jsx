import React from 'react'
import NewCategorySecction from '../../../Components/PAdmin/NewCategorySecction/NewCategorySecction'
import NewSubCategory from '../../../Components/PAdmin/NewSubCategory/NewSubCategory'
import CategoryList from '../../../Components/PAdmin/CategoryList/CategoryList'
export default function Categories() {
  return (
    <div className='mt-6 md:mt-0 grid grid-cols-8'>
        <NewCategorySecction />
        <CategoryList />
        <NewSubCategory />
    </div>
  )
}
