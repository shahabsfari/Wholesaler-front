import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import moment from 'jalali-moment';

const jalaali = require('jalaali-js');

const CART_STORAGE_KEY = 'cartItems';
const AuthContext = createContext()




export const AuthProvider = ({ children }) => {
  const [targetUser, setTargetUser] = useState(null)

  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [customerData, setCustomerData] = useState([])
  const [fetchLoading, setFetchLoading] = useState(true)
  const [customerFetchLoading, setCustomerFetchLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true);
  const [userloading, setUserLoading] = useState(true);
  const [screen, setScreen] = useState(window.screen.availWidth)

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const [categories, setCategories] = useState([]);

  const [brands, setBrands] = useState([]);

  const setCustomerDatahandle = (data) => {
    setCustomerData(data)
  }

  const [cartItems, setCartItems] = useState([]);
  const isProductInCart = (productId, type = "API") => {
    // console.log("ccc", cartItems)
    // console.log("productId", productId)
    // console.log(productId, type)
    if (type === "API") {
      return cartItems.some(item => item.productId === productId);
    } else {
      return cartItems.some(item => item.id === productId);
    }

  }

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const emptyLocalCarts = () => {
    localStorage.setItem("cart", JSON.stringify([]));
  }

  const convertToJalali = (dateStr) => {
    // Parse input date string
    const date = new Date(dateStr);
    // Convert to Jalali date
    const jDate = jalaali.toJalaali(date.getFullYear(), date.getMonth() + 1, date.getDate());

    // Format Jalali date
    const months = [
      'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
      'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
    ];
    return `${jDate.jd} ${months[jDate.jm - 1]} ${jDate.jy}`;
  };

  const updateProducts = async (products) => {
    const updatedProducts = await Promise.all(
      products.map(async (product) => {
        try {
          const response = await fetch(`/api/product/${product.id}`);
          const data = await response.json();

          if (data.status === "SUCCESS" && !data.hasError) {
            const updatedProduct = data.dataList[0]; // فرض می‌کنیم فقط یک آیتم در dataList وجود دارد

            if (product.count > updatedProduct.count) {
              console.warn(`Product with ID ${product.id} removed: count (${product.count}) > new count (${updatedProduct.count})`);
              return null; // حذف محصول
            } else {
              return {
                ...product,
                stock: updatedProduct.count, // مقدار جدید count به ویژگی stock اضافه می‌شود
                ...updatedProduct, // سایر داده‌های به‌روزرسانی شده
              };
            }
          } else {
            console.error(`Error fetching product with ID ${product.id}:`, data.message);
            return null; // حذف محصول در صورت خطای API
          }
        } catch (error) {
          console.error(`Failed to fetch product with ID ${product.id}:`, error);
          return null; // حذف محصول در صورت خطا
        }
      })
    );

    // حذف محصولات null از آرایه به‌روزرسانی شده
    return updatedProducts.filter((product) => product !== null);
  };


  // emptyLocalCarts()
  const fetchCartItemsWithImages = async () => {
    // console.log("isLoggedIn:", isLoggedIn, "loading:", loading)
    if (isLoggedIn && !loading) {
      try {
        // مرحله 1: دریافت سبد خرید
        const cartResponse = await fetch(`/api/shopping-cart/${user.id}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          }
        });
        const cartData = await cartResponse.json();

        if (cartResponse.status !== 200 || cartData.hasError) {
          setError(cartData.message || 'Failed to fetch cart items');
          return;
        }

        const cartItemsWithImages = await Promise.all(
          cartData.dataList.map(async (item) => {
            try {

              const productResponse = await fetch(`/api/product/${item.productId}`);
              const productData = await productResponse.json();
              // console.log(productData)

              if (productResponse.status === 200 && !productData.hasError && productData.dataList.length > 0) {
                const product = productData.dataList[0];


                const imageResponse = await fetch(`/api/filehandler/files/${product.image}`);


                if (imageResponse.status === 200) {
                  return { ...item, priceWithDiscount: product.priceWithDiscount, discount: product.discount, hasDiscount: product.hasDiscount, title: product.title, imageUrl: imageResponse.url, stock: productData.dataList[0].count };
                } else {
                  console.error(`Failed to fetch image for product ${item.productId}`);
                  return { ...item, priceWithDiscount: null, discount: null, hasDiscount: null, title: null, imageUrl: null };
                }
              } else {
                console.error(`Failed to fetch product data for productId ${item.productId}`);
                return { ...item, imageUrl: null };
              }
            } catch (error) {
              console.error(`Error fetching product data for productId ${item.productId}:`, error);
              return { ...item, imageUrl: null };
            }
          })
        );

        setCartItems(cartItemsWithImages);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setError('Error fetching cart items');
      }
    } else if (!isLoggedIn && !loading) {
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];
      updateProducts(localCart).then((updatedProducts) => {
        setCartItems(updatedProducts);
        console.log("Updated Products:", updatedProducts);
      });
    }
  };

  const addToCart = async (product, count = 1) => {
    // console.log("enter to addToCart ")
    console.log("product:", product)
    if (isLoggedIn) {
      // console.log("logged")
      // console.log("PRO", product.id)
      // console.log("count", count)
      // console.log("USER", user.id)
      try {
        console.log({
          userId: user.id,
          productId: product.id,
          count: count
        })
        const response = await fetch('/api/shopping-cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            userId: user.id,
            productId: product.id,
            count: count
          })
        });
        const data = await response.json();
        console.log(data)
        fetchCartItemsWithImages();
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    } else {
      updateLocalCart(product);
    }
  };

  // const increaseQuantity = async (itemId , count) => {
  //   const existingItem = cartItems.find(item => item.productId === itemId);
  //   if (isLoggedIn) {
  //     try {
  //       const response = await fetch('/api/shopping-cart/increase', {
  //         method: 'PUT',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ${user.token}`,
  //         },
  //         body: JSON.stringify({
  //           itemInCartId: existingItem.id,
  //           userId: user.id
  //         })
  //       });

  //       const data = await response.json();
  //       // console.log(data)

  //       fetchCartItemsWithImages();
  //     } catch (error) {
  //       console.error("Error increasing item quantity:", error);
  //     }
  //   } else {
  //     // console.log("itemId", itemId)
  //     // console.log("cartItems", cartItems)

  //     setCartItems((prev) =>
  //       prev.map((item) => item.id === itemId ? { ...item, count: item.count + 1 } : item)
  //     )
  //   }
  // };

  const increaseQuantity = async (itemId, count) => {
    console.log("count", count)
    let existingItem;
    if (isLoggedIn) {
      existingItem = cartItems.find(item => item.productId === itemId);
    } else {
      existingItem = cartItems.find(item => item.id === itemId);
    }

    console.log("existingItem", existingItem)

    if (!existingItem) {
      Swal.fire('خطا', 'محصول مورد نظر در سبد خرید یافت نشد.', 'error');
      return;
    }

    if (existingItem.count + 1 > existingItem.stock) {
      Swal.fire(
        'موجودی ناکافی',
        `تعداد درخواست شما (${existingItem.count + 1}) بیشتر از موجودی انبار (${existingItem.stock}) است.`,
        'warning'
      );
      return;
    }

    if (isLoggedIn) {
      try {
        const response = await fetch('/api/shopping-cart/increase', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            itemInCartId: existingItem.id,
            userId: user.id,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          fetchCartItemsWithImages(); // به‌روزرسانی سبد خرید
        } else {
          Swal.fire('خطا', data.message || 'افزایش تعداد محصول انجام نشد.', 'error');
        }
      } catch (error) {
        console.error('Error increasing item quantity:', error);
        Swal.fire('خطا', 'مشکلی در ارتباط با سرور پیش آمد.', 'error');
      }
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, count: item.count + 1 } : item
        )
      );
    }
  };
  const decreaseQuantity = async (itemId) => {
    // console.log("enter to decress")
    const existingItem = cartItems.find(item => item.productId === itemId);
    // console.log("existingItem" , existingItem.id)
    if (isLoggedIn) {
      try {
        await fetch('/api/shopping-cart/decrease', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            itemInCartId: existingItem.id,
            userId: user.id
          })
        });
        fetchCartItemsWithImages();
      } catch (error) {
        console.error("Error decreasing item quantity:", error);
      }
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === itemId) && (item.count > 1) ? { ...item, count: item.count - 1 } : item)
      )
    }
  };

  const updateLocalCart = async (item) => {
    console.log(item)
    const cartItemsWithImagefunc = async () => {
      try {
        const imageResponse = await fetch(`/api/filehandler/files/${item.image}`);
        if (imageResponse.status === 200) {
          return { ...item, count: 1, imageUrl: imageResponse.url };
        } else {
          console.error(`Failed to fetch image for product ${item.productId}`);
          return { ...item, count: null, imageUrl: null };
        }

      } catch (error) {
        console.error(`Error fetching product data for productId ${item.productId}:`, error);
        return { ...item, imageUrl: null };
      }
    }
    const itemData = await cartItemsWithImagefunc()
    setCartItems(prev => [...prev, itemData]);
    // console.log("inn", [...cartItems, itemData])
    // console.log("cartItems", cartItems)
    // console.log("itemData", itemData)
    localStorage.setItem("cart", JSON.stringify([...cartItems, itemData]));
  };

  const deleteCartItem = async (id) => {
    const existingItem = cartItems.find(item => item.productId === id);
    if (isLoggedIn) {
      try {
        const response = await fetch(`/api/shopping-cart/${existingItem.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          }
        });

        if (!response.ok) {
          throw new Error('Failed to delete the item from the cart.');
        }

        const result = await response.json();

        if (result.hasError) {
          console.error(result.message);
          return null;
        }

        // console.log('Item deleted successfully:', result);
        fetchCartItemsWithImages();
        return result;
      } catch (error) {
        console.error('Error:', error.message);
      }
    } else {
      setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
    }

  };
  useEffect(() => {
    if (!isLoggedIn && !loading) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  useEffect(() => {
    fetchCartItemsWithImages()
    // fetchCartItems();
  }, [isLoggedIn, loading]);

  const addLocalCartToServer = async () => {
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    for (const item of localCart) {
      await addToCart(item, item.count || 1);
    }

    localStorage.removeItem("cart");
  };

  useEffect(() => {

    if (isLoggedIn) {
      addLocalCartToServer();
    }
  }, [isLoggedIn]);



  useEffect(() => {
    const loginTime = localStorage.getItem("loginTime");
    const storedUser = localStorage.getItem('user');
    if (storedUser && loginTime) {
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - loginTime;
      if (elapsedTime <= 2 * 60 * 60 * 1000) {
        setUser(JSON.parse(storedUser));
        setIsLoggedIn(true)
        setLoading(false)
      } else {
        logout()
      }
    }
    setUserLoading(false)
    // console.log("user local :" , user)
  }, []);

  const [brandsLoading, setBrandsLoading] = useState(true)
  // brands
  const fetchBrands = async () => {
    try {
      setBrandsLoading(true)
      const response = await fetch('/api/brand/getAll', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      if (data.status === 'SUCCESS' && !data.hasError) {
        setBrands(data.dataList);
      } else {
        setError(data.message || 'Failed to fetch brands');
      }
    } catch (error) {
      setError('Error fetching brands');
      console.error(error);
    } finally {
      setBrandsLoading(false)
    }
  };
  useEffect(() => {
    fetchBrands();
  }, []);

  const [categoriesLoading, setCategoriesLoading] = useState(true);
  // category
  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true)
      const response = await fetch("/api/product-category/getAllEnables");
      const data = await response.json();

      if (data.status === "SUCCESS" && !data.hasError) {
        setCategories(data.dataList);
      } else {
        setError(data.message || "خطایی رخ داده است");
      }
    } catch (error) {
      setError("مشکلی در ارتباط با سرور وجود دارد");
    } finally {
      setLoading(false);
      setCategoriesLoading(false)
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const logout = () => {
    localStorage.removeItem("loginTime");
    localStorage.removeItem("userToken");
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setUser(null);

    localStorage.setItem("cart", JSON.stringify([]));
    // console.log("User logged out successfully.");
  };

  const login = async (loginData) => {
    try {
      // نمایش لودینگ
      Swal.fire({
        title: 'در حال ورود...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "username": loginData.userName,
          "password": loginData.password,
        }),
      });

      if (!response.ok) {
        throw new Error('ورود ناموفق بود. لطفاً دوباره تلاش کنید.');
      }

      const data = await response.json();

      if (!data.hasError) {
        const loginTime = new Date().getTime();
        localStorage.setItem("loginTime", loginTime);
        setUser(data.dataList[0]);
        localStorage.setItem('user', JSON.stringify(data.dataList[0]));
        setIsLoggedIn(true);
        setError(null);

        // پایان لودینگ و نمایش پیام موفقیت
        Swal.fire({
          icon: 'success',
          title: 'ورود موفقیت‌آمیز',
          timer: 1500,
          showConfirmButton: false,
        });

        navigate('/');
      } else {
        throw new Error(data.message || 'خطایی رخ داده است.');
      }
    } catch (err) {
      // نمایش پیام خطا
      Swal.fire({
        icon: 'error',
        title: 'خطا',
        text: err.message || 'مشکلی پیش آمد. لطفاً دوباره تلاش کنید.',
      });
      setError(err.message);
    }
  };

  const signIn = async (signInData) => {
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "firstName": signInData.name,
          "lastName": signInData.lastName,
          "username": signInData.phoneNumber,
          "password": signInData.password,
          "email": `${signInData.name}@gmail.com`,
          "role": 'ADMIN',
          "enable": true,
        }),
      });

      if (!response.ok) {
        throw new Error('ورود با شکست مواجه شد. لطفاً دوباره تلاش کنید.');
      }

      const data = await response.json();

      if (!data.hasError) {
        await login({ userName: signInData.phoneNumber, password: signInData.password });
        setError(null);
      } else {

        Swal.fire({
          icon: "error",
          title: "خطا",
          text: "این شماره قبلا وحود دارد",
        });
      }

    } catch (err) {
      console.error('Error:', err.message);
      setError(err.message);

      Swal.fire({
        icon: "error",
        title: "خطا",
        text: err.message || "مشکلی پیش آمده است. لطفاً دوباره تلاش کنید.",
      });
    }
  };



  // change screen size
  useEffect(() => {
    const hanleResize = () => {
      setScreen(window.screen.availWidth)
    }
    window.addEventListener('resize', hanleResize)

    return () => {
      window.removeEventListener('resize', hanleResize)
    }

  }, [])

  const [loadingCustomerData, setLoadingCustomerData] = useState(true)

  // invoces ...................
  useEffect(() => {
    if (!userloading && isLoggedIn) {
      setLoadingCustomerData(true)
      const fetchCustomerData = async (userId) => {
        try {
          const response = await fetch(`/api/customer/user/${userId}`);
          const data = await response.json();
          // console.log("Customer Data:", data.dataList[0]);

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
        } finally {
          setLoadingCustomerData(false)
        }
      };
      fetchCustomerData(user.id)
    }
  }, [user])

  const fetchOrders = async (pageSize, pageNumber, only = -1) => {
    try {
      const response = await fetch(`/api/invoice/customer/${customerData.id}?${only === -1 ? null : `only=${only}&`}pageSize=${pageSize}&pageNumber=${pageNumber}`);
      const data = await response.json();

      if (data.status === 'SUCCESS' && !data.hasError) {
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

  useEffect(() => {
    if ((customerData !== null) && isLoggedIn) {
      const fetchOrders = async (pageSize, pageNumber, only = -1) => {
        try {
          const response = await fetch(`/api/invoice/customer/${customerData.id}?${only === -1 ? null : `only=${only}&`}pageSize=${pageSize}&pageNumber=${pageNumber}`);
          const data = await response.json();

          if (data.status === 'SUCCESS' && !data.hasError) {
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
          setFetchLoading(false)
        }
      };
      fetchOrders();
    }
  }, [customerData]);

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


  const convertToJalaliMoment = (dateTime) => {
    // تنظیم منطقه زمانی تهران
    const tehranTime = moment(dateTime).utcOffset("+03:30");

    // تبدیل تاریخ و زمان به شمسی
    const jalaliDate = tehranTime.locale('fa').format('YYYY MMMM DD'); // نام ماه
    const jalaliTime = tehranTime.format('HH:mm'); // فقط ساعت و دقیقه

    return { jalaliDate, jalaliTime };
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn, user, screen, error,
        signIn, login, categories, loading,
        fetchCategories, brands, fetchBrands,
        cartItems, addToCart, increaseQuantity,
        decreaseQuantity, isProductInCart, logout,
        deleteCartItem, convertToJalali,
        userloading, invoices, fetchLoading,
        formatNumber, categoriesLoading, brandsLoading,
        targetUser, setTargetUser, customerData
        , setCustomerDatahandle, loadingCustomerData, convertToJalaliMoment,
        fetchOrders
      }} >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;
