import React, { useEffect, useState } from 'react'
import TopBarProduct from '../../../../Components/PAdmin/TopBarProduct/TopBarProduct'
import ProductList from '../../../../Components/PAdmin/ProductList/ProductList'
import PaginationButtons from '../../../../Components/PaginationButtons/PaginationButtons'

export default function AdminProductsMain() {

  return (
    <div className='flex gap-y-4 flex-col p-2 md:p-4  h-full md:pt-7'>
      < TopBarProduct />
      <ProductList />
    </div>
  )
}
