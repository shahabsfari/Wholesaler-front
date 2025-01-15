import React, { useContext, useEffect, useReducer, useState } from 'react'
import { CiImageOn } from "react-icons/ci";
import DropDown from '../../../../Components/PAdmin/DropDown/DropDown';
import InputeNum from '../../../../Components/PAdmin/InputeNum/InputeNum';
import AddFeatureItem from '../../../../Components/PAdmin/AddFeatureItem/AddFeatureItem';
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../../AuthContext';
import Uploader from '../../../../Components/PAdmin/Uploader/Uploader';
import FileUploadService from '../../../../Components/ApiFunctions/FileUploadService';
import LoadingSec from '../../../../Components/LoadingSec/LoadingSec';
import Swal from 'sweetalert2';


const initialState = {
    productName: '',
    stock: 0,
    price: '',
    payablePrice: '',
    discount: '',
    category: '',
    subcategory: '',
    brand: '',
    image: '',
    imageName: '',
    description: '',
    features: [],
    status: "موجود",
    enable: "فعال",
    exist: "موجود",
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_PRODUCT_NAME':
            return { ...state, productName: action.payload };
        case 'SET_STOCK':
            return { ...state, stock: action.payload };
        case 'SET_IMAGE_NAME':
            return { ...state, imageName: action.payload };
        case 'SET_PRICE':
            const updatedPrice = parseFloat(action.payload) || 0;
            return {
                ...state,
                price: updatedPrice,
                payablePrice: updatedPrice - (updatedPrice * state.discount) / 100,
            };
        case 'SET_DISCOUNT':
            // console.log( "diss" , action.payload)
            const updatedDiscount = action.payload || 0
            return {
                ...state,
                discount: updatedDiscount,
                payablePrice: state.price - (state.price * updatedDiscount) / 100,
            };
        case 'SET_PAYABLE_PRICE':
            return { ...state, payablePrice: action.payload };
        case 'SET_CATEGORY':
            return {
                ...state,
                category: state.category === action.payload ? "" : action.payload,
            };
        case 'SET_STATUS':
            return {
                ...state,
                status: action.payload,
                enable: ["موجود", "فعال"].includes(action.payload) ? true : false,
                exist: ["موجود", "فعال"].includes(action.payload) ? true : false,
            };
        case 'SET_SUBCATEGORY':
            return {
                ...state,
                subcategory: state.subcategory === action.payload ? "" : action.payload,
            };
        case 'SET_ENABLE':
            return { ...state, discount: action.payload };
        case 'SET_EXIST':
            return { ...state, discount: action.payload };
        case 'SET_BRAND':
            return {
                ...state,
                brand: state.brand === action.payload ? "" : action.payload,
            };
        case 'SET_IMAGE':
            return { ...state, image: action.payload };
        case 'SET_DESCRIPTION':
            return { ...state, description: action.payload };
        case 'ADD_FEATURE':
            return {
                ...state,
                features: [...state.features, { id: Date.now(), name: action.payload }]
            };
        case 'REMOVE_FEATURE':
            return {
                ...state,
                features: state.features.filter(feature => feature.id !== action.payload),
            };
        default:
            return state;
    }
}



