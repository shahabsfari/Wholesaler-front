import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineDelete } from "react-icons/ai";
import BrandBoxInPadmin from '../PAdmin/BrandBoxInPadmin/BrandBoxInPadmin';
import AuthContext from '../../AuthContext';
import LoadingSec from '../LoadingSec/LoadingSec';
import PaginationButtons from '../PaginationButtons/PaginationButtons';
import Swal from 'sweetalert2';

export default function BrandsListInPAdmin({ setUpdate, user, update }) {

    const [brands, setBrands] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(false);

    // const { user } = useContext(AuthContext)

    const pageCount = 10;
    const itemsPerPage = 10;

    const [currentPage, setCurrentPage] = useState(() => {
        const savedPage = sessionStorage.getItem("usersPage");
        return savedPage ? Number(savedPage) : 0;
    });
    const handlePageClick = (event) => {
        const selectedPage = event.selected;
        setCurrentPage(selectedPage);
        sessionStorage.setItem("usersPage", selectedPage);
    };
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

            const data = await fetchBrands(pageCount, currentPage);
            if (data) {
                console.log("sdsdd :" , data)
                setBrands(data.dataList);
                setTotalCount(data.totalCount);
            }

            setLoading(false);
        };

        getBrands();
    }, [update, currentPage]);

    return (
        <div className='w-full text-white flex flex-col justify-between h-full' >
            {/* top */}
            <div className="flex-1">
                <div className='border-b-2 border-[#55555e] flex pb-3 '>
                    <span className='font-MorabbaMedium text-xl '> برند ها</span>
                </div>
                {/* list */}
                <div className='grid grid-cols-10 md:px-16 py-10 gap-2 lg:gap-4' >
                    {
                        loading ? (
                            <div className='flex absolute h-full inset-0 md:pr-40 justify-center items-center'>

                                <LoadingSec />
                            </div>
                        ) : (
                            brands.length === 0 ? (
                                <div className='font-DanaMedium col-span-12 flex-1 text-xl p-16 md:text-2xl h-full flex justify-center items-center'>
                                    برندی جهت نمایش وجود ندارد
                                </div>
                            ) : (
                                brands.map((brand, index) => (
                                    <BrandBoxInPadmin setUpdate={setUpdate} key={brand.id} brandID={brand.id} brandName={brand.name} imageName={brand.image} />
                                ))
                            )
                        )
                    }


                </div>
            </div>
            <div className='pb-8'>
                <PaginationButtons
                    pageCount={Math.ceil(totalCount / itemsPerPage)}
                    currentPage={currentPage}
                    handlePageClick={handlePageClick}
                />

            </div>
        </div>
    )
}

