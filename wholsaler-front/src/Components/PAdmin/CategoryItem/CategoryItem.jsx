import React, { useEffect, useState } from 'react'
import { FiTrash2, FiPlus, FiEdit } from "react-icons/fi";
import { TbListDetails } from "react-icons/tb";
import Modal from '../../Modal/Modal';
import Swal from 'sweetalert2';
import EditCategory from '../EditCategory/EditCategory'
import './CategoryItem.css'
import SubMenusList from '../SubMenusList/SubMenusList'
import NewSubCategory from '../NewSubCategory/NewSubCategory';
export default function CategoryItem({ setUpdate , data , user}) {
    const [showAddNewSubCategory, setShowAddNewSubCategory] = useState(false)
    const showNewSubCategoryModalHandler = () => {
        setShowAddNewSubCategory(prev => !prev)
    }
    const [showEditModal, setShowEditModal] = useState(false)
    const showEditModalHandler = () => {
        setShowEditModal(prev => !prev)
    }
    const deleteHandler = async (categoryID) => {
        const result = await Swal.fire({
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
        })

        if (result.isConfirmed) {
            try {
                const response = await fetch(`/api/product-category/${categoryID}`, {
                    method: "DELETE",
                });
                const dataRes = await response.json();
                console.log(dataRes)

                if (dataRes.status === "SUCCESS" ) {
                    Swal.fire({
                        background: "#30336b",
                        color: "white",
                        title: "پاک شد!",
                        text: " دسته بندی پاک شد!",
                        icon: "success",
                        confirmButtonText: "تایید"
                    });
                    setUpdate()
                } else {
                    Swal.fire("خطا!", dataRes.message || "حذف دسته بندی موفقیت‌آمیز نبود.", "error");
                }
            } catch (error) {
                Swal.fire("خطا!", "مشکلی در برقراری ارتباط با سرور به وجود آمده است.", "error");
            }
        }

    }

    const [image, setImage] = useState('')
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await fetch(  `/api/filehandler/files/${data.image}`);
                // const data = await response.json();
                if (response.status === 200) {
                    setImage(response.url);
                } else {
                    setError(response.message || 'Failed to fetch brands');
                }
            } catch (error) {
                setError('Error fetching brands');
                console.error(error);
            }
        };

        fetchBrands();
    }, []);

    return (
        <>
            <div className='absolute bg-cover bg-center bg-no-repeat blur-[1px] inset-0 rounded-xl' style={{ backgroundImage: `url(${image})` }}>
            </div>
            <div className='absolute bg-zinc-800 opacity-60 inset-0 rounded-xl' >

            </div>
            <ul className='absolute flex gap-x-2 top-1 left-1 font-DanaMedium '>

                <li onClick={() => deleteHandler(data.id)} className='w-10 h-10 bg-green-300 hover:scale-105 transition-all cursor-pointer rounded-lg flex justify-center items-center' >
                    <FiTrash2 className='size-6' />
                </li>
                <li onClick={() => showEditModalHandler()} className='w-10 h-10 bg-green-300 hover:scale-105 transition-all cursor-pointer rounded-lg flex justify-center items-center' >
                    <FiEdit className='size-6' />
                </li>
                {/* <li onClick={() => showNewSubCategoryModalHandler()} className='w-10 h-10 bg-green-300 hover:scale-105 transition-all cursor-pointer rounded-lg flex justify-center items-center' >
                    <FiPlus className='size-6' />
                </li> */}
            </ul>
            <span className='z-40 font-DanaDemiBold text-xl text-center text-white'>{data.title}</span>
            <Modal className='py-20 md:px-20' isOpen={showEditModal} onClose={showEditModalHandler} >
                <div className='col-span-12 flex justify-center items-center h-full'>
                    <EditCategory setUpdate={setUpdate} onClose={showEditModalHandler} user={user} data={data} className=" start-4 end-8  col-span-4 px-4 md:px-16 rounded-2xl h-fit flex flex-col gap-5 " />
                </div>
                {/* <SubMenusList data={data[1].subMenus} className=" col-span-12 md:col-span-8  h-fit " /> */}
            </Modal>
            {/* <Modal className='py-20 md:px-20 ' isOpen={showAddNewSubCategory} onClose={showNewSubCategoryModalHandler} >
                <div className='col-span-12 md:px-[500px]'>
                    <NewSubCategory data={data} />
                </div>
            </Modal> */}
        </>
    )
}
