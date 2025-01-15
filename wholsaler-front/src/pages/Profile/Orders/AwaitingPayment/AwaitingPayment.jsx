import React, { useContext, useEffect, useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { FaTruck } from "react-icons/fa";
import AuthContext from '../../../../AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingSec from '../../../../Components/LoadingSec/LoadingSec';
import PaginationButtons from '../../../../Components/PaginationButtons/PaginationButtons';
export default function AwaitingPayment() {
    const [fetchLoading, setFetchLoading] = useState(true)
    const [error, setError] = useState(null);
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

    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };


    const { screen, invoices, convertToJalali, isLoggedIn, customerData, loadingCustomerData } = useContext(AuthContext);
    const [notDeliverdInvoices, setNotDeliverdInvoices] = useState([])
    // console.log("invoices:", invoices)
    const deliverd = invoices.filter((invoice) => invoice.status === 'PAID_NOT_DELIVERED');

    // console.log(deliverd)

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
        console.log(order)
        navigate("/profile/ordersOfUsersProf", { state: order });
    };

    const fetchOrders = async (pageSize, pageNumber, only = -1) => {
        try {
            const response = await fetch(`/api/invoice/customer/${customerData.id}?${only === -1 ? null : `only=${only}&`}pageSize=${pageSize}&pageNumber=${pageNumber}`);
            const data = await response.json();

            if (data.status === 'SUCCESS' && !data.hasError) {
                setTotal(data.totalCount)
                const enrichedInvoices = await Promise.all(
                    data.dataList.map(async (invoice) => {
                        let totalPrice = 0;
                        // برای هر محصول در orderItems، اطلاعات محصول را دریافت و تصویر را اضافه کن
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
                return (enrichedInvoices);
            } else {
                setError(data.message || 'Failed to fetch orders');
                return null;
            }
        } catch (error) {
            setError('Error fetching orders');
            return null;
            console.error(error);
        } finally {
            setFetchLoading(false)
        }
    };


    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAndSetOrders = async () => {
            if (customerData !== null && isLoggedIn) {
                setLoading(true)
                try {
                    const orders = await fetchOrders(itemsPerPage, currentPage, 1);
                    // console.log(orders)
                    setNotDeliverdInvoices(orders);
                } catch (error) {
                    console.error("Error fetching orders:", error);
                } finally {
                    setLoading(false)
                }
            }
        };

        fetchAndSetOrders();
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



    if (loadingCustomerData || loading) {
        return (
            <div className='w-full h-full '>
                <LoadingSec className='h-fit' />
            </div>
        )
    }
    return (
        <div className='flex flex-col h-full justify-between w-full p-3 gap-3'>
            {
                notDeliverdInvoices.length === 0 ? (
                    <div className='w-full p-10 text-center md:text-xl rounded-xl border-2 border-corn-flower'>
                        هیچ سفارش در حال ارسالی وجود ندارد
                    </div>
                ) : null
            }
            {
                notDeliverdInvoices.map((order, index) => (
                    <div key={index} onClick={() => handleClick(order)} className='cursor-pointer border-[1px] flex flex-col gap-1 border-blue-400/70 rounded-lg p-2 px-4'>
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
                            <span className='order-last sm:order-first col-span-4 lg:col-span-3 xl:col-span-2 flex font-Dana gap-1' >
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
                                    {formatNumber(order.totalPrice)}
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
            }
            {
                notDeliverdInvoices.length === 0 ? null : (
                    <PaginationButtons nextAndLeft='bg-gray-100' pageCount={Math.ceil(total / itemsPerPage)} currentPage={currentPage} handlePageClick={handlePageClick} />
                )
            }
        </div>
    )
}
