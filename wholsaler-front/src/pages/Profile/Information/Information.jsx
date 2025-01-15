import React, { useContext, useEffect, useState } from 'react'
import InputText from '../../../Components/InputText/InputText'
import AddAddres from '../../../Components/AddAddres/AddAddres'
import AuthContext from '../../../AuthContext';
import OperationInAddress from '../../../Components/OperationInAddress/OperationInAddress';
import Swal from 'sweetalert2';
import ChangePass from '../../../Components/ChangePass/ChangePass';
export default function Information() {
    const [customerData, setCustomerData] = useState([])
    const { user, userloading , isLoggedIn } = useContext(AuthContext)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [number, setNumber] = useState('')
    const [openAddAddress, setOpenAddAddress] = useState(false)

    const [openChangePass, setOpenChangePass] = useState(false)

    useEffect(() => {
        if (!userloading) {
            setFirstName(user.firstName)
            setLastName(user.lastName)
            setNumber(user.username)
        }

    }, [userloading])

    const data = [
        {
            "province": "سمنان",
            "city": "شاهرود",
            "address": "پیشوا / خیابان امام علی / رویه روی داروخانه"
        }
    ]

    const openAddAddressHnadler = () => {
        setOpenAddAddress(prev => !prev)
    }
    const openChangePassHnadler = () => {
        setOpenChangePass(prev => !prev)
    }
    // console.log(openAddAddress)
    const handleUpdateUser = async () => {
        if (!userloading) {
            try {
                const response = await fetch(  `/api/user/${user.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ firstName, lastName }),
                });

                const data = await response.json();
                console.log(data)
                if (data.status === 'SUCCESS' && !data.hasError) {
                    Swal.fire({
                        icon: 'success',
                        title: 'موفقیت آمیز',
                        text: 'تغییرات با موفقیت ثبت شد!',
                    });
                    localStorage.setItem('user', JSON.stringify({ ...user, firstName, lastName }));
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'خطا',
                        text: data.message || 'ثبت تغییرات با شکست مواجه شد!',
                    });
                }
            } catch (error) {
                console.error('Error updating user:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'خطا',
                    text: 'یک خطا در ثبت تغییرات رخ داده است.',
                });
            }
        }
    };

    const deleteCustomer = async (customerId) => {
        const apiUrl =   `/api/customer/${customerId}`;
        const cusData = {
                id: customerData.id,    
                address: 'null',
                postalCode: 1111111111,
                longitude: ''
        };
        console.log(cusData)
        try {
            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cusData)
            });

            const data = await response.json();

            console.log("dataCus",)
            if (data.status === "SUCCESS" && !data.hasError) {
                Swal.fire({
                    icon: 'success',
                    title: 'موفقیت‌آمیز',
                    text: 'مشتری با موفقیت به‌روزرسانی شد!'
                });
                console.log("Customer Updated:", data.dataList);
                setCustomerData(data.dataList[0])
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'خطا',
                    text: data.message || 'خطایی در به‌روزرسانی مشتری رخ داده است.'
                });
                console.error("Update error:", data.message);
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'خطا',
                text: 'مشکلی در ارتباط با سرور رخ داده است.'
            });
            console.error("Network error:", error);
        }
    };

    useEffect(() => {
        if (!userloading && isLoggedIn ) {
            const fetchCustomerData = async (userId) => {
                try {
                    const response = await fetch(  `/api/customer/user/${userId}`);
                    const data = await response.json();
                    // console.log("Customer Data:", data.dataList[0]);

                    if (data.status === "SUCCESS" && !data.hasError) {
                        setCustomerData(data.dataList[0]);
                    } else {
                        console.error("Error fetching data:", data.message);
                        setCustomerData(null)
                        return null;
                    }
                } catch (error) {
                    console.error("Network error:", error);
                    setCustomerData(null)
                }
            };
            fetchCustomerData(user.id)
        }
    }, [user])

    return (
        <div className='grid grid-cols-12 gap-x-3 gap-y-5 mt-5  bg-white'>
            <InputText title="نام" value={firstName} setFunc={setFirstName} className='col-span-6' />
            <InputText title="نام خانوادگی" value={lastName} setFunc={setLastName} className='col-span-6' />
            <InputText readOnly={true} type='number' title="شماره تماس" value={number} setFunc={setNumber} className=' col-span-12 sm:col-span-6' />
            <div className='col-span-12 sm:col-span-6 flex child:w-full gap-3 '  >
                <button onClick={() => handleUpdateUser()} className='btn'>بروزرسانی تغیرات</button>
                <button onClick={openChangePassHnadler} className='btn'>تغیر رمز عبور</button>
            </div>
            <div className='col-span-12'>
                <div className='w-full flex justify-between items-center' >
                    <span className='text-xl font-MorabbaMedium pr-2 border-r-2 text-center border-blue-500'>آدرس ها</span>

                    <button onClick={() => openAddAddressHnadler()} className='btn px-2 z-10' style={{zIndex: 1}}>افزودن آدرس جدید</button>

                </div>
                <div>
                    {
                        customerData === null ? (
                            <div className='w-full p-10 text-xl flex justify-center items-center border-2 border-corn-flower rounded-xl mt-5' >
                                آدرسی جهت نمایش وجود ندارد
                            </div>
                        ) : (

                            customerData.address === 'null'? (
                                <div className='w-full p-10 text-xl flex justify-center items-center border-2 border-corn-flower rounded-xl mt-5' >
                                    آدرسی جهت نمایش وجود ندارد
                                </div>
                            ) : (
                                < div className='flex flex-col w-full' >
                                    <div className='grid grid-cols-12 px-2 mt-2 rounded-t-xl text-white bg-blue-800 w-full md:gap-x-3 ' >
                                        <span className='col-span-2  w-full flex justify-center items-center border-l-2 py-3 border-blue-700'>استان</span>
                                        <span className='col-span-2 hidden md:flex  w-full  justify-center items-center border-l-2 py-3 border-blue-700'>کد پستی</span>
                                        <span className='col-span-8 md:col-span-6 w-full  flex justify-center items-center border-l-2 py-3 border-blue-700' >آدرس</span>
                                        <span className='col-span-2  w-full flex justify-center items-center  py-3 border-blue-700'>عملیات</span>
                                    </div>
                                    <div className='grid grid-cols-12 px-2 text-white bg-corn-flower w-full  md:gap-x-3' >
                                        <span className='col-span-2 text-center border-l-2 py-3 border-blue-700'>سمنان</span>
                                        <span className='col-span-2 hidden md:flex justify-center text-center border-l-2 py-3 border-blue-700 overflow-x-hidden'>{customerData.postalCode}</span>
                                        <span className='col-span-8 md:col-span-6 text-center border-l-2 py-3 border-blue-700 truncate ' >{customerData.address}</span>
                                        {/* operation */}
                                        <OperationInAddress deleteCustomer={deleteCustomer} customerId={customerData.id} />
                                    </div>
                                </div>
                            )
                        )
                    }
                </div >
            </div >
            {
                openAddAddress ? <AddAddres setCustomerData={setCustomerData} customerData={customerData} onClose={openAddAddressHnadler} /> : null
            }
            {
                openChangePass ? <ChangePass onClose={openChangePassHnadler} /> : null
            }
        </div >
    )
}