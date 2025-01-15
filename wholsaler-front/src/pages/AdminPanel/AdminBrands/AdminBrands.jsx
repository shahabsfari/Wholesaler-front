import React, { useContext, useState } from 'react'
import AddNewBrand from '../../../Components/PAdmin/AddNewBrand/AddNewBrand'
import BrandsListInPAdmin from '../../../Components/BrandsListInPAdmin/BrandsListInPAdmin'
import AuthContext from '../../../AuthContext'
import LoadingSec from '../../../Components/LoadingSec/LoadingSec'
export default function AdminBrands() {
  const [update, setUpdate] = useState(0)
  const { loading, user } = useContext(AuthContext)
  if (loading) {
    return (
      <div className='flex absolute h-full inset-0 md:pr-40 justify-center items-center'>
        <LoadingSec />
      </div>
    )
  }

  return (
    <div className='flex flex-col w-full p-5 h-full'>
      <AddNewBrand setUpdate={() => setUpdate(prev => prev + 1)} user={user} />
      <div className='flex-1 '>
        <BrandsListInPAdmin setUpdate={() => setUpdate(prev => prev + 1)} update={update} user={user} />
      </div>
    </div>
  )
}
