import React from 'react'
import ProductBoxPAdmin from '../ProductBoxPAdmin/ProductBoxPAdmin'
import LoadingSec from '../../LoadingSec/LoadingSec'
export default function ListOfProducts({ fetchProducts, products, productLoading }) {


  return (
    <div className='grid h-full  overflow-y-auto grid-cols-2  sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-10 sm:mx-5 md:mx-2 lg:mx-24 font-Dana mb-5'>
      {
        productLoading ? (
          <div className='flex absolute h-full inset-0 md:pr-40 justify-center items-center'>
            <LoadingSec />
          </div>
        ) : (
          products.length === 0 ? (
            <div className="font-DanaMedium text-white col-span-12 text-xl p-16 md:text-2xl h-full flex justify-center items-center">
              محصولی جهت نمایش وجود ندارد
            </div>
          ) : (
            products.map((product) => (
              <ProductBoxPAdmin
                fetchProducts={fetchProducts}
                key={product.id}
                productData={product}
              />
            ))
          )
        )
      }

    </div>
  )
}
