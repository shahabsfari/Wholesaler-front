import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../AuthContext'
export default function Product({ productData, isInCartItems }) {
    const { addToCart } = useContext(AuthContext)
    const [image, setImage] = useState('')
    const [loadingFetch, setLoadingFetch] = useState(true)
    const [error, setError] = useState('')
    const [featureList, setFeatureList] = useState([])
    const featureChangeHandle = () => {
        const list = productData.description.split('\n').filter(line => line.trim() !== '')
        setFeatureList(list)
    }
    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    console.log("svsvv", productData.count === 0)
    useEffect(() => {
        const fetchImage = async () => {
            setLoadingFetch(true)
            try {
                const data = await fetch(`/api/filehandler/files/${productData.image}`);
                // const data = await response.json();
                if (data.status === 200) {
                    setImage(data.url);
                    setLoadingFetch(false)
                } else {
                    setError(data.message || 'Failed to fetch brands');
                    setLoadingFetch(false)
                }
            } catch (error) {
                setError('Error fetching brands');
                console.error(error);
            }
        };
        fetchImage()
        featureChangeHandle()
    }, [productData])

    return (
        <div className='custome-container md:px-5 '>
            <div className='grid grid-cols-12 text-dana border-[1px] border-corn-flower/50   p-1 md:p-5 rounded-xl'>
                {/* image */}
                <div className='p-9 md:p-1 col-span-12 md:col-span-3 flex justify-center items-center '>
                    <img className='' src={image} alt={productData.image} />
                </div>
                {/* title and numOfPack , feature*/}
                <div className='col-span-12 md:col-span-9 lg:col-span-6 flex flex-col gap-2 '>
                    {/* title and numPack  */}
                    <div className=' relative flex items-center gap-3 text-base' >
                        {/* <span className=' absolute right-0 top-0 btn p-1 px-2 text-sm'>
                            ۲۴ عدد
                        </span> */}
                        {/* style={{ textIndent: "4rem" }} */}
                        <span className='text-xl' >
                            {
                                productData.title
                            }
                        </span>
                    </div>
                    {/* brand and feature */}
                    <div>
                        {/* brand */}
                        <div className='flex items-center text-base' >
                            <span className=' pr-1 pl-2'>
                                برند :
                            </span>
                            <span className='text-blue-800'>
                                {
                                    productData.brandTitle
                                }
                            </span>
                        </div>
                        {/* feature */}
                        <ul className='list-disc pr-5 text-base flex flex-col gap-1'>
                            {
                                featureList.map((item, index) => (
                                    <li key={index} >
                                        {item}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                {/* discount , addItem , price , ... */}
                <div className='col-span-12 lg:col-span-3 mt-5 lg:mt-o flex flex-col lg:items-end justify-between  '>
                    <div className={`${ (!productData.exist) || (productData.count === 0)  ? "opacity-0" : "grid" }  lg:flex lg:flex-col  grid-cols-2 gap-3 items-start lg:items-end px-1 lg:px-0`}>
                        {/* discount , oldPrice */}

                        <div className={`${productData.hasDiscount ? "" : "hidden"} order-last lg:order-first flex justify-end lg:justify-center items-center gap-2 `}>
                            {/* oldPrice */}
                            <span className='relative text-sm lg:text-xl text-gray-500' >
                                <span className='absolute top-[50%] border-t-2 w-full h-[1px] border-blue-700/60 ' > </span>
                                <span className='px-2'>
                                    {
                                        formatNumber(productData.price)
                                    }
                                </span>
                            </span>
                            {/* discount */}
                            <span className='btn text-base lg:text-xl px-1 lg:px-2 lg:pt-2 py-1 lg:pb-1'>
                                {
                                    productData.discount
                                }%-
                            </span>
                        </div>
                        {/* price and price of each*/}
                        <div className= {`flex flex-col`}>
                            {/* price */}
                            <div className='flex gap-1 items-center text-xl lg:text-4xl font-DanaDemiBold lg:justify-end '>
                                <span>
                                    {
                                        formatNumber(productData.priceWithDiscount)
                                    }
                                </span>
                                <span className='text-base' >
                                    تومان
                                </span>
                            </div>
                            {/* price of each */}
                            {/* <div  className='flex opacity-0 gap-1 text-sm items-center'>
                                <span>
                                    قیمت هر عدد
                                </span>
                                <div className='flex items-center gap-1'>
                                    <span className='text-base lg:text-xl font-DanaMedium'>
                                        1,200
                                    </span>
                                    <span className='text-sm'>
                                        تومان
                                    </span>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    {/* button */}
                    <div className='w-full lg:w-auto mt-4'>
                        {
                            (!productData.exist) || productData.count === 0  ? (
                                <button className='btn px-5 py-3 w-full md:w-[160px] bg-transparent border-red-600  border-2 text-black cursor-default'>ناموجود</button>
                            ) : (
                                isInCartItems ? (
                                    <button className='btn px-5 py-3 w-full bg-transparent border-corn-flower border-2 text-black cursor-default'>به سبد خرید اضافه شد</button>
                                ) :
                                    (
                                        <button onClick={() => addToCart({ ...productData })} className='btn px-5 py-3 w-full'> افزودن به سبد خرید</button>
                                    )
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
