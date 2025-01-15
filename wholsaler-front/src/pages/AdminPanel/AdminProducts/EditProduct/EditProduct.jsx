import React, { useContext, useEffect, useReducer, useState } from 'react'
import { CiImageOn } from "react-icons/ci";
import DropDown from '../../../../Components/PAdmin/DropDown/DropDown';
import InputeNum from '../../../../Components/PAdmin/InputeNum/InputeNum';
import AddFeatureItem from '../../../../Components/PAdmin/AddFeatureItem/AddFeatureItem';
import { FaArrowRightLong } from "react-icons/fa6";
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../../../../AuthContext';
import Uploader from '../../../../Components/PAdmin/Uploader/Uploader';
import FileUploadService from '../../../../Components/ApiFunctions/FileUploadService';
import Swal from 'sweetalert2';

const initialState = {
    title: "",
    description: "",
    stock: 0,
    price: 0,
    payablePrice: 0,
    discount: 0,
    category: "",
    categoryId: "",
    brand: "",
    brandId: "",
    image: "",
    imageName: "",
    status: "",
    enable: false,
    exist: false,
    features: []
};



function reducer(state, action) {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'SET_PRODUCT_NAME':
            return { ...state, title: action.payload };
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
                enable: ["موجود", "فعال", "ناموجود"].includes(action.payload) ? true : false,
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



export default function EditProduct({ type = "ADD" }) {

    const [state, dispatch] = useReducer(reducer, initialState);
    const location = useLocation();
    const product = location.state ? location.state : {};
    console.log(product)
    console.log(product)
    // .................................................
    useEffect(() => {
        if (location.state) {
            console.log(product)
            dispatch({
                type: 'SET_DATA',
                payload: {
                    ...location.state,
                    category: findTitleById(product.categoryId),
                    brand: findTitleBrandById(product.brandId),
                    features: [],
                    image: '',
                    payablePrice: product.priceWithDiscount,
                    status: product.enable ? (product.exist ? "موجود" : "ناموجود") : "غیر فعال",
                    stock: product.count
                }
            });
        }
    }, [location.state]);

    const { user, loading, categories, brands, userloading } = useContext(AuthContext)

    // find func
    const findIdByTitle = (title) => {
        const item = categories.find((item) => item.title === title);
        return item ? item.id : "ID not found";
    };

    const findTitleById = (id) => {
        const item = categories.find((item) => item.id === id);
        return item ? item.title : "Item not found";
    };
    const findTitleBrandById = (id) => {
        const item = brands.find((item) => item.id === id);
        return item ? item.name : "Item not found";
    };

    console.log(state)


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




    // ................................
    const [text, setText] = useState('');
    const [listString, setListString] = useState(product.description);
    console.log(listString)

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

    let status = [
        "موجود",
        "ناموجود",
        "غیر فعال",
    ]



    const navigate = useNavigate();
    const goToSpecificRoute = () => {
        navigate(-1);
    };


    const handleFileUpload = async () => {
        try {
            const response = await FileUploadService.uploadFile(state.image, user.token, "image");
            console.log("IMAGE", response.data.dataList[0])
            console.log("response", response)
            if (!response.data.hasError) {
                console.log("biaaaaa")
                dispatch({ type: 'SET_IMAGE_NAME', payload: response.data.dataList[0] })
                return false
            }
        } catch (error) {
            console.log('File upload failed!');
            return true
        }
    };

    const submitHandle = async () => {
        const { title, price, payablePrice, discount, category, brand, image, status, enable, exist } = state;

        // چک کردن فیلدهای خالی
        if (
            title === '' || price === '' || payablePrice === '' || discount === '' || category === '' || brand === '' ||
            status === '' || enable === '' || exist === ''
        ) {
            Swal.fire({
                icon: 'error',
                title: 'خطا',
                text: 'لطفا تمامی فیلدها را پر کنید (به جز فیلد ویژگی‌ها)',
                confirmButtonText: 'باشه'
            });
            return;
        }

        // نمایش لودینگ
        Swal.fire({
            title: 'لطفا منتظر بمانید...',
            html: 'در حال ارسال اطلاعات...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            let response = {
                data: {
                    dataList: [
                        state.imageName
                    ]
                }
            };

            // آپلود فایل در صورت انتخاب عکس
            if (state.image !== '') {
                response = await FileUploadService.uploadFile(state.image, user.token, "image");
            }

            if (!response.data.hasError || state.image === '') {
                const productData = {
                    title: state.title,
                    description: state.description,
                    price: state.price,
                    discount: state.discount,
                    priceWithDiscount: state.payablePrice,
                    image: response.data.dataList[0],
                    enable: state.enable,
                    exist: state.exist,
                    categoryId: getIdByTitleCategories(state.category),
                    brandId: getIdByTitleBrands(state.brand),
                    count: state.stock ,
                };
                console.log(productData)

                try {
                    const response = await fetch(`/api/product/${state.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            'Authorization': `Bearer ${user.token}`
                        },
                        body: JSON.stringify(productData),
                    });

                    const result = await response.json();

                    // بررسی نتیجه آپدیت
                    if (result.status === "SUCCESS") {
                        Swal.fire({
                            icon: 'success',
                            title: 'موفقیت',
                            text: 'محصول با موفقیت آپدیت شد!',
                            confirmButtonText: 'باشه'
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'خطا',
                            text: 'خطا در آپدیت محصول.',
                            confirmButtonText: 'باشه'
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'خطا',
                        text: 'مشکلی در ارسال اطلاعات به سرور رخ داده است.',
                        confirmButtonText: 'باشه'
                    });
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'خطا',
                    text: 'مشکلی در آپلود تصویر وجود دارد.',
                    confirmButtonText: 'باشه'
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'خطا',
                text: 'آپلود فایل با شکست مواجه شد!',
                confirmButtonText: 'باشه'
            });
        }
    };
    if (loading || userloading) {
        return (
            <div>
                lodading....
            </div>
        )
    }

    console.log(state.category)
    console.log("getIdByTitleBrands", getIdByTitleCategories(state.category))

    return (
        <div className='grid grid-cols-12 auto-rows-min w-full  min-h-screen font-Dana text-white pt-10 px-3 md:p-5'>
            {/* back btn */}
            <div className='col-span-12'>
                <span onClick={() => goToSpecificRoute()} className='flex items-center gap-1 cursor-pointer'>
                    <FaArrowRightLong size={22} />
                    <span className='text-xl'>برگشت</span>
                </span>
            </div>
            <div className='grid grid-cols-12 col-span-12 py-5 gap-4' >
                <InputeNum
                    className=" col-span-6 lg:col-span-4 xl:col-span-2"
                    value={state.price}
                    setFunc={(value) => dispatch({ type: 'SET_PRICE', payload: value })}
                    title="قیمت"
                />
                <InputeNum
                    className=" col-span-6 lg:col-span-4 xl:col-span-2"
                    value={state.discount}
                    setFunc={(value) => dispatch({ type: 'SET_DISCOUNT', payload: value })}
                    unit='درصد'
                    min={0}
                    maxNum={100}
                    title={"تخفیف"}
                />
                <DropDown
                    className="border-2  col-span-6 lg:col-span-4 xl:col-span-2 border-[#55555e]"
                    classNameList="border-2 border-[#55555e]"
                    value={state.brand}
                    title="برند"
                    list={titlesArrayBrands}
                    readOnly={false}
                    setFunc={(value) => dispatch({ type: 'SET_BRAND', payload: value })}
                />
                <DropDown
                    className="border-2  col-span-6 lg:col-span-4 xl:col-span-2 border-[#55555e]"
                    classNameList="border-2 border-[#55555e]"
                    value={state.category}
                    title="دسته بندی"
                    list={titlesArrayCategories}
                    readOnly={false}
                    setFunc={(value) => dispatch({ type: 'SET_CATEGORY', payload: value })}
                />
                <Uploader
                    token={user.token}
                    className="col-span-12 lg:col-span-8 xl:col-span-4 max-h-11"
                    value={state.imageName === '' ? 'هیچ عکسی انتخاب نشده است' : state.imageName}
                    setFunc={(value) => {
                        dispatch({ type: 'SET_IMAGE', payload: value })
                        dispatch({ type: 'SET_IMAGE_NAME', payload: value.name })
                    }}
                />
                <AddFeatureItem
                    textValue={text}
                    setText={setText}
                    setListString={setListString}
                    addText={addText}
                    handleKeyDown={handleKeyDown}
                    deleteLine={deleteLine}
                    title="ویژگی ها"
                    type="Features"
                    className="col-span-12 lg:col-span-8"
                    list={listString.split('\n').filter(line => line.trim() !== '')}
                />
                <div className='flex flex-col col-span-12  lg:col-span-4 gap-4'>
                    <div className='w-full '>
                        <span className='border-r-2 border-blue-400 pr-2 text-xl'>
                            تیتر
                        </span>
                    </div>
                    <textarea value={state.title} onChange={(e) => dispatch({ type: 'SET_PRODUCT_NAME', payload: e.target.value })} className='border-2 border-[#55555e] rounded-xl resize-none outline-none h-full py-3 bg-transparent text-white text-justify px-2 font-Dana text-base w-full' name="" id="">

                    </textarea>
                </div>
                <DropDown
                    className="border-2 col-span-6 md:col-span-4  lg:col-span-2 border-[#55555e]"
                    classNameList="border-2 border-[#55555e]"
                    value={state.status}
                    title="وضعیت"
                    list={status}
                    setFunc={(value) => dispatch({ type: 'SET_STATUS', payload: value })}
                />
                <InputeNum
                    readOnly={true}
                    className=" col-span-6 md:col-span-4 lg:col-span-2"
                    value={state.payablePrice}
                    title="قیمت قابل پرداخت"
                />
                <InputeNum
                    min={0}
                    unit=''
                    setFunc={(value) => dispatch({ type: 'SET_STOCK', payload: value })}
                    className=" col-span-6 md:col-span-4 lg:col-span-2"
                    value={state.stock}
                    title="موجودی"
                />
                <button onClick={() => submitHandle()} className=' col-span-12 md:col-span-4 lg:col-span-2 btn' >بروزرسانی محصول</button>
            </div>
        </div>
    )
}
