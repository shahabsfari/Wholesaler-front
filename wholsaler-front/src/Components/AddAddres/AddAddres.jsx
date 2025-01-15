import React, { useContext, useState } from 'react'
import Modal from '../Modal/Modal'
import InputText from '../InputText/InputText'
import UserLocationMap from '../UserLocationMap/UserLocationMap'
import AuthContext from '../../AuthContext'
import Swal from 'sweetalert2'

export default function AddAddres({ onClose, customerData, setCustomerData }) {
    const { user, setCustomerDatahandle } = useContext(AuthContext)
    const [userPosition, setUserPosition] = useState([36.4064, 54.9763])
    const [address, setAddress] = useState('')
    const [postalCode, setPostalCode] = useState('')


    const submitHandler = () => {
        if (address.length <= 1) {
            Swal.fire({
                icon: "error",
                title: "خطا",
                text: "آدرس نمی‌تواند خالی باشد.",
                confirmButtonText: "تایید",
            });
            return;
        } else if (postalCode.length < 10) {
            Swal.fire({
                icon: "error",
                title: "خطا",
                text: "کد پستی نباید کمتر از ده رقم باشد",
                confirmButtonText: "تایید",
            });
            return;
        } else {
            if (customerData === null) {
                const longitude = userPosition[0];
                const latitude = userPosition[1];
                console.log("longitude", longitude, "latitude", latitude)
                const customer = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    mobile: user.username,
                    userId: user.id,
                    postalCode,
                    address,
                    longitude: longitude,
                    latitude: latitude,
                    tel: user.username
                }
                console.log("customer", customer)
                const createCustomer = async (userData) => {
                    try {
                        const response = await fetch('/api/customer', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(userData)
                        });

                        console.log(response)
                        const data = await response.json();
                        if (data.status === "SUCCESS" && !data.hasError) {
                            Swal.fire({
                                icon: 'success',
                                title: 'موفقیت‌آمیز',
                                text: 'مشتری با موفقیت ایجاد شد!'
                            });
                            console.log("Customer Created:", data.dataList);
                            setCustomerData(data.dataList[0]);
                            setCustomerDatahandle(data.dataList[0]);
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'خطا',
                                text: data.message || 'خطایی رخ داده است.'
                            });
                            console.error("Error creating customer:", data.message);
                            setCustomerData(null);
                            setCustomerDatahandle([]);
                        }
                    } catch (error) {
                        console.error("Network error:", error);
                    }
                };
                createCustomer(customer)
            } else {
                console.log("in tooo")
                const longitude = userPosition[0];
                const latitude = userPosition[1];
                const updateCustomer = async (customerId) => {
                    const apiUrl = `/api/customer/${customerId}`;
                    const cusData = {
                        postalCode: Number(postalCode),
                        address,
                        longitude: longitude,
                        latitude: latitude
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

                        console.log(data)
                        if (data.status === "SUCCESS" && !data.hasError) {
                            Swal.fire({
                                icon: 'success',
                                title: 'موفقیت‌آمیز',
                                text: 'مشتری با موفقیت به‌روزرسانی شد!'
                            });
                            console.log("Customer Updated:", data.dataList);
                            setCustomerData(data.dataList[0])
                            setCustomerDatahandle(data.dataList[0])
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
                updateCustomer(customerData.id)
            }
        }
        onClose()
    }
    return (
        <div>
            <Modal onClose={onClose} isOpen={true} blur={true} opacity={"bg-opacity-30"} >
                <div className='min-w-full h-screen flex items-center justify-center col-span-12'>
                    <div className='flex flex-col gap-5 rounded-xl p-10  bg-gray-300'>
                        <div className='flex gap-x-3'>
                            <InputText setFunc={setAddress} value="سمنان" readOnly={true} className='w-full' title="استان" bg="bg-transparent" mode='bg-corn-flower text-white rounded-md' />
                            <InputText setFunc={setAddress} value="شاهرود" readOnly={true} className='w-full' title="شهرستان" bg="bg-transparent" mode='bg-corn-flower text-white rounded-md' />
                        </div>
                        <InputText value={postalCode} setFunc={setPostalCode} className='w-[350px] md:w-[400px] ' title={`کد پستی`} bg="bg-transparent" mode='bg-corn-flower text-white rounded-md' />
                        <InputText value={address} setFunc={setAddress} className='w-[350px] md:w-[400px] ' title={`آدرس`} bg="bg-transparent" mode='bg-corn-flower text-white rounded-md' />
                        <UserLocationMap userPosition={userPosition} setUserPosition={setUserPosition} submitHandler={submitHandler} />
                    </div>
                </div>
            </Modal>
        </div>
    )
}
