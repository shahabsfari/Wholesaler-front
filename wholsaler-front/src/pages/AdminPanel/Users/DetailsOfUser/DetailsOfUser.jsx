import React, { useContext, useEffect, useState } from 'react'
import InputText from '../../../../Components/InputText/InputText'
import AuthContext from '../../../../AuthContext'
import DropDown from '../../../../Components/PAdmin/DropDown/DropDown'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import ProductInOrder from '../../../../Components/PAdmin/ProductInOrder/ProductInOrder'
import MapButtton from '../../../../Components/PAdmin/MapButtton/MapButtton'
import Swal from 'sweetalert2'
import LoadingSec from '../../../../Components/LoadingSec/LoadingSec'
export default function DetailsOfUser() {
    const { user, targetUser } = useContext(AuthContext)
    const [ customerFetchLoading , setCustomerFetchLoading] = useState(true)
    const location = useLocation()
    const { userInfo } = location.state || {};
    console.log("targetUser in detail :", targetUser)
    console.log("userInfo in detail :", userInfo)
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [id, setId] = useState('')
    const [phone, setPhone] = useState('')
    const [role, setRole] = useState('')
    const [adress, setAdress] = useState('')
    const [customerData, setCustomerData] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    // const [order, setOrder] = useState(location.state || {})
    // const [status, setStatus] = useState(order["status"])
    const navigate = useNavigate();
    const data = [
        {
            status: "در حال ارسال",
            paymentType: "پرداخت اینترنتی",
            customer: {
                customerCode: "40124073",
                name: "شهاب",
                lastName: "صفری",
                phoneNumber: "09361310919",
                address: "استان سمنان / شاهرود / پیشوا / خیابان امام علی / روبه روی داروخانه"
            },
            orderCode: "234214",
            date: {
                day: "11",
                month: "شهریور",
                year: "1403"
            },
            totalValue: "2,356,000",
            orders: [
                {
                    productCode: "2343",
                    title: "روغن سرخ کردنی اویلا ، فراوری شده از دل طبیعت",
                    price: "27,000",
                    quantityPerPack: 24,
                    numOfPurchases: 3,
                    src: "../../images/products/spageti.webp"
                },
                {
                    productCode: "2343",
                    title: "روغن سرخ کردنی اویلا ، فراوری شده از دل طبیعت",
                    price: "27,000",
                    quantityPerPack: 24,
                    numOfPurchases: 3,
                    src: "../../images/products/spageti.webp"
                },
                {
                    productCode: "2343",
                    title: "روغن سرخ کردنی اویلا ، فراوری شده از دل طبیعت",
                    price: "27,000",
                    quantityPerPack: 24,
                    numOfPurchases: 3,
                    src: "../../images/products/spageti.webp"
                },
                {
                    productCode: "2343",
                    title: "روغن سرخ کردنی اویلا ، فراوری شده از دل طبیعت",
                    price: "27,000",
                    quantityPerPack: 24,
                    numOfPurchases: 3,
                    src: "../../images/products/spageti.webp"
                },
                {
                    productCode: "2343",
                    title: "روغن سرخ کردنی اویلا ، فراوری شده از دل طبیعت",
                    price: "567,000",
                    quantityPerPack: 24,
                    numOfPurchases: 3,
                    src: "../../images/products/spageti.webp"
                }
            ]
        }

    ]
    const handleClick = (index) => {
        navigate("/p-admin/users/ordersOfUsers", { state: userInfo });
    };
    const order =
    {
        "customer": {
            "customerCode": "40124073",
            "name": "شهاب",
            "lastName": "صفری",
            "phoneNumber": "09361310919",
            "address": {
                "province": "سمنان",
                "city": "شاهرود",
                "addressText": "استان سمنان / شاهرود / پیشوا / خیابان امام علی / روبه روی داروخانه",
                "longitude": 36.385088,
                "lattude": 54.918241
            }
        },
        "products": [
            {
                productCode: "2343",
                title: "روغن سرخ کردنی اویلا ، فراوری شده از دل طبیعت",
                price: "27,000",
                quantityPerPack: 24,
                numOfPurchases: 3,
                src: "../../images/products/spageti.webp"
            },
            {
                productCode: "2343",
                title: "روغن سرخ کردنی اویلا ، فراوری شده از دل طبیعت",
                price: "27,000",
                quantityPerPack: 24,
                numOfPurchases: 3,
                src: "../../images/products/spageti.webp"
            },
            {
                productCode: "2343",
                title: "روغن سرخ کردنی اویلا ، فراوری شده از دل طبیعت",
                price: "27,000",
                quantityPerPack: 24,
                numOfPurchases: 3,
                src: "../../images/products/spageti.webp"
            },
            {
                productCode: "2343",
                title: "روغن سرخ کردنی اویلا ، فراوری شده از دل طبیعت",
                price: "27,000",
                quantityPerPack: 24,
                numOfPurchases: 3,
                src: "../../images/products/spageti.webp"
            },
            {
                productCode: "2343",
                title: "روغن سرخ کردنی اویلا ، فراوری شده از دل طبیعت",
                price: "567,000",
                quantityPerPack: 24,
                numOfPurchases: 3,
                src: "../../images/products/spageti.webp"
            }
        ],
        "status": "تحویل‌نشده",
        "orderCode": "2670356109",
        "price": "2,356,000"
    }
    useEffect(() => {
        if (userInfo !== undefined) {
            setPhone(userInfo.username)
            setRole(userInfo.role === "ADMIN" ? "ادمین" : "کاربر عادی")
        }
    }, [userInfo])


    const handleChangePassword = async () => {
        const { value: newPassword } = await Swal.fire({
            title: "<span style='color: #f1c40f;'>رمز عبور جدید</span>",
            html: `
                <label style="color: #ffffff; font-size: 14px;">لطفاً رمز عبور جدید خود را وارد کنید:</label>
                <input type="password" id="password-input" style="
                    width: 100%;
                    padding: 10px;
                    margin-top: 10px;
                    background-color: #2c2c2c;
                    color: #ffffff;
                    border: 1px solid #555;
                    border-radius: 5px;
                " placeholder="رمز عبور جدید" />
            `,
            background: "#1e1e1e",
            showCancelButton: true,
            confirmButtonText: "<span style='color: #fff;'>تغییر</span>",
            cancelButtonText: "<span style='color: #fff;'>لغو</span>",
            customClass: {
                popup: "dark-popup",
            },
            preConfirm: () => {
                const input = document.getElementById("password-input").value;
                if (!input) {
                    Swal.showValidationMessage("رمز عبور نمی‌تواند خالی باشد!");
                } else if (input.length < 8) {
                    Swal.showValidationMessage("رمز عبور باید حداقل 8 کاراکتر باشد!");
                }
                return input;
            },
        });

        if (newPassword) {
            if (user !== null) {
                try {
                    const response = await fetch(
                        `/api/user/change-password/${userInfo.id}`,
                        {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                                'Authorization': `Bearer ${user.token}`,
                            },
                            body: JSON.stringify({
                                newPassword: newPassword,
                            }),
                        }
                    );

                    const result = await response.json();

                    if (response.ok && result.status === "SUCCESS") {
                        Swal.fire({
                            icon: "success",
                            title: "<span style='color: #00ff00;'>موفق!</span>",
                            text: "رمز عبور با موفقیت تغییر یافت.",
                            background: "#1e1e1e",
                            color: "#ffffff",
                            confirmButtonText: "<span style='color: #fff;'>باشه</span>",
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "<span style='color: #ff6347;'>خطا!</span>",
                            text: result.message || "تغییر رمز عبور انجام نشد.",
                            background: "#1e1e1e",
                            color: "#ffffff",
                            confirmButtonText: "<span style='color: #fff;'>باشه</span>",
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "<span style='color: #ff6347;'>خطا در اتصال!</span>",
                        text: "مشکلی در ارتباط با سرور پیش آمده است.",
                        background: "#1e1e1e",
                        color: "#ffffff",
                        confirmButtonText: "<span style='color: #fff;'>باشه</span>",
                    });
                }
            }
        }
    };
    const updateUserRole = async () => {
        const userRole = role === "ادمین" ? "ADMIN" : "USER";
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
            // ارسال درخواست PUT به سرور
            const response = await fetch(`/api/user/${userInfo.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify({ role: userRole }),
            });

            const result = await response.json();

            // بررسی وضعیت پاسخ
            if (result.status === "SUCCESS" && !result.hasError) {
                Swal.fire({
                    icon: 'success',
                    title: 'موفقیت',
                    text: 'نقش کاربر با موفقیت به‌روزرسانی شد!',
                    confirmButtonText: 'باشه'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'خطا',
                    text: result.message || 'خطا در به‌روزرسانی نقش کاربر.',
                    confirmButtonText: 'باشه'
                });
            }
        } catch (error) {
            // مدیریت خطا در صورت عدم موفقیت درخواست
            Swal.fire({
                icon: 'error',
                title: 'خطا',
                text: 'مشکلی در ارسال درخواست به سرور رخ داده است.',
                confirmButtonText: 'باشه'
            });
        }
    };

    useEffect(() => {
        if (userInfo !== undefined) {
            const fetchCustomerData = async (userId) => {
                try {
                    setCustomerFetchLoading(true)
                    const response = await fetch(`/api/customer/user/${userId}`);
                    const data = await response.json();
                    console.log("Customer Data:", data.dataList[0]);

                    if (data.status === "SUCCESS" && !data.hasError) {
                        setCustomerData(data.dataList[0]);
                    } else {
                        console.error("Error fetching data customer :", data.message);
                        setCustomerData(null)
                        return null;
                    }
                } catch (error) {
                    console.error("Network error:", error);
                    setCustomerData(null)
                } finally{
                    setCustomerFetchLoading(false)
                }
            };
            fetchCustomerData(userInfo.id)
        }
    }, [userInfo])

    useEffect(() => {
        if (!customerFetchLoading) {
            console.log("customer data :" , customerData)
            setName(userInfo.firstName);
            setLastName(userInfo.lastName);
            setPhone(userInfo.username);
            setId(userInfo.id)
            if (customerData === null) {
                setAdress("آدرسی وجود ندارد")
                setLongitude(0)
                setLatitude(0)
            } else {
                if (customerData.address === null) {
                    setAdress("آدرسی وجود ندارد")
                    setLongitude(0)
                    setLatitude(0)
                } else {
                    setAdress(customerData.address)
                    setLongitude(customerData.latitude)
                    setLatitude(customerData.longitude)
                }
            }
        }
    }, [customerData])
    if (customerFetchLoading || userInfo === undefined) {
        return (
            <div className='flex absolute h-full inset-0 md:pr-40 justify-center items-center'>
                <LoadingSec />
            </div>
        )
    }
    return (
        <div className='w-full grid grid-cols-12 gap-4 p-5'>
            <InputText bg="bg-transparent" mode="bg-[#383854]" value={id} className=' col-span-6 sm:col-span-4 lg:col-span-2 font-Dana text-white  flex justify-center items-center child:text-center ' title=" کد مشتری" />
            <InputText bg="bg-transparent" mode="bg-[#383854]" value={name} className=' col-span-6 sm:col-span-4 lg:col-span-2 font-Dana text-white flex justify-center items-center child:text-center ' title="نام" />
            <InputText bg="bg-transparent" mode="bg-[#383854]" value={lastName} className=' col-span-6 sm:col-span-4 lg:col-span-2 font-Dana text-white flex justify-center items-center child:text-center ' title="نام‌خانوادگی" />
            <InputText  value={phone} bg="bg-transparent" mode="bg-[#383854]" className=' col-span-6 sm:col-span-4 lg:col-span-2 font-Dana text-white flex justify-center items-center child:text-center ' title=" شماره تماس" />
            <InputText  value={role} bg="bg-transparent" mode="bg-[#383854]" className=' col-span-6 sm:col-span-4 lg:col-span-2 font-Dana text-white flex justify-center items-center child:text-center ' title="نقش کاربر" />
            {/* <DropDown  value={role} classNameList="border-b top-[97%] w-[100.5%] border-x rounded-b-xl border-corn-flower " title="نقش کاربر" list={["ادمین", "کاربر عادی"]} className=" border-[1px] border-corn-flower col-span-6 sm:col-span-4 lg:col-span-2 font-Dana text-white flex justify-center items-center child:text-center " /> */}
            {/* <InputText bg="bg-transparent" mode="bg-[#383854]" value={order["orderCode"]} className=' col-span-6 sm:col-span-4 lg:col-span-2 font-Dana text-white flex justify-center items-center child:text-center ' title="تاریخ ثبت نام" /> */}
            <button onClick={handleChangePassword} className=' btn border-[1px] border-corn-flower  col-span-6 sm:col-span-4 lg:col-span-2 font-Dana text-white flex justify-center items-center child:text-center '>تغییر رمز عبور</button>
            {/* <InputText bg="bg-transparent" mode="bg-[#383854]" value={order["price"]} className=' col-span-6 sm:col-span-4 lg:col-span-2 font-Dana text-white flex justify-center items-center child:text-center ' title="کل مبلغ سفارش داده" /> */}
            {/* addreses */}
            <div className='col-span-12 grid grid-cols-12 max-h-[325px] pt-4 overflow-y-auto'>
                <div className='col-span-12 grid grid-cols-12 gap-4 '>
                    <InputText bg="bg-transparent" mode="bg-[#383854]" value={adress} className='col-span-12 lg:col-span-10 font-Dana text-white' title="آدرس" />
                    <MapButtton latitude={latitude} longitude={longitude} className=" col-span-12  lg:col-span-2" />
                </div>
            </div>
            <button onClick={() => handleClick(0)} className='col-span-6 btn font-Dana' > سفارش های کاربر</button>
            {/* <button onClick={() => updateUserRole()} className='col-span-6 btn font-Dana' >ثبت تغیرات</button> */}
        </div>
    )
}
