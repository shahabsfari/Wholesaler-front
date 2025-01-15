import React, { useContext, useEffect, useState } from 'react'
import { GoPlus } from "react-icons/go";
import AuthContext from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import LoadingSec from '../LoadingSec/LoadingSec';
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";
import Swal from 'sweetalert2';
export default function ProductBox({ title, id, exist, count, discount, price, description, priceWithDiscount, hasDiscount, image, enable, categoryId, brandId }) {
    const [imageUrl, setImageUrl] = useState('')
    const [isImageLoading, setIsImageLoading] = useState(true);
    const [isImageVisible, setIsImageVisible] = useState(false);
    const [error, setError] = useState('')

    const { user, addToCart, increaseQuantity, isProductInCart, cartItems, isLoggedIn } = useContext(AuthContext)

    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const doesIdExist = (array, id) => {
        let result;
        if (isLoggedIn) {
            result = array.some((item) => item.productId === id);
        } else {
            result = array.some((item) => item.id === id);
        }
        return result
    }



    const navigate = useNavigate();

    const goToSpecificRoute = () => {
        navigate("/productInfo", { state: id });
    };

    useEffect(() => {
        const fetchImage = async () => {
            try {
                setIsImageLoading(true)
                const data = await fetch(`/api/filehandler/files/${image}`);
                // const data = await response.json();
                // console.log("data : " , data)
                // console.log("title : " , title ,  " categoryId : "  , categoryId )
                if (data.status === 200) {
                    setImageUrl(data.url);
                } else {
                    setImageUrl("/images/products/defult-image.webp");
                    setError(data.message || 'Failed to fetch brands');
                }
            } catch (error) {
                setError('Error fetching brands');
                console.error(error);
            } finally {
                setIsImageLoading(false); // وقتی درخواست کامل شد، لودینگ متوقف می‌شود
            }
        };

        fetchImage();
    }, [id]);

    const isProductInStock = (cartItems, productId) => {
        console.log(cartItems)
        const product = cartItems.filter(item => item.id === productId && item.stock > 0);
        return product.length > 0;
    };

    // console.log("cartItems", cartItems)

    const addHandler = () => {
        if (isLoggedIn) {
            if (isProductInCart(id)) {
                // console.log("product dakhel sabad hast az ghabl")
                increaseQuantity(id, count)
            } else {
                // console.log("not exsist in bag")
                console.log(isProductInStock(cartItems, id))
                if (count <= 0) {
                    Swal.fire({
                        icon: 'error',
                        title: 'موجودی کافی نیست!',
                        text: `موجودی کافی ندارد.`,
                        confirmButtonText: 'باشه',
                    });
                    return;
                }
                addToCart({ title, id, exist, count , discount, price, description, priceWithDiscount, hasDiscount, image, enable, categoryId, brandId })
            }
        } else {
            console.log("not logged")
            if (isProductInCart(id, "LOCAL")) {
                // console.log("product dakhel sabad hast az ghabl")
                increaseQuantity(id, count)
            } else {
                if (count <= 0) {
                    Swal.fire({
                        icon: 'error',
                        title: 'موجودی کافی نیست!',
                        text: `موجودی کافی ندارد.`,
                        confirmButtonText: 'باشه',
                    });
                    return;
                }
                // console.log("not exsist in bag")
                addToCart({ title, id, exist, stock:count , discount, price, description, priceWithDiscount, hasDiscount, image, enable, categoryId, brandId })
            }
        }

    }

    return (
        <div className='relative w-full cursor-pointer  h-[232px] md:h-[280px] p-2 sm:px-2  bg-white  rounded-2xl flex flex-col items-center'>
            {/* <span className='absolute bg-corn-flower text-white right-0 top-0 min-w-12 pt-1 rounded-bl-xl rounded-tr-xl text-center '>{number}</span> */}
            <div onClick={goToSpecificRoute} className=' min-h-[120px]  max-h-[120px] md:min-w-[144px] md:min-h-[144px] overflow-hidden size-[120px] md:size-36 p-1 flex justify-center items-center'>
                {(isImageLoading || !isImageVisible) && (
                    <LoadingSec />
                )}
                <img
                    onLoad={() => setIsImageVisible(true)}
                    src={imageUrl}
                    alt="product"
                    onError={() => setError('Failed to load image')}
                    style={{
                        display: isImageVisible ? 'block' : 'none',
                        opacity: isImageVisible ? 1 : 0,
                        transition: 'opacity 0.2s ease-in-out',
                    }}
                />
            </div>
            <div className='flex flex-col  justify-between h-full w-full   '>
                <div className="w-full h-fit text-xs md:text-base text-start overflow-hidden text-ellipsis line-clamp-2">
                    {title}
                </div>
                {
                    exist && count !== 0 ? (
                        <div className='flex w-full justify-between mt-3 ' >
                            <div className='px-1 flex flex-col items-center justify-center gap-y-1'>
                                {
                                    hasDiscount ? (
                                        <span className='text-base' >
                                            {discount}%
                                        </span>
                                    ) : (
                                        <span className='opacity-0 text-base' >
                                            0%
                                        </span>
                                    )
                                }
                                {
                                    doesIdExist(cartItems, id) ? (
                                        <span className=' cursor-pointer w-fit p-px  transition-all hover:scale-125 rounded-full text-green-600'>
                                            <IoIosCheckmarkCircleOutline size={25} />
                                        </span>
                                    ) : (
                                        <span onClick={() => addHandler()} className=' cursor-pointer w-fit p-px transition-all hover:scale-125 hover:border-green-700 rounded-full hover:text-green-700' >
                                            <IoIosAddCircleOutline size={27} />
                                        </span>
                                    )
                                }
                            </div>
                            <div className='flex flex-col items-end'>
                                {
                                    hasDiscount ? (
                                        <span className='relative text-zinc-500 w-fit' >
                                            <span className='absolute w-full my-auto top-0 bottom-0 max-h-px bg-black/40'></span>
                                            <span className='text-[14px]' >{formatNumber(price)}</span><span className='text-[10px]'>تومان</span>
                                        </span>
                                    ) : (
                                        <span className='relative opacity-0 text-zinc-500 w-fit' >
                                            <span className='absolute w-full my-auto top-0 bottom-0 max-h-px bg-black'></span>
                                            <span className='text-[10px]' >{formatNumber(priceWithDiscount)}</span><span className='text-[8px]'>تومان</span>
                                        </span>
                                    )
                                }
                                <span className='flex gap-x-1'>
                                    <span className='font-DanaDemiBold text-[12px] md:text-[16px] '>{formatNumber(priceWithDiscount)}</span><span className='text-[10px] md:text-sm translate-y-[1px]' >تومان</span>
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className='w-full flex-1 h-full flex justify-center items-end' >
                            <span className='p-2 w-full rounded-tr-lg rounded-bl-lg border-2 text-center text-base border-red-300 '> ناموجود</span>
                        </div>
                    )
                }

            </div>
        </div>
    )
}
