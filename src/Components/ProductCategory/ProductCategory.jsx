import React from 'react'

export default function ProductCategory({ url, text }) {
  return (
    <div className='relative  text-white flex justify-center items-center font-DanaDemiBold text-base sm:text-xl w-full h-[60px] sm:h-[100px] cursor-pointer rounded-xl ' >
      <div className='absolute bg-cover bg-center bg-no-repeat blur-[2px] inset-0 rounded-xl' style={{ backgroundImage: `url(${url})` }}>
      </div>
      <div className='absolute bg-zinc-800 opacity-30 inset-0 rounded-xl' >

      </div>
      <span className='z-20 p-2'>
        {text}
      </span>
    </div>
  )
}
