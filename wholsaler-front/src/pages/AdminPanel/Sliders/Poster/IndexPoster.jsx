import React from 'react'
import { Outlet } from 'react-router-dom'

export default function IndexPoster() {
  return (
    <div className='w-full col-span-12 grid grid-cols-12 '>
        <Outlet />
    </div>
  )
}
