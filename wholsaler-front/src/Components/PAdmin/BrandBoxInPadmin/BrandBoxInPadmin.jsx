import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";
import AuthContext from '../../../AuthContext';
import Modal from '../../Modal/Modal';
import EditBrands from '../../EditBrands/EditBrands';
export default function BrandBoxInPadmin({ setUpdate, imageName, brandName, brandID }) {

    const { user } = useContext(AuthContext)

    const [showEditModal, setShowEditModal] = useState(false)

    const showEditModalHandler = () => {
        setShowEditModal(prev => !prev)
    }
    const [image, setImage] = useState('')
    const [error, setError] = useState(null);

    useEffect(() => {
        if (imageName !== null) {
            const fetchBrands = async () => {
                try {
                    console.log("imageName", imageName)
                    const data = await fetch(`/api/filehandler/files/${imageName}`);
                    // const data = await response.json();
                    if (data.status === 200) {
                        console.log("data.url", data.url)
                        setImage(data.url);
                    } else {
                        setError(data.message || 'Failed to fetch brands');
                    }
                } catch (error) {
                    setError('Error fetching brands');
                    console.error(error);
                }
            };
            fetchBrands();
        } else {
            setImage("/images/products/defult-image.webp");
        }

    }, []);

    const deleteBrand = async (brandId) => {

        const result = await Swal.fire({
            title: "آیا مطمئن هستید که می‌خواهید این برند را حذف کنید؟",
            text: "این عمل قابل بازگشت نیست!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "بله، حذف کن",
            cancelButtonText: "لغو"
        });


        if (result.isConfirmed) {
            try {
                const response = await fetch(`/api/brand/${brandId}`, {
                    method: "DELETE",
                });
                const data = await response.json();

                // بررسی موفقیت‌آمیز بودن درخواست
                if (data.status === "SUCCESS" && !data.hasError) {
                    Swal.fire("حذف شد!", "برند با موفقیت حذف شد.", "success");
                    setUpdate()
                } else {
                    Swal.fire("خطا!", data.message || "حذف برند موفقیت‌آمیز نبود.", "error");
                }
            } catch (error) {
                Swal.fire("خطا!", "مشکلی در برقراری ارتباط با سرور به وجود آمده است.", "error");
            }
        }
    };

    return (
        <div className='rounded-xl border-2 min-h-[250px] border-white flex flex-col col-span-5  md:col-span-3 xl:col-span-2'>
            <span className='w-full flex justify-between px-4 items-center text-xl py-4 font-DanaMedium bg-corn-flower/50 rounded-t-lg'>
                <span>
                    {brandName}
                </span>
                <span className='flex gap-3 justify-center items-center'>
                    <FiEdit onClick={() => showEditModalHandler()} className='hover:text-green-600 cursor-pointer transition-all' size={22} />
                    <AiOutlineDelete onClick={() => deleteBrand(brandID)} className='hover:text-red-600 cursor-pointer transition-all' size={25} />
                </span>
            </span>
            <div className=' px-2 xl:px-5 flex-1 flex justify-center items-center' >
                <img src={image} alt="brand" />
            </div>

            <Modal className='py-20 md:px-20' isOpen={showEditModal} onClose={showEditModalHandler} >
                <div className='col-span-12 flex justify-center items-center h-full'>
                    <EditBrands setUpdate={setUpdate} onClose={showEditModalHandler} user={user} data={{ brandName, image, id: brandID }} className=" start-4 end-8  col-span-4 px-4 md:px-16 rounded-2xl h-fit flex flex-col gap-5 " />
                </div>
            </Modal>

        </div>
    )
}
