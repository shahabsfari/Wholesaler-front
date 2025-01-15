import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
export default function Sliders() {
  return (
    <div className='w-full min-h-screen auto-rows-min p-4 grid grid-cols-12 py-10 md:py-3'>
      <div className='col-span-12 font-DanaMedium flex justify-start gap-2 child:px-3 text-white child:text-base border-b-2 border-corn-flower child:py-2'>
        <NavLink to="indexSliders" className={({ isActive }) => `${isActive ? "bg-corn-flower rounded-t-lg" : ""}`} >
          اسلایدر ها
        </NavLink>
        <NavLink to="indexPoster" className={({ isActive }) => `${isActive ? "bg-corn-flower rounded-t-lg" : ""}`} >
          پوستر ها
        </NavLink>
      </div>
      <Outlet />
    </div>
  )
}
