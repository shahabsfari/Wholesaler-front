import React from 'react'
import NewCategorySecction from '../../../Components/PAdmin/NewCategorySecction/NewCategorySecction'
import NewSubCategory from '../../../Components/PAdmin/NewSubCategory/NewSubCategory'
import CategoryList from '../../../Components/PAdmin/CategoryList/CategoryList'
export default function Categories() {
  const data = {
    "بهداشتی" : ["نوار بهداشتی" , "دستمال کاغذی" , "مسواک"],
    "حبوبات" : ["عدس" , "لپه" , "نخود"],
    "ادویه" : ["فلفل" , "نمک" , "زرد چوبه"],
    "نوشیدنی" : ["دوغ" , "نوشابه" , "آبمیوه"],
    "صبحانه" : ["کره" , "مربا" , "عسل"],
    "کنسرویجات" : ["کنسرو لوبیا" , "کنسرو قورمه سبزی" , "تن  ماهی"],
    "الکترونیکی" : ["لامپ کم مصرف" , "باتری قلمی" , " لامپ پر مصرف"],
    "کالا های اساسی" : ["روغن" , "برنج" , "چای"],
    "تنقلات" : ["چیپس" , "پفک" , "پفیلا"]
  }
  return (
    <div className='mt-6 md:mt-0 grid grid-cols-8 justify-center '>
      <div className=' col-span-8 sm:col-span-3 lg:col-span-2 space-y-5 ' >
        <NewCategorySecction />
        <NewSubCategory />
      </div>
      <CategoryList />
    </div>
  )
}
