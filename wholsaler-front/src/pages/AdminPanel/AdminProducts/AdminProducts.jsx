import React from 'react'
import { Outlet } from 'react-router-dom'
export default function AdminProducts() {

  return (
    <div className='h-full'>
      <Outlet/>
    </div>
  )
}
