import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import CategorySlider from '../../Components/CategorySlider/CategorySlider'
import SlidePoster from '../../Components/SliderPoster/SliderPoster'
import ProductContinerSlider from '../../Components/ProductsContinerSlider/ProductsContinerSlider'
import Poster from '../../Components/Poster/Poster'
import ProductContainer from '../../Components/ProductContainer/ProductContainer'
import BerandSlider from '../../Components/BerandSlider/BerandSlider'
import Footer from '../../Components/Footer/Footer'

import FileUploadComponent from '../../Components/FileUploadComponent/FileUploadComponent'
import LoadingSec from '../../Components/LoadingSec/LoadingSec'
import { useNavigate } from 'react-router-dom'

export default function Index() {

    console.log(` "homepage": "https://poorjalil.com" , update 72  `)
    const [discountLoading, setDiscountLoading] = useState(true)
    const [discountProducts, setDiscountProducts] = useState([])
    const [productsmostdiscounts, setProductsmostdiscounts] = useState([])
    const [productsRecommended, setProductsRecommended] = useState([])
    const [productsMostVisited, setProductsMostVisited] = useState([])

    const [posters, setPosters] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)

    const fetchPosters = async () => {
        try {
            const response = await fetch('/api/poster/getAllEnables');
            const data = await response.json();


            if (data.status === 'SUCCESS' && data.dataList) {
                const updatedSliders = await Promise.all(
                    data.dataList.map(async (item) => {
                        try {
                            const imageResponse = await fetch(`/api/filehandler/files/${item.image}`);
                            if (imageResponse.status === 200) {
                                const imageUrl = imageResponse.url;
                                return { ...item, imageUrl };
                            } else {
                                console.error('Failed to fetch image for:', item.image);
                                return { ...item, imageUrl: null };
                            }
                        } catch (error) {
                            console.error('Error fetching image for:', item.image, error);
                            return { ...item, imageUrl: null };
                        }
                    })
                );

                setPosters(updatedSliders);
                setLoading(false)
            } else {
                setError(data.message || 'Failed to fetch sliders');
            }
        } catch (error) {
            setError('Error fetching sliders');
            console.error(error);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/product?pageSize=30&pageNumber=0&isExist=true&sortBy=3');
            const data = await response.json();
            // console.log(data)
            if (data.status === "SUCCESS" && !data.hasError) {
                setDiscountLoading(false)
                setDiscountProducts(data.dataList);
            } else {
                console.error("Error:", data.message);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };
    const fetchProductRecommended = async () => {
        try {
            const response = await fetch('/api/product/recommendedProducts?pageSize=12&pageNumber=0');
            const data = await response.json();
            // console.log(data)
            if (data.status === "SUCCESS" && !data.hasError) {
                setProductsRecommended(data.dataList);
            } else {
                console.error("Error:", data.message);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    const fetchProductsMostVisited = async () => {
        try {
            const response = await fetch('/api/product?pageSize=30&pageNumber=0&isExist=true&sortBy=5');
            const data = await response.json();
            // console.log(data)
            if (data.status === "SUCCESS" && !data.hasError) {
                setProductsMostVisited(data.dataList);
            } else {
                console.error("Error:", data.message);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    const fetchProductsmostdiscounts = async () => {
        try {
            const response = await fetch('/api/product?pageSize=12&pageNumber=0&isExist=true&hasDiscount=true&sortBy=3');
            const data = await response.json();
            // console.log(data)
            if (data.status === "SUCCESS" && !data.hasError) {
                setProductsmostdiscounts(data.dataList);
            } else {
                console.error("Error:", data.message);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    useEffect(() => {
        fetchPosters();
        fetchProducts();
        fetchProductsmostdiscounts();
        fetchProductRecommended();
        fetchProductsMostVisited();
    }, []);

    const defaultPoster = {
        defaultPoster: true,
        imageUrl: "images/slider/defaultPoster.png",
        description: "بنکداری پور جلیل"
    }
    
    // console.log("loading" , loading)
    // console.log("discountLoading" , discountLoading)


    if (loading || discountLoading) {
        return <LoadingSec />
    }

    return (
        <>
            <div className=' select-none font-Dana box-border items-center bg-white '>
                <Navbar />
                <CategorySlider />
                <SlidePoster />
                {/* Best selling products */}
                <ProductContinerSlider sort={3} data={discountProducts} title="محصولات پر فروش" />
                {
                    posters.length <= 0 ? (
                        <Poster {...defaultPoster} />
                    ) : (
                        <Poster  {...posters[0]} />
                    )
                }
                <ProductContainer sort={4} data={productsmostdiscounts} title="بیشترین تحفیف" />
                {
                    posters.length <= 1 ? (
                        <Poster {...defaultPoster} />
                    ) : (
                        <Poster {...posters[1]} />
                    )
                }
                <ProductContinerSlider enable={false} data={productsRecommended} title="محصولات پیشنهادی" />
                {
                    posters.length <= 2 ? (
                        <Poster {...defaultPoster} />
                    ) : (
                        <Poster {...posters[2]} />
                    )
                }
                <ProductContinerSlider sort={5} data={productsMostVisited} title="محصولات پر بازدید" />
                {
                    posters.length <= 3 ? (
                        <Poster {...defaultPoster} />
                    ) : (
                        <Poster {...posters[3]} />
                    )
                }
                <BerandSlider />
                {/* <ProductContainer data={bestSeling} title="بیشترین تحفیف" /> */}
                <Footer />
            </div>
        </>
    )
}
