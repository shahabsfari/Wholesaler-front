import { click } from '@testing-library/user-event/dist/click';
import React from 'react'
import { BsSearch } from "react-icons/bs";
export default function SearchInput({ onClick , placeholder, value = "", setFunc = false, className , setIsFocused = false }) {

  const clickHandle = ()=> {
    if(onClick){
      onClick()
    }
  }

  const changeHandle = (e) => {
    if (setFunc) {
      setFunc(e.target.value)
    }
  }
  const handleBlur = (event) => {
    setTimeout(() => {
      setIsFocused(false);
    }, 100);
  }

  return (
    <div className='flex gap-x-2 border-2 w-fit border-zinc-600 rounded-lg justify-center items-center flex-row-reverse bg-white px-[6px]'>
      <input onFocus={() => setIsFocused(true)}
        onBlur={(event) => handleBlur(event)}
        value={value}
        onChange={(e) => changeHandle(e)}
        className='outline-none border-none h-9 bg-transparent font-DanaMedium rounded-lg'
        type="text" placeholder={placeholder}
      />
      <BsSearch onClick={clickHandle} className='size-6 cursor-pointer' />
    </div>
  )
}
