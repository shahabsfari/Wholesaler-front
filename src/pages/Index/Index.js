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
        { 'name':'jam' , 'text':"با مربا های ما صبحونتو شیرین کن" , 'url': "./images/slider/jam1.png"} ,
        { 'name':'choc' , 'text':"با شکلات تخته ای زندگیتو شاد تر کن`" , 'url': "./images/slider/choc.png"} ,
        { 'name':'clean' , 'text':"خرید انواع محصولات پاکیزگی" , 'url': "./images/slider/clean.png"} ,
        { 'name':'pop-corn' , 'text':"خرید انواع اسنک و پاپ  کورن" , 'url': "./images/slider/pop-corn.png"}
    ]
    return (
        <>
            <div className=' select-none font-Dana box-border items-center '>
                <Navbar />
                <CategorySlider />
                <SlidePoster/>
                <ProductContinerSlider/>
                <Poster dic={staticPosters[0]} />
                <ProductContainer/>
                <Poster dic={staticPosters[1]} />
                <ProductContinerSlider/>
                <Poster dic={staticPosters[2]} />
                <ProductContinerSlider/>
                <Poster dic={staticPosters[3]}/>
                <BerandSlider/>
                <ProductContainer/>
                <Footer/>
            </div>
        </>
    )
}