export default function AddNewProduct({ type = "ADD" }) {
    const { user, loading, categories, brands } = useContext(AuthContext)
    const titlesArrayCategories = categories.map(item => item.title);
    const titlesArrayBrands = brands.map(item => item.name);

    function getIdByTitleCategories(title) {
        const item = categories.find(item => item.title === title);
        return item ? item.id : null;
    }

    function getIdByTitleBrands(name) {
        const item = brands.find(item => item.name === name);
        return item ? item.id : null;
    }


    const [state, dispatch] = useReducer(reducer, initialState);

    // ................................
    const [text, setText] = useState('');
    const [listString, setListString] = useState('');

    const addText = () => {
        if (text.trim() !== '') {
            dispatch({ type: 'SET_DESCRIPTION', payload: (state.description ? `${state.description}\n${text}` : text) })
            setListString(prev => (prev ? `${prev}\n${text}` : text));
            setText(''); // پاک کردن تکست‌اریا
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    // حذف سطر مورد نظر از رشته
    const deleteLine = (index) => {
        const lines = listString.split('\n');
        lines.splice(index, 1);
        setListString(lines.join('\n'));
        dispatch({ type: 'SET_DESCRIPTION', payload: lines.join('\n') })
    };
    // ................................

    let categorys = {
        "": [],
        "تنقلات": ["چیپس", "پفک", "شکلات", "پنبه", "نخود", "هویج"],
        "لوازم تحریر": ["مداد", "دفتر", "خودکار"],
        "ادامس": ["دارچینی", "موزی", "توت فرنگی"],
        "بهداشتی": ["دستمال", "پد بهداشتی", "خلال دندون"],
        "کنسرویجات": ["تن ماهی", "کنسرو قرمه سبزی", "کنسرو لوبیا"],
        "کالای اساسی": ["روغن", "چای", "برنج"]
    }
    let status = [
        "موجود ",
        "نا موجود",
        "غیر فعال",
    ]

    const justCategtoys = Object.keys(categorys);
    // const justsubCategory = categorys[category];

    const navigate = useNavigate();
    const goToSpecificRoute = () => {
        navigate(-1);
    };

    const listFeatures = [
        "قیمت مصرف کننده: 18٫500 تومان",
        "تاخیری",
        "حاوی عصاره‌های طبیعی عناب، گوارانا، تمبر هندی",
        "دارای ویتامین C موجود برای افزایش جذب عصاره‌های گیاهی"
    ]

    // const submitHandle = async () => {
    //     const { productName, price, payablePrice, discount, category, brand, image, status, enable, exist } = state;

    //     if (productName === '' || price === '' || payablePrice === '' || discount === '' || category === '' || brand === '' || image === '' || status === '' || enable === '' || exist === '') {
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'خطا',
    //             text: 'لطفا تمامی فیلدها را پر کنید (به جز فیلد ویژگی‌ها)',
    //             confirmButtonText: 'باشه'
    //         });
    //         return;
    //     }

    //     try {
    //         const response = await FileUploadService.uploadFile(state.image, user.token, "image");
    //         console.log("IMAGE", response.data.dataList[0])
    //         console.log("response", response)
    //         if (!response.data.hasError) {
    //             const productData = {
    //                 title: state.productName,
    //                 description: state.description,
    //                 price: state.price,
    //                 discount: state.discount,
    //                 image: response.data.dataList[0],
    //                 visitCount: 0,
    //                 enable: state.enable === "فعال" ? true : false,
    //                 exist: state.exist === "موجود" ? true : false,
    //                 categoryId: getIdByTitleCategories(state.category),
    //                 brandId: getIdByTitleBrands(state.brand),
    //             };

    //             console.log("data product for api", productData)
    //             try {
    //                 const response = await fetch("/api/product", {
    //                     method: "POST",
    //                     headers: {
    //                         "Content-Type": "application/json",
    //                         'Authorization': `Bearer ${user.token}`
    //                     },
    //                     body: JSON.stringify(productData),
    //                 });

    //                 const result = await response.json();
    //                 console.log("respone send product:", result)
    //                 if (result.status === "SUCCESS") {
    //                     alert("محصول با موفقیت ثبت شد!")
    //                 } else {
    //                     alert("خطا در ثبت محصول.")
    //                 }
    //             } catch (error) {
    //                 alert("problem 2")
    //             }
    //             // console.log("biaaaaa")
    //             // dispatch({ type: 'SET_IMAGE_NAME', payload: response.data.dataList[0] })
    //         }
    //     } catch (error) {
    //         console.log('File upload failed!');
    //     }
    // }

    const submitHandle = async () => {
        const { productName, price, payablePrice, discount, category, brand, image, status, enable, exist } = state;

        if (
            productName === '' ||
            price === '' ||
            payablePrice === '' ||
            discount === '' ||
            category === '' ||
            brand === '' ||
            image === '' ||
            status === '' ||
            enable === '' ||
            exist === ''
        ) {
            Swal.fire({
                icon: 'error',
                title: 'خطا',
                text: 'لطفا تمامی فیلدها را پر کنید (به جز فیلد ویژگی‌ها)',
                confirmButtonText: 'باشه',
            });
            return;
        }

        // نمایش لودینگ
        Swal.fire({
            title: 'در حال پردازش...',
            text: 'لطفا صبر کنید',
            icon: 'info',
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        try {
            const response = await FileUploadService.uploadFile(state.image, user.token, "image");

            if (!response.data.hasError) {
                const productData = {
                    title: state.productName,
                    description: state.description,
                    price: state.price,
                    discount: state.discount,
                    image: response.data.dataList[0],
                    visitCount: 0,
                    enable: state.enable === "فعال" ? true : false,
                    exist: state.exist === "موجود" ? true : false,
                    categoryId: getIdByTitleCategories(state.category),
                    brandId: getIdByTitleBrands(state.brand),
                    count: state.stock ,
                };

                try {
                    const productResponse = await fetch("/api/product", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${user.token}`,
                        },
                        body: JSON.stringify(productData),
                    });

                    const result = await productResponse.json();

                    if (result.status === "SUCCESS") {
                        Swal.fire({
                            icon: 'success',
                            title: 'موفقیت',
                            text: 'محصول با موفقیت ثبت شد!',
                            confirmButtonText: 'باشه',
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'خطا',
                            text: 'خطا در ثبت محصول.',
                            confirmButtonText: 'باشه',
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'خطا',
                        text: 'خطایی در ارسال اطلاعات محصول رخ داده است.',
                        confirmButtonText: 'باشه',
                    });
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'خطا',
                    text: 'آپلود تصویر با خطا مواجه شد.',
                    confirmButtonText: 'باشه',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'خطا',
                text: 'آپلود فایل با شکست مواجه شد!',
                confirmButtonText: 'باشه',
            });
        }
    };


    if (loading) {
        return (
            <div className='h-full flex justify-center items-center'>
                <LoadingSec />
            </div>
        )
    }


    return (
        <div className='grid grid-cols-12 auto-rows-min w-full  h-screen font-Dana text-white pt-10 px-3 md:p-5'>
            {/* back btn */}
            <div className='col-span-12'>
                <span onClick={() => goToSpecificRoute()} className='flex items-center gap-1 cursor-pointer'>
                    <FaArrowRightLong size={22} />
                    <span className='text-xl'>برگشت</span>
                </span>
            </div>
            <div className='grid grid-cols-12 col-span-12 py-5 gap-4' >
                <InputeNum className=" col-span-6 lg:col-span-4 xl:col-span-2" value={state.price} setFunc={(value) => dispatch({ type: 'SET_PRICE', payload: value })} title="قیمت" />
                <InputeNum className=" col-span-6 lg:col-span-4 xl:col-span-2" value={state.discount} setFunc={(value) => dispatch({ type: 'SET_DISCOUNT', payload: value })} unit='درصد' min={0} maxNum={100} title={"تخفیف"} />
                <DropDown className="border-2  col-span-6 lg:col-span-4 xl:col-span-2 border-[#55555e]" classNameList="border-2 border-[#55555e]" value={state.brand} title="برند" list={titlesArrayBrands} readOnly={false} setFunc={(value) => dispatch({ type: 'SET_BRAND', payload: value })} />
                <DropDown className="border-2  col-span-6 lg:col-span-4 xl:col-span-2 border-[#55555e]" classNameList="border-2 border-[#55555e]" value={state.category} title="دسته بندی" list={titlesArrayCategories} readOnly={false} setFunc={(value) => dispatch({ type: 'SET_CATEGORY', payload: value })} />
                <Uploader token={user.token} className="col-span-12 lg:col-span-8 xl:col-span-4 max-h-11" value={state.image === '' ? '' : state.image.name} setFunc={(value) => dispatch({ type: 'SET_IMAGE', payload: value })} />
                <AddFeatureItem textValue={text} setText={setText} setListString={setListString} addText={addText} handleKeyDown={handleKeyDown} deleteLine={deleteLine} title="ویژگی ها" type="Features" className="col-span-12 lg:col-span-8" list={listString.split('\n').filter(line => line.trim() !== '')} />
                <div className='flex flex-col col-span-12  lg:col-span-4 gap-4'>
                    <div className='w-full '>
                        <span className='border-r-2 border-blue-400 pr-2 text-xl'>
                            تیتر
                        </span>
                    </div>
                    <textarea onChange={(e) => dispatch({ type: 'SET_PRODUCT_NAME', payload: e.target.value })} className='border-2 border-[#55555e] rounded-xl resize-none outline-none h-full py-3 bg-transparent text-white text-justify px-2 font-Dana text-base w-full' name="" id="">

                    </textarea>
                </div>
                <DropDown className="border-2 col-span-6 md:col-span-4  lg:col-span-2 border-[#55555e]" classNameList="border-2 border-[#55555e]" value={state.status} title="وضعیت" list={status} setFunc={(value) => dispatch({ type: 'SET_STATUS', payload: value })} />
                <InputeNum readOnly={true} className=" col-span-6 md:col-span-4 lg:col-span-2" value={state.payablePrice} title="قیمت قابل پرداخت" />
                <InputeNum min={0} unit='' setFunc={(value) => dispatch({ type: 'SET_STOCK', payload: value })} className=" col-span-6 md:col-span-4 lg:col-span-2" value={state.stock} title="موجودی" />
                <button onClick={() => submitHandle()} className=' col-span-12 md:col-span-4 lg:col-span-2 btn' >اضافه کردن محصول</button>
            </div>
        </div>
    )
}
