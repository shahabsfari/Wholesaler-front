import React, { useContext, useReducer } from 'react'
import Uploader from '../../../../../Components/PAdmin/Uploader/Uploader'
import InputText from '../../../../../Components/InputText/InputText'
import DropDown from '../../../../../Components/PAdmin/DropDown/DropDown'
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import FileUploadService from '../../../../../Components/ApiFunctions/FileUploadService';
import AuthContext from '../../../../../AuthContext';
import Swal from 'sweetalert2';
const initialState = {
    title: '',
    order: '',
    category: '',
    image: null,
    description: '',
    enable: "فعال",
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_TITLE':
            return { ...state, title: action.payload };
        case 'SET_ORDER':
            return { ...state, order: action.payload };
        case 'SET_IMAGE':
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
export default function DetailsSlider() {

    const { user } = useContext(AuthContext)
    const [state, dispatch] = useReducer(reducer, initialState);

    const navigate = useNavigate();
    const goToSpecificRoute = () => {
        navigate(-1);
    };


    const emptyInput = () => {
        dispatch({ type: 'SET_DESCRIPTION', payload: '' })
        dispatch({ type: 'SET_IMAGE', payload: null })
        dispatch({ type: 'SET_TITLE', payload: '' })
        dispatch({ type: 'SET_ORDER', payload: '' })
        dispatch({ type: 'SET_CATEGORY', payload: '' })
    }

    const handleClick = async () => {
        if (state.image == null || state.title === '' || state.category === '' || state.description === '' || state.enable === '') {
            Swal.fire({ title: 'خطا', text: 'مقادیر نمی‌توانند خالی باشند', icon: 'error', confirmButtonText: 'باشه' });
            console.log(state)
            return
        }
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
            const responseImage = await FileUploadService.uploadFile(state.image, user.token, "image");
            console.log(responseImage)
            if (!responseImage.data.hasError) {
                const apiData = {
                    "title": state.title,
                    "category": state.category,
                    "image": responseImage.data.dataList[0],
                    "description": state.description,
                    "enable": state.enable === "فعال" ? true : false,
                    "itemOrder": state.order,
                }

                try {
                    const response = await fetch('/api/slider', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'token': user.token
                        },
                        body: JSON.stringify({ ...updatedState, image: responseImage.data.dataList[0] })
                    });
                    const data = await response.json();
                    console.log("dasdsd", data)
                    if (data.status === 'SUCCESS') {
                        console.log(data)
                        emptyInput()
                        Swal.fire({
                            title: 'عملیات موفقیت‌آمیز بود!',
                            text: 'رکورد با موفقیت ثبت شد.',
                            icon: 'success',
                            confirmButtonText: 'تاییذ'
                        });
                    } else {
                        console.error('Error:', data.message);
                        Swal.fire({
                            title: 'عملیات نا موفق بود!',
                            icon: 'error',
                            confirmButtonText: 'تاییذ'
                        });
                    }
                } catch (error) {
                    console.error('Request failed', error);
                    Swal.fire({
                        title: 'عملیات ناموفق بود!',
                        icon: 'error',
                        confirmButtonText: 'تاییذ'
                    });
                }
            }

        } catch (error) {
            Swal.fire({
                title: 'عملیات آپلود ناموفق بود!',
                icon: 'error',
                confirmButtonText: 'تاییذ'
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
                <div className=' col-span-12 sm:col-span-8 grid grid-cols-12 gap-y-4 gap-x-3'>
                    <InputText value={state.title} setFunc={(value) => dispatch({ type: 'SET_TITLE', payload: value })} id='0' className='font-Dana  col-span-12 sm:col-span-6 max-h-11' mode='bg-[#383854]' bg="bg-[#383854]" border='border-2 border-[#55555e]' title="اسم" />
                    <InputText value={state.category} setFunc={(value) => dispatch({ type: 'SET_CATEGORY', payload: value })} id='1' className='font-Dana col-span-6 sm:col-span-3 max-h-11' mode='bg-[#383854]' bg="bg-[#383854]" border='border-2 border-[#55555e]' title="کلمه کلیدی"/>
                    {/* <InputText value={state.order} setFunc={(value) => dispatch({ type: 'SET_ORDER', payload: value })} id='2' dir="ltr" inputClassName='text-center' className='font-Dana col-span-6 sm:col-span-3 max-h-11' mode='bg-[#383854]' bg="bg-[#383854]" border='border-2 border-[#55555e]' type='number' title="اولویت" /> */}
                    <DropDown value={state.enable} setFunc={(value) => dispatch({ type: 'SET_ENABLE', payload: value })} classNameList="border-2 border-[#55555e]" title="وضعیت" className="col-span-6 sm:col-span-3 border-2 border-[#55555e]" list={["فعال", "غیر فعال"]} />
                    <Uploader value={state.image === null ? '' : state.image.name} setFunc={(value) => dispatch({ type: 'SET_IMAGE', payload: value })} className="font-Dana col-span-12" />
                </div>
                <div className='relative flex flex-col col-span-12 sm:col-span-4 gap-4'>
                    <span className='absolute right-3 -top-3 px-1 font-Dana bg-[#383854]'>
                        توضیحات
                    </span>
                    <textarea value={state.description} onChange={(e) => dispatch({ type: 'SET_DESCRIPTION', payload: e.target.value })} className='border-2 border-[#55555e] rounded-xl resize-none outline-none h-full py-4 bg-transparent text-white text-justify px-2 font-Dana text-sm w-full' name="" id="">

                    </textarea>
                </div>
                <button onClick={() => handleClick()} className='col-span-12 sm:col-span-2 btn font-Dana' >ثبت اسلاید</button>
            </div>
        </div>
    )
}
