import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Product from '../../Components/Product/Product'
import InformationProduct from '../../Components/InformationProduct/InformationProduct'
import Footer from '../../Components/Footer/Footer'
import ProductContinerSlider from '../../Components/ProductsContinerSlider/ProductsContinerSlider'
import { useLocation } from 'react-router-dom';
import AuthContext from '../../AuthContext'
import LoadingSec from '../../Components/LoadingSec/LoadingSec'
export default function ProductInfo() {
    const location = useLocation();

    const productId = location.state ? location.state : 0;
    // if (productId === 0 ){
    //    productId = JSON.parse(localStorage.getItem("productId")) || 0;
    // }
    // localStorage.setItem("productId", JSON.stringify(productId));
    // console.log(productId)
    const [loadingFetch, setLoadingFetch] = useState(true)
    const [productData, setProductData] = useState(null);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
  

    const [selectedOption, setSelectedOption] = useState("specifications")

    const { brands , cartItems , isLoggedIn} = useContext(AuthContext)
    // console.log(cartItems)
    const findTitleBrandById = (id) => {
        const item = brands.find((item) => item.id === id);
        return item ? item.name : "Item not found";
    };

    const isProductInList = (id, list) => {
        if (isLoggedIn){
            return list.some((product) => product.productId === id);
        } else {
            return list.some((product) => product.id === id);
        }
      };

    useEffect(() => {
        console.log("update")
        const fetchProductData = async () => {
            try {
                const response = await fetch(  `/api/product/${productId}`);
                const data = await response.json();

                if (data.status === "SUCCESS" && !data.hasError) {
                    setProductData(data.dataList[0]);
                    setLoadingFetch(false)
                } else {
                    console.error("Error fetching product data:", data.message);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        fetchProductData();
    }, [productId]);

    useEffect(() => {
        if(productData !== null){
            const fetchProducts = async () => {
                try {
                    const response = await fetch(  `/api/product/category/${productData.categoryId}?pageSize=12&pageNumber=0`);
                    const data = await response.json();
    
                    if (data.status === "SUCCESS" && !data.hasError) {
                        setProducts(data.dataList);
                    } else {
                        console.error("Error fetching products:", data.message);
                    }
                } catch (error) {
                    console.error("Fetch error:", error);
                } finally {
                    setLoading(false);
                }
            };
    
            fetchProducts();
        }
    }, [productId , loadingFetch]);

    if (loadingFetch) {
        return <LoadingSec />
    }
    // console.log("productData.brand" , productData.brandId )
    return (
        <div className=' w-full select-none font-Dana box-border items-center bg-white h-full  '>
            <Navbar />
            <Product isInCartItems={isProductInList(productId , cartItems)} productData={{ ...productData, brandTitle: findTitleBrandById(productData.brandId) }} />
            {/* <InformationProduct value={selectedOption} setValue={setSelectedOption} /> */}
            <ProductContinerSlider data={products} title="محصولات مشابه" />
            <Footer />
        </div>
    )
}
