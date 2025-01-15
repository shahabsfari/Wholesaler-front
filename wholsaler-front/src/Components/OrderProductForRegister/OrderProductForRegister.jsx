import React from 'react'

export default function OrderProductForRegister({ product, cartItems }) {
    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    return (
        <div className='w-full h-full'>
            {/* product */}
            <div className='w-full flex border-[1px] rounded-lg my-2 border-corn-flower h-full ' >
                {/* image */}
                <div className='relative p-1 flex justify-center items-center '>
                    <span className='absolute top-0 bg-corn-flower rounded-b-lg px-2 py-1 text-white'> {product.count} بسته</span>
                    <img className='w-24' src={product.imageUrl} alt="product" />
                </div>
                {/* details */}
                <div className='flex-1 flex flex-col gap-1 pl-4 py-4' >
                    <div className='w-full font-DanaMedium text-base line-clamp-1'>
                        {product.title}
                    </div>
                    {/* <div className='w-full  flex justify-between items-center'>
                        <span>
                            قیمت مصرف کننده
                        </span>
                        <span className='flex gap-1 items-center'>
                            <span className=''>
                                468,000
                            </span>
                            <span className='text-xs'>
                                تومان
                            </span>
                        </span>
                    </div>
                    <div className='w-full  flex justify-between items-center'>
                        <span>
                            قیمت هر دانه
                        </span>
                        <span className='flex gap-1 items-center'>
                            <span className=''>
                                468,000
                            </span>
                            <span className='text-xs'>
                                تومان
                            </span>
                        </span>
                    </div>
                    <div className='w-full  flex justify-between items-center'>
                        <span>
                            تعداد کالا در هر جعبه
                        </span>
                        <span className='flex gap-1 items-center'>
                            24
                        </span>
                    </div> */}
                    <div className='w-full  flex justify-between items-center'>
                        <span>
                            تعداد انتخابی
                        </span>
                        <span className='flex gap-1 items-center'>
                            {
                                product.count
                            }
                        </span>
                    </div>
                    {
                        product.hasDiscount ? (
                            <>
                                <div className='w-full  flex justify-between items-center'>
                                    <span>
                                        تخفیف
                                    </span>
                                    <span className='flex gap-1 items-center'>
                                        %{
                                            product.discount
                                        }
                                    </span>
                                </div>
                                <div className='w-full  flex justify-between items-center'>
                                    <span>
                                        قیمت هر بسته
                                    </span>
                                    <span className='flex gap-1 items-center'>
                                        {
                                            formatNumber(product.price)
                                        }
                                    </span>
                                </div>
                            </>
                        ) : null
                    }

                    <div className='w-full  flex justify-between items-center'>
                        <span>
                            قیمت هر بسته با تخفیف
                        </span>
                        <span className='flex gap-1 items-center'>
                            <span className=''>
                                {
                                    formatNumber(product.priceWithDiscount)
                                }
                            </span>
                            <span className='text-xs'>
                                تومان
                            </span>
                        </span>
                    </div>
                    <div className='w-full  flex justify-between items-center'>
                        <span>
                            قیمت قابل پرداخت
                        </span>
                        <span className='flex gap-1 items-center'>
                            <span className=''>
                                {
                                    formatNumber(product.count * product.priceWithDiscount)
                                }
                            </span>
                            <span className='text-xs'>
                                تومان
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
