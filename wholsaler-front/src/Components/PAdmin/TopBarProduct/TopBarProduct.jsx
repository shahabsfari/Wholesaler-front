import React, { useEffect, useState } from 'react'
import SearchInput from '../SearchInput/SearchInput'
import { RiFunctionAddLine } from "react-icons/ri";
import AddNewItem from '../AddNewItem/AddNewItem';
import { NavLink, useNavigate } from 'react-router-dom';
export default function TopBarProduct() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [target, setTarget] = useState('')
    const [isFocused, setIsFocused] = useState(false);
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const goToSpecificRoute = () => {
        navigate('/p-admin/adminProducts/addNewProduct'); // مسیر مورد نظر را اینجا قرار دهید
    };

    const fetchProduct = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/product/${id}`);
            if (!response.ok) {
                throw new Error("Failed to fetch product");
            }
            const data = await response.json();
            if (data.status === "SUCCESS" && data.dataList.length > 0) {
                return (data.dataList[0]);
            } else {
                throw new Error(data.message || "No product found");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // const fetchImage = async () => {
    //     try {
    //         const data = await fetch(`/api/filehandler/files/${image}`);
    //         // const data = await response.json();
    //         if (data.status === 200) {
    //             setImageUrl(data.url);
    //         } else {
    //             setError(data.message || 'Failed to fetch brands');
    //         }
    //     } catch (error) {
    //         setError('Error fetching brands');
    //         console.error(error);
    //     }
    // };


    const fetchSearchResults = async (query) => {
        console.log("sf")
        setIsLoading(true);
        try {
            const response = await fetch(
                `/api/product/search?pageSize=5&pageNumber=0&target=${encodeURIComponent(query)}`
            );
            const data = await response.json();
            if (!data.hasError) {
                setResults(data.dataList);
            } else {
                console.error("Error:", data.message);
                setResults([]);
            }
        } catch (error) {
            console.error("Error fetching search results:", error);
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (target.trim() === "") {
            setResults([]);
            return;
        }

        const delayDebounceFn = setTimeout(() => {
            fetchSearchResults(target);
        }, 500);


        return () => clearTimeout(delayDebounceFn);
    }, [target]);

    const recommendedProduct = async (id) => {
        try {
            const product = await fetchProduct(id); // منتظر اجرای کامل fetchProduct
            // await fetchImage(product.image)
            console.log("Product fetched successfully!");
            // اکنون می‌توانید به محصول دسترسی پیدا کنید
            console.log(product);
            navigate('/p-admin/adminProducts/editProduct', { state: { ...product , imageName:product.image } });
        } catch (error) {
            console.error("Error in recommendedProduct:", error);
        }
    };
    console.log(results)
    return (
        <div className='relative w-full gap-x-2 flex items-center'>
            <div className='flex gap-2 mr-8 md:mr-0' >
                <div className='relative'>
                    <SearchInput setIsFocused={setIsFocused} value={target} setFunc={setTarget} placeholder="جستجوی محصول..." />
                    {
                        isFocused && (
                            <div className='absolute top-[82%] w-[98%] font-Dana shadow-2xl  z-20 rounded-b-xl bg-white divide-y-2 divide-black/30 flex flex-col left-1/2 -translate-x-1/2 '>
                                {
                                    results.map((item) => (
                                        <div key={item.id} onClick={() => recommendedProduct(item.id)} className='w-full cursor-pointer flex justify-start py-4 px-2 '>
                                            {
                                                item.title
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>

                <div className='flex items-center transition-all duration-1000 justify-center group'>
                    <span onClick={() => goToSpecificRoute()} className='bg-blue-400 cursor-pointer transition-all min-w-10 duration-1000 items-center font-DanaDemiBold text-base p-1 rounded-lg flex justify-center'>
                        <RiFunctionAddLine className='size-6' />
                        <div className='max-w-0 h-7 transition-all duration-300 overflow-hidden group-hover:max-w-xs flex justify-center items-center '>
                            <span className='opacity-0  transition-all duration-300 group-hover:opacity-100  ' >اضافه کردن محصول</span>
                        </div>
                    </span>
                </div>
            </div>

        </div>
    )
}
