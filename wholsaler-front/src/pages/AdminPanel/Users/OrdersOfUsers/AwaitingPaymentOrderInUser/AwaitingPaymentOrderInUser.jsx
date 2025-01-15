import React, { useContext, useEffect, useState } from 'react'
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { FaTruck } from "react-icons/fa";
import AuthContext from '../../../../../AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import PaginationButtons from '../../../../../Components/PaginationButtons/PaginationButtons';
import LoadingSec from '../../../../../Components/LoadingSec/LoadingSec';
export default function AwaitingPaymentOrderInUser() {
    const { user, isLoggedIn, targetUser, formatNumber, convertToJalali } = useContext(AuthContext)
    const [invoices, setInvoices] = useState([]);
    const [invoiceLoading, setInvoiceLoading] = useState(true);
    const [fetchLoading, setFetchLoading] = useState(true)
    const [error, setError] = useState(null);
    const [customerData, setCustomerData] = useState([])
    const [customerFetchLoading, setCustomerFetchLoading] = useState(true)
    const [total, setTotal] = useState(0)

    const [currentPage, setCurrentPage] = useState(() => {
        const savedPage = sessionStorage.getItem("selectorInvoiceNotDeliverdInPAdminPage");
        return savedPage ? Number(savedPage) : 0;
    });

    const [totalInvoces, setTotalInvoces] = useState(0);
    const itemsPerPage = 3;

    const handlePageClick = (event) => {
        const selectedPage = event.selected;
        setCurrentPage(selectedPage);
        sessionStorage.setItem("selectorInvoiceNotDeliverdInPAdminPage", selectedPage);
    };

    const location = useLocation();
    const userInfo = location.state || '';
    console.log(userInfo)

    useEffect(() => {
        if (targetUser !== null) {
            const fetchCustomerData = async (userId) => {
                try {
                    const response = await fetch(`/api/customer/user/${userId}`);
                    const data = await response.json();
                    console.log("Customer Data:", data.dataList[0]);

                    if (data.status === "SUCCESS" && !data.hasError) {
                        setCustomerData(data.dataList[0]);
                        setCustomerFetchLoading(false)
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
            fetchCustomerData(targetUser.id)
        }
    }, [targetUser])

    useEffect(() => {
        if ((customerData !== null) && isLoggedIn) {
            const fetchOrders = async () => {
                try {
                    setInvoiceLoading(true)
                    const response = await fetch(`/api/invoice/customer/${customerData.id}?only=1&pageSize=${itemsPerPage}&pageNumber=${currentPage}`);
                    const data = await response.json();
                    console.log("data only awating :", data)
                    if (data.status === 'SUCCESS' && !data.hasError) {
                        setTotal(data.totalCount)
                        const enrichedInvoices = await Promise.all(
                            data.dataList.map(async (invoice) => {
                                let totalPrice = 0;
                                const updatedOrderItems = await Promise.all(
                                    invoice.orderItems.map(async (item) => {
                                        const productDetails = await fetchProductDetails(item.productId);
                                        const imageUrl = await fetchImage(productDetails.image);
                                        totalPrice += item.count * productDetails.priceWithDiscount;
                                        return { ...item, productDetails, imageName: imageUrl };
                                    })
                                );
                                return { ...invoice, orderItems: updatedOrderItems, totalPrice };
                            })
                        );
                        setInvoices(enrichedInvoices);
                    } else {
                        setError(data.message || 'Failed to fetch orders');
                    }
                } catch (error) {
                    setError('Error fetching orders');
                    console.error(error);
                } finally {
                    setInvoiceLoading(false)
                }
            };

            fetchOrders();
        }
    }, [customerData, currentPage]);

    // تابع برای دریافت جزئیات محصول
    const fetchProductDetails = async (productId) => {
        try {
            const response = await fetch(`/api/product/${productId}`);
            const data = await response.json();

            if (data.status === 'SUCCESS' && !data.hasError) {
                return data.dataList[0];
            } else {
                setError(data.message || 'Failed to fetch product details');
                return null;
            }
        } catch (error) {
            setError('Error fetching product details');
            console.error(error);
            return null;
        }
    };

    // تابع برای دریافت تصویر محصول
    const fetchImage = async (image) => {
        try {
            const response = await fetch(`/api/filehandler/files/${image}`);
            if (response.ok) {
                return response.url;
            } else {
                setError('Failed to fetch image');
                return null;
            }
        } catch (error) {
            setError('Error fetching image');
            console.error(error);
            return null;
        }
    };

    const timeConvert = (dateTime) => {
        const { jalaliDate, jalaliTime } = convertToJalali(dateTime);
        return (jalaliDate + " " + jalaliTime)
    }

    const loacation = useLocation()
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
                    src: "../../../images/products/spageti.webp"
                },
                {
                    productCode: "2343",
                    title: "روغن سرخ کردنی اویلا ، فراوری شده از دل طبیعت",
                    price: "27,000",
                    quantityPerPack: 24,
                    numOfPurchases: 3,
                    src: "../../../images/products/spageti.webp"
                },
                {
                    productCode: "2343",
                    title: "روغن سرخ کردنی اویلا ، فراوری شده از دل طبیعت",
                    price: "27,000",
                    quantityPerPack: 24,
                    numOfPurchases: 3,
                    src: "../../../images/products/spageti.webp"
                },
                {
                    productCode: "2343",
                    title: "روغن سرخ کردنی اویلا ، فراوری شده از دل طبیعت",
                    price: "27,000",
                    quantityPerPack: 24,
                    numOfPurchases: 3,
                    src: "../../../images/products/spageti.webp"
                },
                {
                    productCode: "2343",
                    title: "روغن سرخ کردنی اویلا ، فراوری شده از دل طبیعت",
                    price: "567,000",
                    quantityPerPack: 24,
                    numOfPurchases: 3,
                    src: "../../../images/products/spageti.webp"
                }
            ]
        }

    ]
    const { screen } = useContext(AuthContext)
    const [maxImage, setMaxImage] = useState(3)

    const handleResize = () => {
        if (screen >= 1224) {
            setMaxImage(7)
        } else if (screen >= 968) {
            setMaxImage(5)
        } else if (screen >= 768) {
            setMaxImage(4)
        } else {
            setMaxImage(3)
        }
    }

    useEffect(() => {
        handleResize()
    }, [screen])

    const navigate = useNavigate();

    const handleClick = (order) => {

        navigate("/p-admin/users/orderDetailsOfUsers", { state: order });
    };

    console.log("invoices awating:", invoices)

    return (
        <div className='h-full flex flex-col justify-between'>
            <div className='flex flex-1 flex-col w-full p-3 text-black gap-3 '>
                {
                    invoiceLoading ? (
                        <div className='flex absolute h-full inset-0 md:pr-40 justify-center items-center'>
                            <LoadingSec />
                        </div>
                    ) : (
                        invoices.length === 0 ? (
                            <div className='font-DanaMedium text-white flex-1 text-xl md:p-16 md:text-2xl h-full flex justify-center items-center'>
                                سفارشی جهت نمایش وجود ندارد
                            </div>
                        ) : (
                            invoices.map((order, index) => (
                                <div key={index} onClick={() => handleClick(order)} className='cursor-pointer bg-white border-[1px] flex flex-col gap-1 border-blue-400/70 rounded-lg p-2 px-4'>
                                    {/* top */}
                                    <div className='hidden w-full sm:flex justify-between items-center' >
                                        <span className='flex items-center gap-1 '>
                                            <FaTruck className='text-yellow-500' size={26} />
                                            در انتظار ارسال
                                        </span>
                                        <IoIosArrowBack size={20} />
                                    </div>
                                    {/* date and ... */}
                                    <div className='w-full grid grid-cols-12 gap-1 md:gap-4 '>
                                        <span className='order-last sm:order-first col-span-4 lg:col-span-3  flex font-Dana gap-1' >
                                            {
                                                convertToJalali(order.invoiceDate)

                                            }
                                        </span>
                                        <span className=' col-span-6  sm:col-span-4 lg:col-span-3 xl:col-span-2 '>
                                            کد‌سفارش: {order.id}
                                        </span>
                                        <span className='justify-end col-span-6 sm:col-span-4 lg:col-span-3 xl:col-span-2 flex gap-1 items-center'>
                                            <span>
                                                مبلغ:
                                            </span>
                                            <span>
                                                {formatNumber(order.totalAmount)}
                                            </span>
                                            <span className='text-xs'>
                                                تومان
                                            </span>
                                        </span>

                                    </div>
                                    {/* prouduct images */}
                                    <div className='w-full flex justify-between items-center gap-1 md:gap-x-2 '>
                                        <div className='flex'>
                                            {
                                                order.orderItems.map((product, index) => {

                                                    if (index + 1 <= maxImage) {
                                                        return (
                                                            <img className=' size-16 md:size-24' src={product.imageName} alt="product" />
                                                        )
                                                    } else {
                                                        return null
                                                    }
                                                })
                                            }
                                            {
                                                order.orderItems.length > maxImage ? (<div className='flex justify-center items-center text-xl'>... </div>) : null
                                            }
                                        </div>
                                        <div className='flex sm:hidden'>
                                            <IoIosArrowBack />
                                        </div>
                                    </div>
                                </div>
                            ))
                        )
                    )
                }
            </div>
            <PaginationButtons nextAndLeft='bg-gray-500' pageCount={Math.ceil(total / itemsPerPage)} currentPage={currentPage} handlePageClick={handlePageClick} />
        </div>
    )
}

