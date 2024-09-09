import React from 'react'
import SideBar from '../../Components/PAdmin/SideBar/SideBar'
import { Outlet } from 'react-router-dom'

export default function AdminPanel() {
  return (
    <div className='flex' >
      <div>
        <SideBar />
      </div>
      <div className=' w-full min-h-4000 md:pr-[200px]  pt-2 md:pt-6  min-h-screen bg-[#383854] '>
        <Outlet />
      </div>
    </div>

  )
}
