import React from 'react'

export default function Header({text}) {
  return (
    <div className='w-full   border-b-2 border-zinc-900 font-MorabbaMedium text-xl pt-1 pr-10 md:pr-5  pb-2 text-white' >
        <span>{text}</span>

    </div>
  )
}
