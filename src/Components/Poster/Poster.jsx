import React from 'react'

export default function Poster( {dic:{ url, text , name }}) {
    return (
        <div className='custome-container  h-[150px] sm:h-[250px] flex justify-start items-center   bg-cover' style={{ backgroundImage: `url(${url})` }}>
            <div className='flex flex-col gap-y-1 sm:gap-y-2 lg:gap-y-4 mr-2 md:mr-10 lg:mr-20 ' >
                <span className='font-MorabbaBold sm:text-2xl lg:text-4xl' >
                    {text}
                </span>
                <div className='flex items-center  '>
                    <button className='btn py-2 text-xs sm:text-sm lg:text-xl px-2 '> همین الان خرید کن </button>
                </div>
            </div>
        </div>
    )
}
