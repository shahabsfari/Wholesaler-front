import React, { useEffect, useState } from 'react';
import { IoClose } from "react-icons/io5";
import CategoryItems from '../../CategoryItems/CategoryItems';
import CateogrysForFilters from '../CateogrysForFilters/CateogrysForFilters';
import BrandsForFilter from '../BrandsForFilter/BrandsForFilter';
import PriceRange from '../PriceRange/PriceRange';
import SwitchButton from '../../SwitchButton/SwitchButton';

export default function Filter({ toggleNotAvailable, NotAvailableBtn , toggleAvailable, toggleDiscounted, AvailableBtn, DiscountedBtn, priceRange, handleMinPriceChange, handleMaxPriceChange, brandValue, handleBrandChange, categoryValue, handleCategoryChange, isOpen, onClose, children, className = "" }) {


    const [isVisible, setIsVisible] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)

    const [activeButton, setActiveButton] = useState(null)
    const activeButtonHandler = (button) => {
        if (button === "existing") {
            console.log("yes")
            toggleAvailable()
            if(NotAvailableBtn){
                console.log("no")
                toggleNotAvailable()
            }
            
        } else {
            toggleNotAvailable()
            if(AvailableBtn){
                toggleAvailable()
            }
        }

    }
    useEffect(() => {
        if (isOpen) {
            setIsVisible(true)
            setTimeout(() =>
                setIsAnimating(true)
                , 150)
        } else {
            setIsAnimating(false)
            setTimeout(() =>
                setIsVisible(false)
                , 150)
        }
    }, [isOpen])

    if (!isOpen && !isVisible) return null;

    return (
        <div className={`fixed inset-0  bg-black bg-opacity-20 z-50 transition-opacity ease-out duration-100 backdrop-blur-sm ${isAnimating ? "opacity-100" : "opacity-0"} ${className}`} >
            <div className='absolute overflow-y-auto bg-[#1e1e32] h-full left-0 w-[412px] py-5 px-3 ' >
                <div>
                    <IoClose className='cursor-pointer text-white size-7' onClick={onClose} />
                </div>
                <div className='w-full flex flex-col px-10 gap-y-4 '>
                    <CateogrysForFilters handleCategoryChange={handleCategoryChange} categoryValue={categoryValue} />
                    <BrandsForFilter brandValue={brandValue} handleBrandChange={handleBrandChange} />
                    <PriceRange priceRange={priceRange} handleMinPriceChange={handleMinPriceChange} handleMaxPriceChange={handleMaxPriceChange} className="text-white font-DanaDemiBold" />

                    <div className='flex justify-between items-center pt-4'>
                        <span className='text-base font-DanaMedium text-white' >
                            فقط کالا های موجود
                        </span>
                        <SwitchButton activeButtonHandler={()=>activeButtonHandler("existing")} name="existing" checked={AvailableBtn} />
                    </div>
                    <div className='flex justify-between items-center pt-4'>
                        <span className='text-base font-DanaMedium text-white' >
                            فقط کالا های ناموجود
                        </span>
                        <SwitchButton activeButtonHandler={()=>activeButtonHandler("notExisting")} name="notExisting" checked={NotAvailableBtn} />
                    </div>

                    {/* <div className='flex justify-between items-center pt-4'>
                        <span className='text-base font-DanaMedium text-white' >
                            فقط کالا های غیر فعال
                        </span>
                        <SwitchButton activeButtonHandler={toggleAvailable} name="inactive" checked={activeButton === "inactive"} />
                    </div> */}

                    <div className='flex justify-between items-center pt-4'>
                        <span className='text-base font-DanaMedium text-white' >
                            کالا های تخفیف دار
                        </span>
                        <SwitchButton activeButtonHandler={toggleDiscounted} name="" checked={DiscountedBtn} />
                    </div>

                </div>
            </div>
        </div>
    )
}
