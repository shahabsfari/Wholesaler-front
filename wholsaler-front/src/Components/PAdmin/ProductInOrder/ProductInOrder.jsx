import React from 'react'

export default function ProductInOrder({ data, src, title, number, numOfPack, consumerPrice, className, clasNameSpan = 'text-black' }) {
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  console.log( "ddd ",data)
  return (
    <div className={` ${className} col-span-12 flex gap-x-3 border-[1px] min-h-[130px] rounded-lg border-blue-400/50 p-1 font-Dana`}>
      {/* image and numOfPack */}
      <div className='bg-white sm:bg-transparent rounded-lg' >
        <div className='relative bg-white rounded-xl md:min-w-[112px]'>
          <img className='size-28 rounded-lg' src={data.imageName} alt="product" />
          <span className={`absolute left-1 bottom-0 ${clasNameSpan}`}  > {data.count} </span>
        </div>
      </div>

      <div className='flex flex-col justify-between'>
        <div>
          {/* title */}
          <div>
            {data.productDetails.title}
          </div>

          {/* feature */}
          <div className='flex flex-col text-sm mt-2'>
            <div>
              {
                data.productDetails.hasDiscount ? (
                  <div className='flex gap-x-5 '>
                    <span>
                      تخفیف :
                    </span>
                    <span>
                      %{data.productDetails.discount}
                    </span>
                  </div>
                ) : null
              }
              <div className='flex gap-x-5'>
                <span>
                  قیمت  هر بسته :
                </span>
                <span>
                  {formatNumber(data.productDetails.priceWithDiscount)}
                  <span className='pr-1'>
                    تومان
                  </span>
                </span>
              </div>
            </div>

          </div>
        </div>
        <div className='flex gap-1 items-center mt-5' >
          <span className='font-DanaDemiBold text-xl'>
            {formatNumber(data.count * data.productDetails.priceWithDiscount)}
          </span>
          <span className='text-sm'>
            تومان
          </span>
        </div>
      </div>
    </div>
  )
}
