import React, { useState } from 'react'
import Header from '../Header/Header'
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Swal from 'sweetalert2';
export default function SubMenusList({ data, className }) {
    const deleteHandler = () => {
        Swal.fire({
            background: "#30336b",
            color: "white",
            title: "از حذف آن مطمئن هستید ؟",
            text: "قادر به برگردانند آن نیستید !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "بله",
            cancelButtonText: "خیر",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    background: "#30336b",
                    color: "white",
                    title: "پاک شد!",
                    text: " دسته بندی پاک شد!",
                    icon: "success",
                    confirmButtonText: "تایید"
                });
            }
        });
    }

    const [inputValue1, setInputValue1] = useState("")
    const editHandler = async (subMenu) => {
        setInputValue1(subMenu)
        Swal.fire({
            background: "#30336b",
            color: "white",
            title: 'ویرایش زیر منو',
            html: `
               
                    <input id="swal-input1" class="rounded-md h-11 pl-7 bg-transparent border-2  border-[#55555e] outline-none px-3" value="${subMenu}">
                
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'ثبت',
            cancelButtonText: 'لغو',
            cancelButtonColor:"red",
            preConfirm: () => {
                const value1 = Swal.getPopup().querySelector('#swal-input1').value;
                if (!value1) {
                    Swal.showValidationMessage('هر دو مقدار باید پر شوند');
                    return false;
                }

                return { value1 };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                setInputValue1(result.value.value1);
            }
        });
    }
    return (
        <div className={` ${className}`}>
            <div className='' >
                <Header color='[#55555e]' text="زیر منو ها" />
            </div>
            <ul className='w-full  pt-4 space-y-3'>
                {
                    data.map((item, index) => (
                        <li key={index} className=' text-white border-2 h-11 border-[#55555e] rounded-md flex justify-between'>
                            {/* right */}
                            <div className='flex font-DanaMedium gap-x-2 text-xl justify-center items-center'>
                                <span className=' h-full border-l-2 border-[#55555e] w-12 ml-3 flex py-[7px] justify-center items-center' >
                                    {index + 1}
                                </span>
                                <span>
                                    {item}
                                </span>
                            </div>
                            {/* left */}
                            <div className='flex flex-row-reverse gap-x-3 min-h-full items-center pl-2 child:cursor-pointer'>
                                <span onClick={() => deleteHandler()} >
                                    <MdDeleteOutline className='size-8 text-red-600' />
                                </span>
                                <span onClick={() => editHandler(item)} >
                                    <FaRegEdit className='size-7 text-green-600' />
                                </span>
                            </div>
                        </li>
                    ))
                }


            </ul>
        </div>
    )
}
