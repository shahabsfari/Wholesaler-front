import React from 'react'

export default function Poster({ data :{url , description , btnText , searchWord }}) {
    return (
        <div className='relative w-full h-full' >
            <div className='bg-cover w-full  aspect-[3/1] lg:aspect-auto lg:h-[400px] flex items-center  ' style={{ backgroundImage: `url(${url})` }}>
                <div className='mr-2 sm:mr-10 sm:space-y-4 items-start justify-center flex flex-col w-[200px] md:w-[600px] h-full '>
                    <span className='font-MorabbaBold text-start text-base sm:text-3xl md:text-4xl lg:text-5xl ' > {description} </span>
                    <button className='btn px-1 sm:px-3  text-xs sm:text-xl font-DanaDemiBold' >{btnText}</button>
                </div>
            </div>
        </div>
    )
}
