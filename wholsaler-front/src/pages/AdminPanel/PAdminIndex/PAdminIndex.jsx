import React, { useContext, useEffect, useState } from 'react'
import moment from 'jalali-moment'
import PaymentList from '../../../Components/PAdmin/PaymentList/PaymentList';
import UsersList from "../../../Components/PAdmin/UsersList/UsersList"
import AuthContext from '../../../AuthContext';
export default function PAdminIndex() {
  // const [todayJalali , setTodayJalali] = useState(new Date())

  const { user, loading, userloading, isLoggedIn, formatNumber } = useContext(AuthContext)
  const [invoices, setInvoices] = useState([]);
  const [invoicesLoading, setInvoicesLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all orders on page load
  useEffect(() => {
    if (!userloading && isLoggedIn) {
      setInvoicesLoading(true)
      const fetchOrders = async () => {
        try {
          const response = await fetch('/api/invoice', {
            headers: {
              'Authorization': `Bearer ${user.token}`,
            }
          });
          const result = await response.json();
          console.log("result" , result)
          if (result.status === "SUCCESS") {
            const orders = result.dataList;

            // Store invoices
            setInvoices(orders);

            // Extract unique product IDs
            const productIds = Array.from(
              new Set(
                orders.flatMap((order) =>
                  order.orderItems.map((item) => item.productId)
                )
              )
            );

            // Fetch product details and update invoices
            await fetchProductDetails(orders, productIds);
          } else {
            setError(result.message || "Failed to fetch orders");
          }
        } catch (error) {
          setError("Error fetching orders");
          console.error(error);
        } finally {
          setInvoicesLoading(false)
        }
      };
      fetchOrders();
    }
  }, [userloading]);

  const fetchProductDetails = async (orders, productIds) => {
    try {
      const productDetails = await Promise.all(
        productIds.map(async (id) => {
          const response = await fetch(
              `/api/product/${id}`, {
            headers: {
              'Authorization': `Bearer ${user.token}`,
            }
          }
          );
          const result = await response.json();
          if (result.status === "SUCCESS") {
            const product = result.dataList[0];

            // Fetch image for the product
            const imageName = await fetchImage(product.image);

            return { ...product, imageName };
          } else {
            console.error(result.message || `Failed to fetch product ${id}`);
            return null;
          }
        })
      );

      // Merge product details into orders
      const updatedOrders = orders.map((order) => ({
        ...order,
        orderItems: order.orderItems.map((item) => {
          const product = productDetails.find(
            (prod) => prod && prod.id === item.productId
          );
          return { ...item, productDetails: product };
        }),
      }));

      setInvoices(updatedOrders);
    } catch (error) {
      setError("Error fetching product details");
      console.error(error);
    }
  };

  const fetchImage = async (image) => {
    try {
      const response = await fetch(
          `/api/filehandler/files/${image}`
      );
      if (response.status === 200) {
        return response.url;
      } else {
        console.error("Failed to fetch image:", image);
        return null;
      }
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  };

  useEffect(() => {
    if (!invoicesLoading) {
      // محاسبه مجموع خرید برای هر سفارش
      const updatedOrders = invoices.map((order) => {
        const totalAmount = order.orderItems.reduce((sum, item) => {
          return sum + item.count * item.productDetails.priceWithDiscount;
        }, 0);

        return { ...order, totalAmount: formatNumber(totalAmount) };
      });

      setInvoices(updatedOrders);
    }
  }, [invoicesLoading]);


  const todayJalali = moment().locale('fa').format('YYYY/MM/DD')

  const convertToPersianNumbers = (input) => {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return input.replace(/\d/g, (x) => persianDigits[x]);
  };

  const todayJalaliInPersian = convertToPersianNumbers(todayJalali);
  return (
    <div className='mt-10'>
      {/* top bar */}
      <div className='flex justify-end md:justify-between px-2 md:px-10'>
        <span className='hidden md:block font-MorabbaMedium text-3xl text-white' >داشبورد</span>
        <div className='flex gap-x-2 justify-center items-center text-white font-MorabbaMedium text-base md:text-xl relative py-1 px-4 bg-[#2E2E48] rounded-lg'>
          <span>تاریخ :</span>
          {todayJalaliInPersian}
        </div>
      </div>
      <div className='w-full'>
        {/* top */}
        <div className='w-full flex flex-col px-2 md:px-10 text-white mt-7'>
          <div className='w-full mb-4'>
            <span className='flex border-r-4 font-MorabbaBold pr-5 text-2xl border-corn-flower items-center '>
              آخرین خرید های انجام شده
            </span>
          </div>
          <PaymentList invoices={invoices}  showSort={false} />
        </div>
        {/* buttom */}
        <div className='w-full flex flex-col px-2 md:px-10 text-white mt-7'>
          <div className='w-full mb-4'>
            <span className='flex border-r-4 font-MorabbaBold pr-5 text-2xl border-corn-flower items-center '>
              آخرین مشتریان اضافه شده
            </span>
          </div>
          <UsersList showSort={false} users={[]} />
        </div>
      </div>
    </div>
  )
}
