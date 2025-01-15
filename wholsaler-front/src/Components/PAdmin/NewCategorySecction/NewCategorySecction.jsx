import React, { useState } from 'react'
import Header from '../Header/Header'
import { CiImageOn } from "react-icons/ci";
import Uploader from '../Uploader/Uploader'
import InputText from '../../InputText/InputText';
import FileUploadService from '../../ApiFunctions/FileUploadService';
import Swal from "sweetalert2";
export default function NewCategorySecction({ setUpdate, user, className }) {

    const [name, setName] = useState('');
    const [image, setImage] = useState('');

    const handleClick = async () => {
        if (image === '' || name === '') {
            Swal.fire({
                title: "خطا!",
                text: "مقادیر نمیتوانند خالی باشند",
                icon: "error",
                confirmButtonText: "تلاش مجدد",
            });
            return
        }

        Swal.fire({
            title: "در حال ارسال...",
            text: "لطفاً کمی صبر کنید",
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });


        try {
            const responseImage = await FileUploadService.uploadFile(image, user.token, "image");
            if (!responseImage.data.hasError) {
                const categoryData = {
                    title: name,
                    description: name,
                    enable: true,
                    image: responseImage.data.dataList[0],
                };

                try {
                    const response = await fetch('/api/product-category', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'token': user.token
                        },
                        body: JSON.stringify(categoryData),
                    });
                    const data = await response.json();
                    console.log(data)
                    if (data.status === 'SUCCESS') {
                        console.log(data)
                        setName('')
                        setImage('')
                        setUpdate()
                        Swal.fire({
                            title: "موفقیت‌آمیز!",
                            text: "دسته‌بندی با موفقیت اضافه شد.",
                            icon: "success",
                            confirmButtonText: "باشه",
                        });
                    } else {
                        console.error('Error:', data.message);
                        Swal.fire({
                            title: "خطا!",
                            text: data.message || "افزودن دسته‌بندی ناموفق بود.",
                            icon: "error",
                            confirmButtonText: "تلاش مجدد",
                        });
                    }
                } catch (error) {
                    console.error('Request failed', error);
                    Swal.fire({
                        title: "خطا!",
                        text: "افزودن عکس دسته‌بندی ناموفق بود.",
                        icon: "error",
                        confirmButtonText: "تلاش مجدد",
                    });
                }

            }

        } catch (error) {

        }


    };

    return (
        <div className={className}>
            <div className='sm:px-2 col-span-12 pb-2 mb-4 mt-4 sm:mt-0'>
                <div className='px-4 sm:px-0'>
                    <div className={`w-full  border-b-2 border-[#55555e] font-MorabbaMedium text-xl pt-1 pr-0 md:pr-0  pb-3 text-white`} >
                        <span>
                            افزودن دسته بندی جدید
                        </span>
                    </div>
                </div>
            </div>
            <div className='col-span-12 grid grid-cols-12 gap-4 sm:gap-3  px-5 sm:px-0'>
                <div className='flex justify-center col-span-12 sm:col-span-6 lg:col-span-5  items-center'>
                    <InputText mode="bg-[#383854]" setFunc={(name) => setName(name)} value={name} bg="bg-[#383854]" title="اسم دسته بندی" border="border-2 border-[#55555e]" className='font-Dana w-full max-h-11 text-white' />
                </div>
                <Uploader value={image === '' ? '' : image.name} setFunc={(image) => setImage(image)} className="col-span-12 sm:col-span-6 lg:col-span-5" />
                <div className='py-3 col-span-12 lg:col-span-2 flex items-center max-h-11  ' >
                    <button onClick={() => handleClick()} className='w-full transition-all duration-300 hover:bg-green-700 rounded-md h-11 font-DanaMedium text-base bg-green-300' >
                        ثبت
                    </button>
                </div>
            </div>
        </div>
    )
}
