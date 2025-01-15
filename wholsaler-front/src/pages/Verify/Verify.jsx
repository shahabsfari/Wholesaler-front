import React, { useContext, useEffect } from 'react'
import Swal from "sweetalert2";
import AuthContext from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
export default function Verify() {
    const { user, userloading } = useContext(AuthContext)
    const navigate = useNavigate();

    const verifyPayment = async () => {
        if (user !== null && userloading === false) {
            try {
                // دریافت Query Parameters از URL
                const urlParams = new URLSearchParams(window.location.search);
                const authority = urlParams.get("Authority");
                const status = urlParams.get("Status");

                if (!authority || !status) {
                    Swal.fire("خطا", "پارامترهای لازم در URL موجود نیستند", "error");
                    return;
                }

                // ذخیره پارامترها (مثال: در localStorage)
                localStorage.setItem("paymentAuthority", authority);
                localStorage.setItem("paymentStatus", status);

                // ارسال درخواست به API
                const response = await fetch("/api/payment/verifyPayment", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${user.token}`,
                    },
                    body: JSON.stringify({
                        authority,
                        status,
                    }),
                });

                const data = await response.json();
                console.log(data)
                // بررسی نتیجه API
                if (response.ok && data.hasError === false) {
                    const result = data.message; // مقدار "ok" یا "nOk"

                    if (result.toLowerCase() === "ok") {
                        Swal.fire({
                            title: 'پرداخت با موفقیت انجام شد!',
                            text: 'از خرید شما متشکریم.',
                            icon: 'success',
                            confirmButtonText: 'تایید',
                        }).then((result) => {

                            if (result.isConfirmed) {
                                navigate('/');
                            }
                        });

                    } else if (result.toLowerCase() === "nok") {
                        Swal.fire({
                            title: 'پرداخت ناموفق!',
                            text: 'متاسفانه پرداخت شما با مشکل مواجه شد. لطفاً دوباره تلاش کنید.',
                            icon: 'error',
                            confirmButtonText: 'تایید',
                        }).then((result) => {

                            if (result.isConfirmed) {
                                navigate('/');
                            }
                        });
                    } else {
                        Swal.fire({
                            title: 'پاسخ نامعتبر از سرور دریافت شد!',
                            text: 'متاسفانه پاسخ دریافتی از سرور معتبر نمی‌باشد. لطفاً دوباره تلاش کنید.',
                            icon: 'error',
                            confirmButtonText: 'تایید',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                navigate('/');
                            }
                        });
                    }
                } else {
                    Swal.fire({
                        title: 'خطایی در فرآیند تایید پرداخت رخ داد!',
                        text: 'متاسفانه مشکلی در فرآیند تایید پرداخت شما پیش آمده است. لطفاً دوباره تلاش کنید.',
                        icon: 'error',
                        confirmButtonText: 'تایید',
                    }).then((result) => {

                        if (result.isConfirmed) {
                            navigate('/');
                        }
                    });
                }
            } catch (error) {
                // مدیریت خطاهای شبکه یا سرور
                Swal.fire({
                    title: 'خطایی در اتصال به سرور رخ داد!',
                    text: 'متاسفانه اتصال به سرور برقرار نشد. لطفاً دوباره تلاش کنید.',
                    icon: 'error',
                    confirmButtonText: 'تایید',
                }).then((result) => {
                    // وقتی کاربر دکمه تایید را زد به صفحه اصلی هدایت می‌شود
                    if (result.isConfirmed) {
                        navigate('/'); // هدایت به صفحه اصلی
                    }
                });
                console.error("Error verifying payment:", error);
            }
        }
    };

    useEffect(() => {
        verifyPayment()
    }, [user])



    return (
        <div className='flex flex-col gap-5 justify-center items-center w-full h-screen font-Dana'>
            <div className='text-xl md:text-3xl '>
                لطفا منتظر بمانید ...
            </div>
            <div className='text-xl'>
                در حال برسی وضعیت پرداخت شما هستیم. این فرانید ممکن است چند لحظه طول بکشد. لطفا صفحه را نبندیدو منتظر نتیجه بمانید.
            </div>

        </div>
    )
}
