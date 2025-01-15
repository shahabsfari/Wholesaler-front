import React, { useContext, useState } from 'react'
import NewCategorySecction from '../../../Components/PAdmin/NewCategorySecction/NewCategorySecction'
import NewSubCategory from '../../../Components/PAdmin/NewSubCategory/NewSubCategory'
import CategoryList from '../../../Components/PAdmin/CategoryList/CategoryList'
import LoadingSec from '../../../Components/LoadingSec/LoadingSec'
import AuthContext from '../../../AuthContext'
export default function Categories() {

  const { loading, user } = useContext(AuthContext)

  const [update, setUpdate] = useState(0)

  if (loading) {
    return (
      <div className='flex absolute h-full inset-0 md:pr-40 justify-center items-center'>
        <LoadingSec />
      </div>
    )
  }
  return (
    <div className='pt-6  md:pt-5 min-h-screen max-h-screen h-full overflow-y-auto  justify-start flex flex-col '>
      <NewCategorySecction setUpdate={() => setUpdate(prev => prev + 1)} user={user} className="w-full sm:px-5 gap-2  grid grid-cols-12" />
      <div className='flex-1 h-full' >
        <CategoryList update={update} setUpdate={() => setUpdate(prev => prev + 1)} user={user} />
      </div>
    </div>
  )
}
