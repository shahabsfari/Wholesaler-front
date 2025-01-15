import React, { useContext } from 'react'
import SideBar from '../../Components/PAdmin/SideBar/SideBar'
import { Outlet } from 'react-router-dom'
import AuthContext from '../../AuthContext'
export default function AdminPanel() {
  const { user } = useContext(AuthContext)

  if (user !== null) {
    if (user.role == "ADMIN") {
      return (
        <div className='flex  min-h-screen bg-[#383854]' >
          <div>
            <SideBar />
          </div>
          <div className=' w-full md:pr-[200px] min-h-screen bg-[#383854] '>
            <Outlet />
          </div>
        </div>

      )
    }
  } else {
    return (
      <div className='w-full h-screen flex justify-center items-center text-xl md:text-3xl font-DanaDemiBold'>
        شما مجاز به دسترسی به این صفحه نیستید
      </div>
    )
  }

}
