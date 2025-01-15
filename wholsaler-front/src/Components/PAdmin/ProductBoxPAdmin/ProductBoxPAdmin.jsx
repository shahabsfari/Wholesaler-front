import React, { useContext, useEffect, useState } from 'react'
import { RiDeleteBin5Line } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import Swal from 'sweetalert2';
import AuthContext from '../../../AuthContext';
import { useNavigate } from 'react-router-dom';
export default function ProductBoxPAdmin({ fetchProducts, productData: { title, count, id, exist, discount, price, description, priceWithDiscount, hasDiscount, image, enable, categoryId, brandId } }) {

    const { user } = useContext(AuthContext)
    const [imageUrl, setImageUrl] = useState('')
    const [error, setError] = useState('')
    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const data = await fetch(  `/api/filehandler/files/${image}`);
                // const data = await response.json();
                if (data.status === 200) {
                    setImageUrl(data.url);
                } else {
                    setError(data.message || 'Failed to fetch brands');
                }
            } catch (error) {
                setError('Error fetching brands');
                console.error(error);
            }
        };

        fetchImage();
    }, []);
    
    const navigate = useNavigate();
    const goToSpecificRoute = () => {
        navigate('/p-admin/adminProducts/editProduct' , { state: { title, id, count, exist, discount, price, description, priceWithDiscount, hasDiscount, imageName:image, enable, categoryId, brandId } }); // مسیر مورد نظر را اینجا قرار دهید
    };

    const deleteProduct = async () => {
        const result = await Swal.fire({
            title: 'آیا مطمئن هستید؟',
            text: 'این عمل قابل بازگشت نیست!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'بله، حذف کن',
            cancelButtonText: 'لغو',
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(  `/api/product/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });

                console.log(response)
                const data = await response.json();
                console.log(data)

                if (data.status === 'SUCCESS') {
                    fetchProducts()
                    Swal.fire('موفق!', data.message, 'success');
                } else {
                    Swal.fire('ناموفق', 'حذف محصول با مشکل مواجه شد', 'error');
                }
            } catch (error) {
                Swal.fire('خطا', 'مشکلی در سرور رخ داده است', 'error');
            }
        }
    };
    return (
        <div className='relative md:h-[280px] p-2 sm:p-3  bg-white  rounded-2xl flex flex-col items-center'>
            {/* <span className='absolute flex justify-center items-center bg-corn-flower text-white right-0 top-0 min-w-16 pt-1 rounded-bl-xl rounded-tr-xl  text-base '>{number + " " + unit}</span> */}
            <span className='absolute p-1 flex gap-1 justify-center items-center top-0 left-0' >
                <button onClick={()=> goToSpecificRoute()} className='bg-blue-400 rounded-lg p-1' >
                    <TbEdit className='size-7' />
                </button>
                <button onClick={() => deleteProduct()} className='bg-blue-400 rounded-lg p-1' >
                    <RiDeleteBin5Line className='size-7' />
                </button>
            </span>
            <div className=' min-w-[120px] min-h-[150px] max-h-[150px] overflow-hidden max-w-[120px] size-[120px] md:size-36 flex justify-center items-center'>
                <img src={imageUrl} alt="pro" />
            </div>
            <div className='flex flex-col justify-between h-full w-full  '>
                <div className='w-full  text-xs  md:text-base text-start line-clamp-2 '>
                    {title}
                </div>
                <div className='flex justify-between mt-3 ' >
                    <div className='px-1 flex flex-col items-center justify-center gap-y-1'>
                        <span className='text-xl' >
                            {discount}%
                        </span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='relative text-zinc-500 w-fit' >
                            <span className='absolute w-full my-auto top-0 bottom-0 max-h-px bg-black'></span>
                            <span className='text-[14px]' >{formatNumber(price)}</span><span className='text-[12px]'>تومان</span>
                        </span>
                        <span className='flex gap-x-1 items-center'>
                            <span className='font-DanaDemiBold text-[12px] md:text-[18px] '>{formatNumber(priceWithDiscount)}</span><span className='text-[10px] md:text-[12px] translate-y-[1px]' >تومان</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
