import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Poster({imageUrl="nothing" , id, title, category, description="nothing", defaultPoster = false }) {
    const navigate = useNavigate()
    const gotospeceficRoute = (category)=> {
      navigate('/ProductSelector' ,   {state : { category , type: "poster" }} )
    }
   
    // console.log("imageUrl: " , imageUrl , "description: " , description  )
    return (
        <div className='custome-container  h-[150px] sm:h-[250px] flex justify-start items-center   bg-cover' style={{ backgroundImage: `url(${imageUrl})` }}>
            <div className='flex flex-col gap-y-1 sm:gap-y-2 lg:gap-y-4 mr-2 md:mr-10 lg:mr-20 ' >
                <span className='font-MorabbaBold sm:text-2xl lg:text-4xl' >
                    {description}
                </span>
                <div className='flex items-center  '>
                    {
                        defaultPoster ? (
                           null
                        ) : (
                            <button onClick={(event) => gotospeceficRoute(category )} className='btn py-2 text-xs sm:text-sm lg:text-xl px-2 '> همین الان خرید کن </button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
