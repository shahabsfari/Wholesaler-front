import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import CategorySlider from '../../Components/CategorySlider/CategorySlider'
import SlidePoster from '../../Components/SliderPoster/SliderPoster'
import ProductContinerSlider from '../../Components/ProductsContinerSlider/ProductsContinerSlider'
import Poster from '../../Components/Poster/Poster'
import ProductContainer from '../../Components/ProductContainer/ProductContainer'
import BerandSlider from '../../Components/BerandSlider/BerandSlider'
import Footer from '../../Components/Footer/Footer'
export default function Index() {
    const staticPosters = [
        { 'name': 'jam', 'text': "با مربا های ما صبحونتو شیرین کن", 'url': "./images/slider/jam1.png", "searchWord": "مربا" },
        { 'name': 'choc', 'text': "با شکلات تخته ای زندگیتو شاد تر کن`", 'url': "./images/slider/choc.png", "searchWord": "شکلات" },
        { 'name': 'clean', 'text': "خرید انواع محصولات پاکیزگی", 'url': "./images/slider/clean.png", "searchWord": "بهداشتی" },
        { 'name': 'pop-corn', 'text': "خرید انواع اسنک و پاپ  کورن", 'url': "./images/slider/pop-corn.png", "searchWord": "تنقلات" }
    ]

    const bestSellingProducts = [
        {
            "title": "روغن سرخ کردنی اویلا ، فراوری شده از دل طبیعت",
            "number" : 24 , 
            "discountPer": 30 ,
            "oldPrice": "120,000",
            "originalPrice": "80,000",
            "url": "./images/products/oil.webp",
            "productKey": "code1"
        },
        {
            "title": "روغن سرخ کردنی اویلا ، فراوری شده از دل طبیعت",
            "number" : 24 , 
            "discountPer": 30 ,
            "oldPrice": "120,000",
            "originalPrice": "80,000",
            "url": "./images/products/oil.webp",
            "productKey": "code1"
        },
        {
            "title": "روغن سرخ کردنی اویلا ، فراوری شده از دل طبیعت",
            "number" : 24 , 
            "discountPer": 30 ,
            "oldPrice": "120,000",
            "originalPrice": "80,000",
            "url": "./images/products/oil.webp",
            "productKey": "code1"
        },
        {
            "title": "روغن سرخ کردنی اویلا ، فراوری شده از دل طبیعت",
            "number" : 24 , 
            "discountPer": 30 ,
            "oldPrice": "120,000",
            "originalPrice": "80,000",
            "url": "./images/products/oil.webp",
            "productKey": "code1"
        },
        {
            "title": "روغن سرخ کردنی اویلا ، فراوری شده از دل طبیعت",
            "number" : 24 , 
            "discountPer": 30 ,
            "oldPrice": "120,000",
            "originalPrice": "80,000",
            "url": "./images/products/oil.webp",
            "productKey": "code1"
        },
        {
            "title": "روغن سرخ کردنی اویلا ، فراوری شده از دل طبیعت",
            "number" : 24 , 
            "discountPer": 30 ,
            "oldPrice": "120,000",
            "originalPrice": "80,000",
            "url": "./images/products/oil.webp",
            "productKey": "code1"
        },
        {
            "title": "روغن سرخ کردنی اویلا ، فراوری شده از دل طبیعت",
            "number" : 24 , 
            "discountPer": 30 ,
            "oldPrice": "120,000",
            "originalPrice": "80,000",
            "url": "./images/products/oil.webp",
            "productKey": "code1"
        },
        {
            "title": "روغن سرخ کردنی اویلا ، فراوری شده از دل طبیعت",
            "number" : 24 , 
            "discountPer": 30 ,
            "oldPrice": "120,000",
            "originalPrice": "80,000",
            "url": "./images/products/oil.webp",
            "productKey": "code1"
        },
        {
            "title": "روغن سرخ کردنی اویلا ، فراوری شده از دل طبیعت",
            "number" : 24 , 
            "discountPer": 30 ,
            "oldPrice": "120,000",
            "originalPrice": "80,000",
            "url": "./images/products/oil.webp",
            "productKey": "code1"
        },
        {
            "title": "روغن سرخ کردنی اویلا ، فراوری شده از دل طبیعت",
            "number" : 24 , 
            "discountPer": 30 ,
            "oldPrice": "120,000",
            "originalPrice": "80,000",
            "url": "./images/products/oil.webp",
            "productKey": "code1"
        },
        {
            "title": "روغن سرخ کردنی اویلا ، فراوری شده از دل طبیعت",
            "number" : 24 , 
            "discountPer": 30 ,
            "oldPrice": "120,000",
            "originalPrice": "80,000",
            "url": "./images/products/oil.webp",
            "productKey": "code1"
        },
        {
            "title": "روغن سرخ کردنی اویلا ، فراوری شده از دل طبیعت",
            "number" : 24 , 
            "discountPer": 30 ,
            "oldPrice": "120,000",
            "originalPrice": "80,000",
            "url": "./images/products/oil.webp",
            "productKey": "code1"
        },
        {
            "title": "روغن سرخ کردنی اویلا ، فراوری شده از دل طبیعت",
            "number" : 24 , 
            "discountPer": 30 ,
            "oldPrice": "120,000",
            "originalPrice": "80,000",
            "url": "./images/products/oil.webp",
            "productKey": "code1"
        },
        {
            "title": "روغن سرخ کردنی اویلا ، فراوری شده از دل طبیعت",
            "number" : 24 , 
            "discountPer": 30 ,
            "oldPrice": "120,000",
            "originalPrice": "80,000",
            "url": "./images/products/oil.webp",
            "productKey": "code1"
        },
        {
            "title": "روغن سرخ کردنی اویلا ، فراوری شده از دل طبیعت",
            "number" : 24 , 
            "discountPer": 30 ,
            "oldPrice": "120,000",
            "originalPrice": "80,000",
            "url": "./images/products/oil.webp",
            "productKey": "code1"
        },
        {
            "title": "روغن سرخ کردنی اویلا ، فراوری شده از دل طبیعت",
            "number" : 24 , 
            "discountPer": 30 ,
            "oldPrice": "120,000",
            "originalPrice": "80,000",
            "url": "./images/products/oil.webp",
            "productKey": "code1"
        },
        {
            "title": "روغن سرخ کردنی اویلا ، فراوری شده از دل طبیعت",
            "number" : 24 , 
            "discountPer": 30 ,
            "oldPrice": "120,000",
            "originalPrice": "80,000",
            "url": "./images/products/oil.webp",
            "productKey": "code1"
        },
    ]

    const biggestDiscount = [
        {
            "title": "روغن سرخ کردنی اویلا ، فراوری شده از دل طبیعت",
            "number" : 24 , 
            "discountPer": 30 ,
            "oldPrice": "120,000",
            "originalPrice": "80,000",
            "url": "./images/products/oil.webp",
            "productKey": "code1"
        },
        {
            "title": "روغن سرخ کردنی اویلا ، فراوری شده از دل طبیعت",
            "number" : 24 , 
            "discountPer": 30 ,
            "oldPrice": "120,000",
            "originalPrice": "80,000",
            "url": "./images/products/oil.webp",
            "productKey": "code1"
        },
        {
            "title": "روغن سرخ کردنی اویلا ، فراوری شده از دل طبیعت",
            "number" : 24 , 
            "discountPer": 30 ,
            "oldPrice": "120,000",
            "originalPrice": "80,000",
            "url": "./images/products/oil.webp",
            "productKey": "code1"
        },
        {
            "title": "روغن سرخ کردنی اویلا ، فراوری شده از دل طبیعت",
            "number" : 24 , 
            "discountPer": 30 ,
            "oldPrice": "120,000",
            "originalPrice": "80,000",
            "url": "./images/products/oil.webp",
            "productKey": "code1"
        },
        {
            "title": "روغن سرخ کردنی اویلا ، فراوری شده از دل طبیعت",
            "number" : 24 , 
            "discountPer": 30 ,
            "oldPrice": "120,000",
            "originalPrice": "80,000",
            "url": "./images/products/oil.webp",
            "productKey": "code1"
        },
        {
            "title": "روغن سرخ کردنی اویلا ، فراوری شده از دل طبیعت",
            "number" : 24 , 
            "discountPer": 30 ,
            "oldPrice": "120,000",
            "originalPrice": "80,000",
            "url": "./images/products/oil.webp",
            "productKey": "code1"
        },
        {
            "title": "روغن سرخ کردنی اویلا ، فراوری شده از دل طبیعت",
            "number" : 24 , 
            "discountPer": 30 ,
            "oldPrice": "120,000",
            "originalPrice": "80,000",
            "url": "./images/products/oil.webp",
            "productKey": "code1"
        },
        {
            "title": "روغن سرخ کردنی اویلا ، فراوری شده از دل طبیعت",
            "number" : 24 , 
            "discountPer": 30 ,
            "oldPrice": "120,000",
            "originalPrice": "80,000",
            "url": "./images/products/oil.webp",
            "productKey": "code1"
        },
        {
            "title": "روغن سرخ کردنی اویلا ، فراوری شده از دل طبیعت",
            "number" : 24 , 
            "discountPer": 30 ,
            "oldPrice": "120,000",
            "originalPrice": "80,000",
            "url": "./images/products/oil.webp",
            "productKey": "code1"
        },
        {
            "title": "روغن سرخ کردنی اویلا ، فراوری شده از دل طبیعت",
            "number" : 24 , 
            "discountPer": 30 ,
            "oldPrice": "120,000",
            "originalPrice": "80,000",
            "url": "./images/products/oil.webp",
            "productKey": "code1"
        },
        {
            "title": "روغن سرخ کردنی اویلا ، فراوری شده از دل طبیعت",
            "number" : 24 , 
            "discountPer": 30 ,
            "oldPrice": "120,000",
            "originalPrice": "80,000",
            "url": "./images/products/oil.webp",
            "productKey": "code1"
        },
        {
            "title": "روغن سرخ کردنی اویلا ، فراوری شده از دل طبیعت",
            "number" : 24 , 
            "discountPer": 30 ,
            "oldPrice": "120,000",
            "originalPrice": "80,000",
            "url": "./images/products/oil.webp",
            "productKey": "code1"
        },
        
    ]
    



    return (
        <>
            <div className=' select-none font-Dana box-border items-center '>
                <Navbar />
                <CategorySlider />
                <SlidePoster />
                {/* Best selling products */}
                <ProductContinerSlider data={bestSellingProducts}  title="محصولات پر فروش" />
                <Poster dic={staticPosters[0]} />
                <ProductContainer data={biggestDiscount} title="بیشترین تحفیف"  />
                <Poster dic={staticPosters[1]} />
                <ProductContinerSlider data={bestSellingProducts}  title="محصولات پر فروش" />
                <Poster dic={staticPosters[2]} />
                <ProductContinerSlider data={bestSellingProducts}  title="محصولات پر فروش" />
                <Poster dic={staticPosters[3]} />
                <BerandSlider />
                <ProductContainer data={biggestDiscount} title="بیشترین تحفیف"  />
                <Footer />
            </div>
        </>
    )
}
