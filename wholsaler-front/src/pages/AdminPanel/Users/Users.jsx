import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Users() {
    return (
        <div className='flex h-full  max-h-screen overflow-hidden gap-y-4 flex-col ' >
            {/* topbar */}
            <Outlet/>
        </div>
    )
}
