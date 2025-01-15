import React, { useContext, useEffect, useReducer } from 'react'
import Uploader from '../../../../../Components/PAdmin/Uploader/Uploader'
import InputText from '../../../../../Components/InputText/InputText'
import DropDown from '../../../../../Components/PAdmin/DropDown/DropDown'
import { FaArrowRightLong } from "react-icons/fa6";
import { useLocation, useNavigate } from 'react-router-dom';
import FileUploadService from '../../../../../Components/ApiFunctions/FileUploadService';
import AuthContext from '../../../../../AuthContext';
import Swal from 'sweetalert2';

const initialState = {
    title: '',
    order: '',
    category: '',
    image: null,
    description: '',
    changeImage: false,
    enable: "فعال",
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_TITLE':
            return { ...state, title: action.payload };
        case 'SET_ORDER':
            return { ...state, order: action.payload };
        case 'SET_IMAGE':
            return { ...state, image: action.payload, changeImage: true };
        case 'SET_IMAGEFIRST':
            return { ...state, image: action.payload };
        case 'SET_DESCRIPTION':
            return { ...state, description: action.payload };
        case 'SET_ENABLE':
            return { ...state, enable: action.payload };
        case 'SET_CATEGORY':
            return { ...state, category: action.payload };
        default:
            return state;
    }
}
export default function EditSliders() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const {user} = useContext(AuthContext)
    const location = useLocation();
    const receivedData = location.state || {};
    console.log("receivedData ", receivedData)

    const setInformation = () => {
        dispatch({ type: "SET_TITLE", payload: receivedData.title })
        dispatch({ type: "SET_ORDER", payload: receivedData.itemOrder })
        dispatch({ type: "SET_DESCRIPTION", payload: receivedData.description })
        dispatch({ type: "SET_ENABLE", payload: receivedData.enable === true ? "فعال" : "غیر فعال" })
        dispatch({ type: "SET_CATEGORY", payload: receivedData.category })
    }

    useEffect(() => {
        setInformation()
    }, [])

    const navigate = useNavigate();
    const goToSpecificRoute = () => {
        navigate(-1);
    };

    const deleteSlider = async (sliderId) => {
        try {
            // نمایش لودینگ SweetAlert
            Swal.fire({
                title: 'در حال حذف...',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            // ارسال درخواست حذف به API
            const response = await fetch(`/api/slider/${sliderId}`, {
                method: 'DELETE',
            });

            // بررسی موفقیت آمیز بودن پاسخ
            if (!response.ok) {
                throw new Error('خطایی رخ داده است');
            }

            const data = await response.json();

            // بررسی وضعیت پاسخ API
            if (data.status === 'SUCCESS' && !data.hasError) {
                Swal.fire({
                    icon: 'success',
                    title: 'موفقیت آمیز!',
                    text: 'اسلایدر با موفقیت حذف شد.',
                });
                goToSpecificRoute()
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'خطا!',
                    text: data.message || 'حذف اسلایدر ناموفق بود.',
                });
            }
        } catch (error) {
            // نمایش پیام خطا
            Swal.fire({
                icon: 'error',
                title: 'خطا!',
                text: error.message || 'خطایی در ارتباط با سرور رخ داده است.',
            });
        }
    };


    const updateSlider = async (sliderId) => {
        // تنظیم مقدار enable
        const updatedState = {
            ...state,
            enable: state.enable === "فعال",
        };
    
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
            if (state.changeImage) {
                const responseImage = await FileUploadService.uploadFile(state.image, user.token, "image");
                if (!responseImage.data.hasError) {
                    try {
                        Swal.fire({
                            title: 'در حال بروزرسانی...',
                            allowOutsideClick: false,
                            didOpen: () => {
                                Swal.showLoading();
                            },
                        });
    
                        const response = await fetch(`/api/slider/${sliderId}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ ...updatedState, image: responseImage.data.dataList[0] }),
                        });
    
                        if (!response.ok) {
                            throw new Error('خطایی رخ داده است');
                        }
    
                        const data = await response.json();
                        // console.log( "image change",data)
                        if (!data.hasError) {
                            Swal.fire({
                                icon: 'success',
                                title: 'موفقیت آمیز!',
                                text: 'اسلایدر با موفقیت بروزرسانی شد.',
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'خطا!',
                                text: data.message || 'بروزرسانی اسلایدر ناموفق بود.',
                            });
                        }
                    } catch (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'خطا!',
                            text: error.message || 'خطایی در ارتباط با سرور رخ داده است.',
                        });
                    }
                }
            } else {
                try {
                    Swal.fire({
                        title: 'در حال بروزرسانی...',
                        allowOutsideClick: false,
                        didOpen: () => {
                            Swal.showLoading();
                        },
                    });
    
                    const response = await fetch(`/api/slider/${sliderId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updatedState),
                    });
    
                    if (!response.ok) {
                        throw new Error('خطایی رخ داده است');
                    }
    
                    const data = await response.json();
                    // console.log( "not change",data)
                    if (!data.hasError) {
                        Swal.fire({
                            icon: 'success',
                            title: 'موفقیت آمیز!',
                            text: 'اسلایدر با موفقیت بروزرسانی شد.',
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'خطا!',
                            text: data.message || 'بروزرسانی اسلایدر ناموفق بود.',
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'خطا!',
                        text: error.message || 'خطایی در ارتباط با سرور رخ داده است.',
                    });
                }
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'خطا!',
                text: error.message || 'خطایی در ارتباط با سرور رخ داده است.',
            });
        }
    };
    

    return (
        <div className='text-white col-span-12 flex flex-col py-2'>
            <div className='col-span-12 font-Dana mb-5'>
                <span onClick={() => goToSpecificRoute()} className='flex items-center gap-1 cursor-pointer'>
                    <FaArrowRightLong size={22} />
                    <span className='text-xl'>برگشت</span>
                </span>
            </div>
            <div className='w-full grid grid-cols-12 gap-3 '>
                <div className='col-span-12 sm:col-span-8 grid grid-cols-12 gap-y-4 gap-x-3'>
                    <InputText value={state.title} setFunc={(value) => dispatch({ type: 'SET_TITLE', payload: value })} id='0' className='font-Dana  col-span-12 sm:col-span-6 max-h-11' mode='bg-[#383854]' bg="bg-[#383854]" border='border-2 border-[#55555e]' title="اسم" />
                    <InputText value={state.category} setFunc={(value) => dispatch({ type: 'SET_CATEGORY', payload: value })} id='1' className='font-Dana  col-span-6 sm:col-span-3 max-h-11' mode='bg-[#383854]' bg="bg-[#383854]" border='border-2 border-[#55555e]' title="کلمه کلیدی" />
                    {/* <InputText value={state.order} setFunc={(value) => dispatch({ type: 'SET_ORDER', payload: value })} id='2' dir="ltr" inputClassName='text-center' className='font-Dana  col-span-6 sm:col-span-3 max-h-11' mode='bg-[#383854]' bg="bg-[#383854]" border='border-2 border-[#55555e]' type='number' title="اولویت" /> */}
                    <DropDown value={state.enable} setFunc={(value) => dispatch({ type: 'SET_ENABLE', payload: value })} classNameList="border-2 border-[#55555e]" title="وضعیت" className=" col-span-6 sm:col-span-3 border-2 border-[#55555e]" list={["فعال", "غیر فعال"]} />
                    <Uploader value={state.image === null ? receivedData.image : state.image.name} setFunc={(value) => dispatch({ type: 'SET_IMAGE', payload: value })} className="font-Dana col-span-12" />
                </div>
                <div className='relative flex flex-col col-span-12 sm:col-span-4 gap-4'>
                    <span className='absolute right-3 -top-3 px-1 font-Dana bg-[#383854]'>
                        توضیحات
                    </span>
                    <textarea value={state.description} onChange={(e) => dispatch({ type: 'SET_DESCRIPTION', payload: e.target.value })} className='border-2 border-[#55555e] rounded-xl resize-none outline-none h-full py-4 bg-transparent text-white text-justify px-2 font-Dana text-sm w-full' name="" id="">
                    
                    </textarea>
                </div>
                <button onClick={() => deleteSlider(receivedData.id)} className=' col-span-6 sm:col-span-2 btn font-Dana bg-red-500' >حذف اسلایدر</button>
                <button onClick={() => updateSlider(receivedData.id)} className=' col-span-6 sm:col-span-2 btn font-Dana' >ثبت تغیرات</button>
            </div>
        </div>
    )
}
