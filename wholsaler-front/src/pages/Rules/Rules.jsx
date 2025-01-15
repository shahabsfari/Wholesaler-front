import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'

export default function Rules() {
    return (
        <div className='font-Dana flex flex-col min-h-screen'>
            <div className='flex-1'>
                <Navbar />
                <div className='custome-container md:px-16 text-justify '>
                    <div className='rounded-lg flex flex-col my-2 gap-5 font-Dana border-2 border-corn-flower p-10'>
                        <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
                            <h1 className="text-2xl font-bold text-gray-800 mb-4">قوانین و مقررات</h1>
                            <p className="text-gray-600 mb-6">
                                به سایت <span className="font-semibold">www.poorjalil.com</span> خوش آمدید! استفاده از خدمات و محصولات ارائه‌شده در این سایت به منزله‌ی پذیرش قوانین و مقررات زیر است. لطفاً قبل از استفاده، این قوانین را به دقت مطالعه کنید.
                            </p>

                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-gray-700 mb-2">۱. ثبت سفارش</h2>
                                <ul className="list-disc list-inside text-gray-600 space-y-1">
                                    <li>ثبت سفارش تنها از طریق وب‌سایت رسمی <span className="font-semibold">www.poorjalil.com</span> امکان‌پذیر است.</li>
                                    <li>اطلاعات واردشده در زمان ثبت سفارش باید دقیق و صحیح باشد. مسئولیت صحت اطلاعات بر عهده کاربر است.</li>
                                    <li>سفارش‌های ثبت‌شده پس از تایید نهایی قابل پردازش و ارسال هستند.</li>
                                </ul>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-gray-700 mb-2">۲. شرایط پرداخت</h2>
                                <ul className="list-disc list-inside text-gray-600 space-y-1">
                                    <li>پرداخت مبلغ سفارش به‌صورت آنلاین از طریق درگاه‌های معتبر بانکی انجام می‌شود.</li>
                                    <li>در صورت بروز مشکل در پرداخت، تیم پشتیبانی آماده‌ی راهنمایی و رفع مشکل است.</li>
                                </ul>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-gray-700 mb-2">۳. ارسال و تحویل</h2>
                                <ul className="list-disc list-inside text-gray-600 space-y-1">
                                    <li>سفارش‌ها طبق زمان‌بندی اعلام‌شده ارسال می‌شوند.</li>
                                    <li>مسئولیت تحویل صحیح سفارش تا درب آدرس اعلام‌شده بر عهده تیم ارسال است.</li>
                                </ul>
                            </div>
{/* 
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-gray-700 mb-2">۴. بازگشت و لغو سفارش</h2>
                                <ul className="list-disc list-inside text-gray-600 space-y-1">
                                    <li>امکان لغو سفارش تا قبل از ارسال آن وجود دارد.</li>
                                    <li>در صورت عدم رضایت از محصول دریافتی، مشتریان می‌توانند مطابق سیاست‌های بازگشت، درخواست خود را ثبت کنند.</li>
                                </ul>
                            </div> */}

                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-gray-700 mb-2">۴. حقوق مالکیت</h2>
                                <p className="text-gray-600">
                                    تمامی محتوا، تصاویر، و اطلاعات موجود در سایت متعلق به <span className="font-semibold">www.poorjalil.com</span> است و هرگونه استفاده غیرمجاز از آن‌ها ممنوع است.
                                </p>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-gray-700 mb-2">۵. حریم خصوصی</h2>
                                <p className="text-gray-600">
                                    اطلاعات شخصی کاربران محرمانه بوده و تنها برای پردازش سفارش‌ها و بهبود خدمات استفاده می‌شود. جزئیات بیشتر در بخش
                                    <span className="font-semibold">حریم خصوصی</span> سایت توضیح داده شده است.
                                </p>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-gray-700 mb-2">۶. تغییر قوانین</h2>
                                <p className="text-gray-600">
                                    <span className="font-semibold">www.poorjalil.com</span> حق دارد قوانین و مقررات را در هر زمان به‌روزرسانی کند. کاربران موظف‌اند پیش از هر خرید، قوانین جاری را مطالعه کنند.
                                </p>
                            </div>

                            <p className="text-gray-600">
                                با استفاده از خدمات سایت، شما تأیید می‌کنید که این قوانین را خوانده و با آن‌ها موافق هستید.
                            </p>

                            <p className="text-gray-800 font-bold mt-4">تیم www.poorjalil.com برای ارائه بهترین خدمات و محصولات همراه شماست.</p>
                        </div>

                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}
