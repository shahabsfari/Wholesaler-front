import React from 'react'

export default function Header({ color= "zinc-900" ,  text}) {
  return (
    <div className={`w-full  border-b-2 border-${color} font-MorabbaMedium text-xl pt-1 pr-10 md:pr-0  pb-3 text-white`} >
        <span>{text}</span>
    </div>
  )
}
