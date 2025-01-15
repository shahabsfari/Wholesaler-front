import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'

export default function AboutUs() {
    return (
        <div className='font-Dana flex flex-col min-h-screen'>
            <div className='flex-1'>
                <Navbar />
                <div className='custome-container md:px-16 text-justify '>
                    <div className='rounded-lg flex flex-col my-2 gap-5 font-Dana border-2 border-corn-flower p-10'>
                        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">درباره ما</h1>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            به سایت <span className="font-semibold">www.poorjalil.com</span> خوش آمدید!
                            ما در <span className="font-semibold">www.poorjalil.com</span> با افتخار به ارائه‌ی محصولات غذایی باکیفیت و متنوع برای تمامی نیازهای شما مشغول هستیم. هدف ما این است که بهترین مواد غذایی را از معتبرترین تولیدکنندگان و تامین‌کنندگان به دست شما برسانیم و تجربه‌ای عالی از خرید آنلاین را برای شما فراهم کنیم.
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">ماموریت ما</h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            ماموریت ما ارائه محصولات تازه و باکیفیت است که پاسخگوی نیازهای روزمره خانواده‌ها باشد. ما باور داریم که تغذیه سالم پایه یک زندگی سالم است و تمامی تلاش ما برای ارائه بهترین خدمات به مشتریان عزیز است.
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">چرا ما را انتخاب کنید؟</h2>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            <li>محصولات تازه و باکیفیت</li>
                            <li>تحویل سریع و مطمئن</li>
                            <li>پشتیبانی ۲۴/۷</li>
                            <li>قیمت‌های رقابتی</li>
                        </ul>

                        <div className="mt-6">
                            <h2 className="text-2xl font-semibold text-gray-700 mb-4">با ما در ارتباط باشید</h2>
                            <p className="text-gray-600 leading-relaxed">
                                اگر سوال یا نظری دارید، لطفاً از طریق بخش <span className="font-semibold">تماس با ما</span> یا شماره‌های تماس ما، با تیم پشتیبانی در ارتباط باشید. خوشحالیم که بخشی از سفر شما به سمت تغذیه سالم‌تر هستیم!
                            </p>
                        </div>

                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}
