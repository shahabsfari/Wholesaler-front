import React, { useState } from 'react'
import Modal from "../../Modal/Modal"
import { CiImageOn } from "react-icons/ci";
import DropDown from '../DropDown/DropDown';
import InputeNum from '../InputeNum/InputeNum';
import AddFeatureItem from '../AddFeatureItem/AddFeatureItem';

export default function AddNewItem({ onClose }) {
  const [openCategoryDropDown, setOpenCategoryDropDown] = useState(false)
  const [category, setCategory] = useState("")
  const [brand, setBrand] = useState("")
  const [statusMode , setStatusMode] = useState("موجود")
  const [subCategory, setSubCategory] = useState("")
  const [imageCategori, setImageCategori] = useState("هیچ عکسی انتخاب نشده است")
  const [priceWithoutDiscont, setPriceWithoutDiscont] = useState(0)

  const listFeatures = [
    "قیمت مصرف کننده: 18٫500 تومان",
    "تاخیری",
    "حاوی عصاره‌های طبیعی عناب، گوارانا، تمبر هندی",
    "دارای ویتامین C موجود برای افزایش جذب عصاره‌های گیاهی"
  ]
  const listSpecifications = [
    ["مدل محصول", "مدل نوبل، 3 عددی"],
    ["مدل محصول", "مدل نوبل، 3 عددی"],
    ["مدل محصول", "مدل نوبل، 3 عددی"],
    ["مدل محصول", "مدل نوبل، 3 عددی"],
  ]
  const setCategotyHandler = (category) => {
    setCategory(prev => {
      if (prev !== category) {
        setSubCategory('')
        return category
      } else {
        return ''
      }
    })
  }
  let categorys = {
    "": [],
    "تنقلات": ["چیپس", "پفک", "شکلات", "پنبه", "نخود", "هویج"],
    "لوازم تحریر": ["مداد", "دفتر", "خودکار"],
    "ادامس": ["دارچینی", "موزی", "توت فرنگی"],
    "بهداشتی": ["دستمال", "پد بهداشتی", "خلال دندون"],
    "کنسرویجات": ["تن ماهی", "کنسرو قرمه سبزی", "کنسرو لوبیا"],
    "کالای اساسی": ["روغن", "چای", "برنج"]
  }

  let brands = [
    "اکتیو",
    "چیتوز",
    "میهن",
    "کاله",
    "صحت",
    "زرماکارون",
    "گلرنگ",
    "لطیفه"
  ]
  let status = [
    "موجود ",
    "نا موجود",
    "غیر فعال",

  ]
  const justCategtoys = Object.keys(categorys);
  const justsubCategory = categorys[category];
  const inputChangeHanler = (event) => {
    if (event.target.files.length > 0) {
      setImageCategori(event.target.files[0].name)
    } else {
      setImageCategori("هیچ عکسی انتخاب نشده است")
    }
  }

  return (
    <Modal onClose={onClose} isOpen={true}  >
      <div className='text-3xl overflow-auto col-span-12 grid grid-cols-12 auto-rows-min gap-y-5 pb-10 md:pb-0   h-screen bg-[#383854] justify-start items-center pt-24'>

        {/* upload image */}
        <div className='px-2 xl:px-0 xl:pr-2 flex items-center col-span-12 lg:col-span-2'>
          <div dir="ltr" className='relative w-full flex justify-between items-center pr-2 rounded-md h-11 bg-transparent border-2  border-[#55555e]'>
            <input onChange={(event) => inputChangeHanler(event)} id="imageMainCategory" className=' hidden text-white text-base text-center font-Dana outline-none px-2 rounded-md h-9 bg-transparent border-2  border-[#1d1d2d]' type="file" accept='image/*' />
            <span className='absolute text-sm right-3 px-1 bg-[#383854] -top-3 font-Dana text-white' >انتخاب تصویر</span>
            <label htmlFor="imageMainCategory" className='flex justify-center items-center cursor-pointer'>
              <CiImageOn className='size-7 text-white' />
            </label>
            <span className='font-Dana text-white items-center flex justify-center text-sm lg:text-xs xl:text-sm '>{imageCategori}</span>
          </div>
        </div>

        <div className=' px-2 sm:px-2 col-span-12 lg:col-span-10 gap-4 grid grid-cols-12 child:col-span-6 lg:child:col-span-2 items-center'>
          <InputeNum setFunc={setPriceWithoutDiscont} title={"قیمت بدون تخفیف"} />
          <InputeNum setFunc={setPriceWithoutDiscont} title={"قیمت با تخفیف"} />
          <InputeNum setFunc={setPriceWithoutDiscont} unit='درصد' maxNum={100} title={"تخفیف"} />
          <DropDown className="border-2 order-first md:col-span-4 border-[#55555e]" classNameList="border-2 border-[#55555e]" title={" دسته بندی"} list={justCategtoys} setFunc={setCategotyHandler} value={category} />
          <DropDown className="border-2 order-first md:col-span-4 border-[#55555e]" classNameList="border-2 border-[#55555e]" title={"زیر دسته بندی"} list={justsubCategory} setFunc={setSubCategory} value={subCategory} />
          <DropDown className="border-2 order-first md:col-span-4 border-[#55555e]" classNameList="border-2 border-[#55555e]" title={"برند"} list={brands} setFunc={setBrand} value={brand} />
        </div>
        <div className='col-span-12 grid grid-cols-12'>
          <div className=' col-span-12 lg:col-span-8 px-2 space-y-2' >
            <AddFeatureItem list={listSpecifications} title="مشخصات" />
            <AddFeatureItem type='features' list={listFeatures} title="ویژگی ها" />
          </div>
          <div className=' col-span-12 lg:col-span-4 pl-2 px-2 grid grid-cols-12 auto-rows-min' >
            {/* title */}
            <div className='col-span-12 flex flex-col text-white font-Dana'>
              <span className=' border-r-2 border-blue-400 pr-2 text-xl mb-4 ' >سر تیتر</span>
              <input className='bg-transparent px-2 text-base h-11 outline-none border rounded-lg border-[#55555e]' type="text" />
            </div>
            {/* status */}
            <div className='w-full col-span-12 grid grid-cols-12 auto-rows-min gap-4 mt-6'>
              <div className='relative col-span-6 md:col-span-4 cursor-pointer w-full border-2 border-[#55555e] flex justify-center rounded-md'>
                <input className='cursor-pointer  outline-none text-center pr-2 text-white text-base font-Dana bg-transparent  w-[150px] h-11 ' type="text" />
                <span className='absolute  -top-3 right-2 text-white text-sm font-Dana bg-[#383854]' > واحد </span>
              </div>
              <div className='relative col-span-6 md:col-span-4 cursor-pointer w-full border-2 border-[#55555e] flex justify-center rounded-md'>
                <input className='cursor-pointer  outline-none text-center pr-2 text-white text-base font-Dana bg-transparent  w-[150px] h-11 ' type="text" />
                <span className='absolute  -top-3 right-2 text-white text-sm font-Dana bg-[#383854]' > تعداد در هر بسته </span>
              </div>
              <DropDown className="border-2 order-first md:col-span-4 border-[#55555e]" classNameList="border-2 border-[#55555e]" title={"وضعیت"} list={status} setFunc={setStatusMode} value={statusMode} />
              <button className='outline-none rounded-lg bg-blue-500 col-span-12 h-11 font-Dana text-white text-xl ' >اضافه کردن محصول</button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
