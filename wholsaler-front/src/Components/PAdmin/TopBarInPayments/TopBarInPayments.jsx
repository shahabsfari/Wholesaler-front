import React, { useState } from 'react'
import SearchInput from '../SearchInput/SearchInput';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
export default function TopBarInPayments() {
  const [invoicesLoading, setInvoicesLoading] = useState(true)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [target, setTarget] = useState('')
  const [isFocused, setIsFocused] = useState(false);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate() ;



  // تابع برای دریافت یک فاکتور خاص با مدیریت ارورها و لودینگ با SweetAlert
  const fetchInvoiceById = async (invoiceId) => {
    try {
      // بررسی ورودی
      if (isNaN(invoiceId)) {
        Swal.fire({
          icon: 'warning',
          title: 'ورودی نامعتبر',
          text: 'لطفاً کد سفارش معتبر وارد کنید.'
        });
        return null;
      }

      // نمایش لودینگ با SweetAlert
      Swal.fire({
        title: 'در حال بارگذاری...',
        html: 'لطفاً منتظر بمانید، در حال دریافت اطلاعات فاکتور...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      setInvoicesLoading(true);
      const response = await fetch(`/api/invoice/${invoiceId}`);
      const data = await response.json();

      if (data.status === 'SUCCESS' && !data.hasError) {
        const invoice = data.dataList[0];

        let totalPrice = 0;
        // پردازش اطلاعات محصولات در orderItems
        const updatedOrderItems = await Promise.all(
          invoice.orderItems.map(async (item) => {
            const productDetails = await fetchProductDetails(item.productId);
            const imageUrl = await fetchImage(productDetails.image);
            totalPrice += item.count * productDetails.priceWithDiscount;
            return { ...item, productDetails, imageName: imageUrl };
          })
        );

        const enrichedInvoice = { ...invoice, orderItems: updatedOrderItems, totalPrice };

        // نمایش پیام موفقیت
        Swal.fire({
          icon: 'success',
          title: 'فاکتور با موفقیت دریافت شد',
          text: `فاکتور با شناسه ${invoice.id} با موفقیت دریافت شد!`
        });
        return enrichedInvoice;
      } else {
        // نمایش پیام خطا
        Swal.fire({
          icon: 'error',
          title: 'خطا در دریافت فاکتور',
          text: data.message || 'خطا در دریافت اطلاعات فاکتور رخ داده است.'
        });
        return null;
      }
    } catch (error) {
      // نمایش پیام خطا در صورت بروز خطای شبکه یا دیگر خطاها
      Swal.fire({
        icon: 'error',
        title: 'خطا',
        text: 'خطا در دریافت اطلاعات فاکتور رخ داده است.'
      });
      console.error(error);
      return null;
    } finally {
      setInvoicesLoading(false);
    }
  };

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

  const clicklHandle = async (id) => {
    const invoice = await fetchInvoiceById(target)
    if (invoice){
      navigate("/p-admin/payments/details", { state: invoice });
    }
    console.log(invoice)
  };
  return (
    <div className='pr-8 sm:pr-0' >
      <SearchInput onClick={clicklHandle} setIsFocused={setIsFocused} value={target} setFunc={setTarget} placeholder="جستجوی پرداخت..." />

    </div>
  )
}
