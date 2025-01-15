import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'

export default function Privacy() {
    return (
        <div className='font-Dana flex flex-col min-h-screen'>
            <div className='flex-1'>
                <Navbar />
                <div className='custome-container md:px-16 text-justify '>
                    <div className='rounded-lg flex flex-col my-2 gap-5 font-Dana border-2 border-corn-flower p-10'>
                        <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">قوانین و مقررات حریم خصوصی</h1>

                        <div class="space-y-4">
                            <p>
                                ما در این وب‌سایت متعهد به حفاظت از اطلاعات شخصی کاربران خود هستیم. اطلاعاتی که شما در اختیار ما قرار می‌دهید صرفاً برای ارائه خدمات بهتر مورد استفاده قرار می‌گیرد و تحت هیچ شرایطی بدون رضایت شما به اشتراک گذاشته نمی‌شود.
                            </p>
                            <h2 class="text-xl font-semibold text-gray-700">جمع‌آوری اطلاعات</h2>
                            <p>
                                هنگام استفاده از وب‌سایت، ممکن است اطلاعاتی نظیر نام، ایمیل، شماره تماس و آدرس شما جمع‌آوری شود. این اطلاعات برای ارائه خدمات و بهبود تجربه کاربری شما مورد استفاده قرار می‌گیرد.
                            </p>
                            <h2 class="text-xl font-semibold text-gray-700">استفاده از اطلاعات</h2>
                            <p>
                                اطلاعات شما برای اهداف زیر استفاده می‌شود:
                            </p>
                            <ul class="list-disc list-inside ml-4">
                                <li>پردازش سفارشات و ارائه خدمات</li>
                                <li>ارتباط با شما در خصوص خدمات</li>
                                <li>بهبود عملکرد و محتوای وب‌سایت</li>
                            </ul>
                            <h2 class="text-xl font-semibold text-gray-700">امنیت اطلاعات</h2>
                            <p>
                                ما تمام تلاش خود را می‌کنیم تا اطلاعات شما را در برابر دسترسی‌های غیرمجاز محافظت کنیم. استفاده از روش‌های امنیتی مناسب تضمین می‌کند که اطلاعات شما به‌طور امن ذخیره شوند.
                            </p>
                            <h2 class="text-xl font-semibold text-gray-700">کوکی‌ها</h2>
                            <p>
                                وب‌سایت ما ممکن است از کوکی‌ها برای بهبود تجربه کاربری شما استفاده کند. کوکی‌ها اطلاعاتی کوچک هستند که در مرورگر شما ذخیره می‌شوند و به ما کمک می‌کنند خدمات بهتری ارائه دهیم.
                            </p>
                            <h2 class="text-xl font-semibold text-gray-700">تغییرات در سیاست‌ها</h2>
                            <p>
                                ما ممکن است در هر زمان سیاست‌های حریم خصوصی خود را به‌روزرسانی کنیم. لطفاً به‌طور منظم به این صفحه مراجعه کنید تا از تغییرات آگاه شوید.
                            </p>
                            <p class="text-sm text-gray-600 mt-6">
                                آخرین به‌روزرسانی: <span class="font-medium">12 آذر 1403</span>
                            </p>
                        </div>

                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}
