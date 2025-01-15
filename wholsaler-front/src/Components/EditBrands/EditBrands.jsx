import React, { useEffect, useState } from 'react'
import Header from '../PAdmin/Header/Header';
import { CiImageOn } from "react-icons/ci";
import InputText from '../InputText/InputText';
import FileUploadService from '../ApiFunctions/FileUploadService';
import Swal from 'sweetalert2';
export default function EditBrands({ setUpdate, onClose, data, className, user }) {

    const [name, setName] = useState(data.brandName);
    const [image, setImage] = useState(data.image);
    const [imageChange, setImageChange] = useState(false);

    useEffect(() => {
        setName(data.brandName)
        setImage(data.image)
    }, [data])

    const imageHandler = (e) => {
        if (e.target.files.length > 0) {
            setImage(e.target.files[0])
            setImageChange(true)
        }
    }

    const handleClick = async () => {
        if (image === '' || name === '') {
            alert("مقادیر نمیتوانند خالی باشند")
            return
        }


        if (imageChange) {
            try {
                const responseImage = await FileUploadService.uploadFile(image, user.token, "image");
                if (!responseImage.data.hasError) {
                    const updatedBrand = {
                        id: data.id,
                        name: name,
                        image: responseImage.data.dataList[0],
                    };

                    try {
                        const response = await fetch(`/api/brand/${data.id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(updatedBrand),
                        });

                        const result = await response.json();
                        if (result.status === 'SUCCESS' && !result.hasError) {
                            Swal.fire("موفقیت", "برند با موفقیت به‌روزرسانی شد.", "success");
                            setUpdate()
                            onClose(); 
                        } else {
                            Swal.fire("خطا", result.message || "به‌روزرسانی برند موفقیت‌آمیز نبود.", "error");
                        }
                    } catch (error) {
                        Swal.fire("خطا", "مشکلی در برقراری ارتباط با سرور به وجود آمده است.", "error");
                    }

                }

            } catch (error) {
                Swal.fire("خطا", "مشکلی در برقراری ارتباط با سرور به وجود آمده است.", "error");
            }
        } else {
            const updatedBrand = {
                id: data.id,
                name: name,
            };
            try {
                const response = await fetch(`/api/brand/${data.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedBrand),
                });

                const result = await response.json();
                if (result.status === 'SUCCESS' && !result.hasError) {
                    Swal.fire("موفقیت", "برند با موفقیت به‌روزرسانی شد.", "success");
                    setUpdate()
                    onClose(); 
                } else {
                    Swal.fire("خطا", result.message || "به‌روزرسانی برند موفقیت‌آمیز نبود.", "error");
                }
            } catch (error) {
                Swal.fire("خطا", "مشکلی در برقراری ارتباط با سرور به وجود آمده است.", "error");
            }
        }



    };


    return (
        <div className={`${className} w-[370px] sm:w-[450px] `}>
            <div className='sm:px-2'>
                <div className={`w-full   border-b-2 border-[#55555e] font-MorabbaMedium text-xl pt-1 pr-0 md:pr-0  pb-3 text-white`} >
                    <span>
                        ویرایش برند
                    </span>
                </div>
            </div>

            <InputText
                value={name}
                className="font-Dana mt-2 max-h-11 text-white "
                mode="bg-corn-flower rounded-md"
                setFunc={(name) => setName(name)}
                bg="bg-transparent text-white"
                title="اسم برند"
                border="border-2 border-[#55555e]"
            />

            < div className={`min-h-11 flex items-center gap-2 `}>
                <div dir="ltr" className='relative w-full flex justify-between items-center pr-2 rounded-md h-11 bg-transparent border-2  border-[#55555e]'>
                    <input onChange={(e) => imageHandler(e)} id="imageMainCategory" className='opacity-0 absolute text-white text-base text-center font-Dana outline-none px-2 rounded-md h-9 bg-transparent border-2  border-[#1d1d2d]' type="file" accept='image/*' />
                    <span className={`absolute text-white bg-corn-flower right-3 -top-3 font-Dana rounded-md px-2 py-px`}  >انتخاب تصویر</span>
                    <label htmlFor="imageMainCategory" className='flex justify-center items-center cursor-pointer'>
                        <CiImageOn className='size-7 text-white' />
                    </label>
                    <span className='font-Dana text-white items-center flex justify-center text-sm lg:text-xs xl:text-sm overflow-hidden '> {typeof image === 'string' ? image : image.name} </span>
                </div>
            </div >

            <div className='' >
                <button onClick={() => handleClick()} className='w-full min-h-11 transition-all duration-300 hover:bg-green-700 rounded-md h-9 font-DanaMedium text-base bg-green-300' >
                    ثبت
                </button>
            </div>
        </div>
    )
}
