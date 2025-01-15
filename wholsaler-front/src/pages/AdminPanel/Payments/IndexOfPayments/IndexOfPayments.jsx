import React, { useContext, useEffect, useState } from 'react'
import TopBarInPayments from '../../../../Components/PAdmin/TopBarInPayments/TopBarInPayments'
import PaymentList from '../../../../Components/PAdmin/PaymentList/PaymentList'
import PaginationButtons from '../../../../Components/PaginationButtons/PaginationButtons'
import AuthContext from '../../../../AuthContext'
export default function Index() {
  const { user, loading, userloading, isLoggedIn, formatNumber } = useContext(AuthContext)
  const [payments, setPayments] = useState([]);

  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = sessionStorage.getItem("selectorInvoiceInPAdminPage");
    return savedPage ? Number(savedPage) : 0;
  });

  const [totalInvoces, setTotalInvoces] = useState(0);
  const itemsPerPage = 8;

  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    setCurrentPage(selectedPage);
    sessionStorage.setItem("selectorInvoiceInPAdminPage", selectedPage);
  };

  // useEffect(() => {
  //     if (!loading && !userloading) {
  //         console.log(user.token)
  //         const fetchPayments = async () => {
  //             try {
  //                 const response = await fetch('/api/invoice', {
  //                     headers: {
  //                         'Authorization': `Bearer ${user.token}`,
  //                     }
  //                 });
  //                 const data = await response.json();
  //                 if (data.status === "SUCCESS") {
  //                     setPayments(data.dataList);
  //                     setTotalPayments(data.totalCount);
  //                 }
  //             } catch (error) {
  //                 console.error("Error fetching payments:", error);
  //             }
  //         };
  //         fetchPayments();
  //     }
  // }, [currentPage, loading]);

  const [invoices, setInvoices] = useState([]);
  const [invoicesLoading, setInvoicesLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all orders on page load

  useEffect(() => {
    if (user !== null) {
      const fetchOrders = async () => {
        try {
          setInvoicesLoading(true)
          const response = await fetch(`/api/invoice?pageSize=${itemsPerPage}&pageNumber=${currentPage}`);
          const data = await response.json();
          console.log("focus:" , data)
          if (data.status === 'SUCCESS' && !data.hasError) {
            setTotalInvoces(data.totalCount)
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
            setInvoices(enrichedInvoices);
          } else {
            setError(data.message || 'Failed to fetch orders');
          }
        } catch (error) {
          setError('Error fetching orders');
          console.error(error);
        } finally {
          setInvoicesLoading(false)
        }
      };

      fetchOrders();
    }
  }, [user , currentPage]);

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


  // useEffect(() => {
  //     if (!userloading && isLoggedIn) {
  //         setInvoicesLoading(true)
  //         const fetchOrders = async () => {
  //             try {
  //                 const response = await fetch('/api/invoice', {
  //                     headers: {
  //                         'Authorization': `Bearer ${user.token}`,
  //                     }
  //                 });
  //                 const result = await response.json();
  //                 if (result.status === "SUCCESS") {
  //                     const orders = result.dataList;

  //                     // Store invoices
  //                     setInvoices(orders);

  //                     // Extract unique product IDs
  //                     const productIds = Array.from(
  //                         new Set(
  //                             orders.flatMap((order) =>
  //                                 order.orderItems.map((item) => item.productId)
  //                             )
  //                         )
  //                     );

  //                     // Fetch product details and update invoices
  //                     await fetchProductDetails(orders, productIds);
  //                 } else {
  //                     setError(result.message || "Failed to fetch orders");
  //                 }
  //             } catch (error) {
  //                 setError("Error fetching orders");
  //                 console.error(error);
  //             } finally {
  //                 setInvoicesLoading(false)
  //             }
  //         };
  //         fetchOrders();
  //     }
  // }, [userloading]);

  // const fetchProductDetails = async (orders, productIds) => {
  //     try {
  //         const productDetails = await Promise.all(
  //             productIds.map(async (id) => {
  //                 const response = await fetch(
  //                       `/api/product/${id}`, {
  //                     headers: {
  //                         'Authorization': `Bearer ${user.token}`,
  //                     }
  //                 }
  //                 );
  //                 const result = await response.json();
  //                 if (result.status === "SUCCESS") {
  //                     const product = result.dataList[0];

  //                     // Fetch image for the product
  //                     const imageName = await fetchImage(product.image);

  //                     return { ...product, imageName };
  //                 } else {
  //                     console.error(result.message || `Failed to fetch product ${id}`);
  //                     return null;
  //                 }
  //             })
  //         );

  //         // Merge product details into orders
  //         const updatedOrders = orders.map((order) => ({
  //             ...order,
  //             orderItems: order.orderItems.map((item) => {
  //                 const product = productDetails.find(
  //                     (prod) => prod && prod.id === item.productId
  //                 );
  //                 return { ...item, productDetails: product };
  //             }),
  //         }));

  //         setInvoices(updatedOrders);
  //     } catch (error) {
  //         setError("Error fetching product details");
  //         console.error(error);
  //     }
  // };

  // const fetchImage = async (image) => {
  //     try {
  //         const response = await fetch(
  //               `/api/filehandler/files/${image}`
  //         );
  //         if (response.status === 200) {
  //             return response.url;
  //         } else {
  //             console.error("Failed to fetch image:", image);
  //             return null;
  //         }
  //     } catch (error) {
  //         console.error("Error fetching image:", error);
  //         return null;
  //     }
  // };

  // useEffect(() => {
  //     if (!invoicesLoading){            
  //         // محاسبه مجموع خرید برای هر سفارش
  //         const updatedOrders = invoices.map((order) => {
  //           const totalAmount = order.orderItems.reduce((sum, item) => {
  //             return sum + item.count * item.productDetails.priceWithDiscount;
  //           }, 0);

  //           return { ...order, totalAmount: formatNumber(totalAmount) };
  //         });

  //         setInvoices(updatedOrders);
  //     }
  //   }, [invoicesLoading]);

  console.log("invoices iiii:", invoices)
  return (
    <div className='h-full  flex flex-col'>
      <TopBarInPayments />
      <div className='flex flex-col h-full justify-between flex-1 pt-10'>
        <PaymentList invoicesLoading={invoicesLoading} invoices={invoices} />
        <PaginationButtons nextAndLeft='bg-gray-100' pageCount={Math.ceil( totalInvoces / itemsPerPage)} currentPage={currentPage} handlePageClick={handlePageClick} />
      </div>
    </div>
  )
}
