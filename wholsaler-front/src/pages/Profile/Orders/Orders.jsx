import React, { useContext, useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import AuthContext from '../../../AuthContext'
import LoadingSec from '../../../Components/LoadingSec/LoadingSec';
export default function Orders() {

  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = sessionStorage.getItem("selectorPageAwatingPayment");
    return savedPage ? Number(savedPage) : 0;
  });

  const [totalProducts, setTotalProducts] = useState(0);
  const itemsPerPage = 10;

  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    setCurrentPage(selectedPage);
    sessionStorage.setItem("selectorPageAwatingPayment", selectedPage);
  };




  // const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState(null);
  const [customerData, setCustomerData] = useState([])
  // const [fetchLoading, setFetchLoading] = useState(true)
  const [customerFetchLoading, setCustomerFetchLoading] = useState(true)
  const { user, userloading, isLoggedIn , invoices } = useContext(AuthContext)

  // console.log("invoices " , invoices)
  const location = useLocation();
  const checkActive = (text) => {
    return location.pathname.startsWith(text)
  }


  // useEffect(() => {
  //   if (!userloading && isLoggedIn) {
  //     const fetchCustomerData = async (userId) => {
  //       try {
  //         const response = await fetch(`/api/customer/user/${userId}`);
  //         const data = await response.json();
  //         console.log("data cusromer :", data)
  //         if (data.status === "SUCCESS" && !data.hasError) {
  //           setCustomerData(data.dataList[0]);
  //           setCustomerFetchLoading(false)
  //         } else {
  //           console.error("Error fetching data:", data.message);
  //           setCustomerData(null)
  //           return null;
  //         }
  //       } catch (error) {
  //         console.error("Network error:", error);
  //         setCustomerData(null)
  //       }
  //     };
  //     fetchCustomerData(user.id)
  //   }
  // }, [user])

  // useEffect(() => {
  //   if (customerData !== null) {
  //     const fetchOrders = async () => {
  //       try {
  //         const response = await fetch(`/api/invoice/customer/${customerData.id}`);
  //         const data = await response.json();
  //         console.log("data invoice : ", data)
  //         if (data.status === 'SUCCESS' && !data.hasError) {
  //           const enrichedInvoices = await Promise.all(
  //             data.dataList.map(async (invoice) => {
  //               // برای هر محصول در orderItems، اطلاعات محصول را دریافت و تصویر را اضافه کن
  //               const updatedOrderItems = await Promise.all(
  //                 invoice.orderItems.map(async (item) => {
  //                   const productDetails = await fetchProductDetails(item.productId);
  //                   const imageUrl = await fetchImage(productDetails.image);
  //                   return { ...item, productDetails, imageName: imageUrl };
  //                 })
  //               );
  //               return { ...invoice, orderItems: updatedOrderItems };
  //             })
  //           );
  //           setInvoices(enrichedInvoices);
  //         } else {
  //           setError(data.message || 'Failed to fetch orders');
  //         }
  //       } catch (error) {
  //         setError('Error fetching orders');
  //         console.error(error);
  //       } finally {
  //         setFetchLoading(false)
  //       }
  //     };

  //     fetchOrders();
  //   }
  // }, [customerData]);

  // // تابع برای دریافت جزئیات محصول
  // const fetchProductDetails = async (productId) => {
  //   try {
  //     const response = await fetch(`/api/product/${productId}`);
  //     const data = await response.json();

  //     if (data.status === 'SUCCESS' && !data.hasError) {
  //       return data.dataList[0];
  //     } else {
  //       setError(data.message || 'Failed to fetch product details');
  //       return null;
  //     }
  //   } catch (error) {
  //     setError('Error fetching product details');
  //     console.error(error);
  //     return null;
  //   }
  // };

  // // تابع برای دریافت تصویر محصول
  // const fetchImage = async (image) => {
  //   try {
  //     const response = await fetch(`/api/filehandler/files/${image}`);
  //     if (response.ok) {
  //       return response.url;
  //     } else {
  //       setError('Failed to fetch image');
  //       return null;
  //     }
  //   } catch (error) {
  //     setError('Error fetching image');
  //     console.error(error);
  //     return null;
  //   }
  // };

  // تفکیک سفارش‌ها بر اساس وضعیت
 
  
  const deliverd = invoices.filter((invoice) => invoice.status === 'PAID_AND_DELIVERED');
  const pendingDeliverd = invoices.filter((invoice) => invoice.status === 'PAID_NOT_DELIVERED');
  // console.log("invoices", invoices)
  // console.log("deliverd : ", deliverd)
  // console.log("pendingDeliverd : ", pendingDeliverd)

  // if (fetchLoading) {
  //   return <LoadingSec />
  // }
  return (
    <div className='w-full flex flex-col mt-4 sm:mt-0'>
      <div className='flex border-b-2 border-corn-flower '>
        <NavLink
          to="AwaitingPayment"
          className={`${checkActive("/profile/orders/AwaitingPayment") ? " text-white bg-corn-flower rounded-t-lg" : ""} px-5 py-2 cursor-pointer`}
          state={pendingDeliverd}
        >
          در انتظار ارسال
        </NavLink >
        <NavLink
          to="paid"
          className={`${checkActive("/profile/orders/paid") ? " text-white bg-corn-flower rounded-t-lg" : ""} px-5 py-2 cursor-pointer`}
          state={deliverd}
        >
          دریافت شده
        </NavLink >
        {/* <NavLink
          to="canceled"
          className={`${checkActive("/profile/orders/canceled") ? " text-white bg-corn-flower rounded-t-lg" : ""} px-5 py-2 cursor-pointer`}
          state={pendingDeliverd}
        >
          لغو شده
        </NavLink > */}
      </div>
      <Outlet />
    </div>
  )
}

