import React, { useContext, useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaAngleLeft } from "react-icons/fa6";
import AuthContext from '../../AuthContext';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './style.css';

// import required modules
import { Autoplay } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';
export default function App() {
    const [brands, setBrands] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(false);
    // const { brands } = useContext(AuthContext)
    const [loadingBran, setLoadingBran] = useState(true)
    const [updatedList, setUpdatedList] = useState([]);

    const navigate = useNavigate()
    const gotospeceficRoute = (id, event) => {
        event.stopPropagation()
        console.log("ygydgs")
        navigate('/ProductSelector', { state: { id, type: "brand" } })
    }

    const fetchBrands = async (pageSize, pageNumber) => {
        const url = `/api/brand?pageSize=${pageSize}&pageNumber=${pageNumber}&img=0`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            if (data.hasError) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.message,
                });
                return null;
            }

            return data;
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Fetch error: ${error.message}`,
            });
            return null;
        }
    };

    useEffect(() => {
        const getBrands = async () => {
            setLoading(true);

            const data = await fetchBrands(20, 0);
            if (data) {
                // console.log("sdsdd :", data)
                setBrands(data.dataList);
                setTotalCount(data.totalCount);
            }

            setLoading(false);
        };

        getBrands();
    }, []);




    const fetchImagesWithNames = async (list) => {
        try {
            const updatedList = await Promise.all(
                list.map(async (item) => {
                    const response = await fetch(`/api/filehandler/files/${item.image}`);
                    if (response.status === 200) {
                        // console.log("imas" , response.url)
                        return { ...item, imageName: response.url }; 
                    } else {
                        return { ...item, imageName: 'Failed to fetch image' };
                    }
                })
            );
            return updatedList;
        } catch (error) {
            console.error('Error fetching images:', error);
            return list.map(item => ({ ...item, imageName: 'Error fetching image' }));
        }
    };

    useEffect(() => {
        const updateListWithImageNames = async () => {
            const listWithImageNames = await fetchImagesWithNames(brands);
            setUpdatedList(listWithImageNames);
            setLoadingBran(false)
        };
        updateListWithImageNames();
    }, [brands, loadingBran]);

    if (loadingBran) {
        return <div>Loading...</div>
    }

    return (
        <>
            <div className='custome-container  my-5 '>
                <div className='flex justify-between px-4 lg:my-3 items-center  ' >
                    <div className=' border-r-4 sm:border-r-4 border-orange-400 pr-1 sm:pr-3'>
                        <span className='text-sm md:text-3xl  font-MorabbaBold'>
                            برند های معروف
                        </span>
                    </div>
                    {/* <dir>
                        <button className='px-2 md:px-4 text-xs font-DanaMedium flex items-center justify-center gap-x-1' >
                            مشاهده همه
                            <FaAngleLeft className='-translate-y-[1px]' />
                        </button>
                    </dir> */}
                </div>
                <div className=' px-10 md:px-20'>
                    <Swiper
                        breakpoints={{
                            300: {
                                slidesPerView: 2
                            },
                            540: {
                                slidesPerView: 3
                            },
                            640: {
                                slidesPerView: 4
                            },
                            768: {
                                slidesPerView: 5
                            },
                            1024: {
                                slidesPerView: 7
                            },

                        }}
                        loop={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                            reverseDirection: true
                        }}
                        slidesPerView={9}
                        spaceBetween={20}
                        centeredSlides={true}
                        modules={[Autoplay]}
                        className="mySwiper mt-5"
                    >
                        {
                            updatedList.map((data) => (
                                <SwiperSlide onClick={(event) => gotospeceficRoute(data.id, event)} key={data.id} >
                                    <img className='object-contain aspect-[3/2] cursor-pointer' src={data.imageName} alt={data.name} />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </div>

        </>
    );
}
