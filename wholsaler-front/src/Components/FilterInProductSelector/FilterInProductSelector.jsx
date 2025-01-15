import React, { useContext, useEffect, useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { VscSettings } from "react-icons/vsc";
import BrandsForFilter from '../PAdmin/BrandsForFilter/BrandsForFilter';
import CateogrysForFilters from '../PAdmin/CateogrysForFilters/CateogrysForFilters';
import PriceRange from "../PAdmin/PriceRange/PriceRange"
import SwitchButton2 from '../SwitchButton2/SwitchButton2';
import AuthContext from '../../AuthContext';
import { IoClose } from "react-icons/io5";


export default function FilterInProductSelector({ toggleAvailable , toggleDiscounted ,  AvailableBtn , DiscountedBtn , priceRange, handleMinPriceChange, handleMaxPriceChange, brandValue, handleBrandChange, categoryValue, handleCategoryChange, onClose, isOpen, className = "" }) {

    const [isVisible, setIsVisible] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)

    const { screen } = useContext(AuthContext)
    const [activeButton, setActiveButton] = useState("")
    const activeButtonHandler = (button) => {
        setActiveButton(prev => {
            if (prev === button) {
                return null
            } else {
                return button
            }
        })
    }
    useEffect(() => {
        if (isOpen) {
            setIsVisible(true)
            setTimeout(() =>
                setIsAnimating(true)
                , 0)
        } else {
            setIsAnimating(false)
            setTimeout(() =>
                setIsVisible(false)
                , 0)
        }
    }, [isOpen])

    if (!isOpen && !isVisible) return null;
    return (
        <div className='lg:col-span-3 ml-2'>
            {
                screen > 1024 ? (
                    <div className={` ${isOpen ? "" : "hidden"} border-[1px] sticky top-[80px] rounded-sm border-corn-flower`}  >
                        {/* top (title) */}
                        <div className='w-full border-b-[1px] p-2 py-3 border-corn-flower flex justify-between items-center'>
                            <span className='flex items-center gap-1 font-MorabbaBold text-base'>
                                <VscSettings size={26} />
                                فیلتر ها
                            </span>
                            <span>
                                <div onClick={() => onClose()} className=' cursor-pointer border-l-[3px] w-fit border-blue-600 ml-2'>
                                    <IoIosArrowBack size={24} className=' text-blue-600 rotate-180' />
                                </div>
                            </span>
                        </div>
                        {/* brands */}
                        <BrandsForFilter brandValue={brandValue} handleBrandChange={handleBrandChange} className='text-black p-3 border-b-[1px] border-corn-flower font-MorabbaMedium text-base' />
                        <CateogrysForFilters handleCategoryChange={handleCategoryChange} categoryValue={categoryValue} className='text-black p-3 border-b-[1px] border-corn-flower font-MorabbaMedium text-base' />
                        <PriceRange priceRange={priceRange} handleMinPriceChange={handleMinPriceChange} handleMaxPriceChange={handleMaxPriceChange} spanBg='bg-white text-black font-DanaMedium' borderBg="border-corn-flower" className="text-black p-3 border-b-[1px] border-corn-flower font-MorabbaMedium text-base" />
                        {/* switch button */}
                        <div className='flex justify-between items-center p-3' >
                            <span className='text-base font-MorabbaMedium'>
                                 کالا های موجود
                            </span>
                            <SwitchButton2 activeButtonHandler={toggleAvailable} name="Available" checked={AvailableBtn} />
                        </div>
                        {/* switch button */}
                        <div className='flex justify-between items-center p-3' >
                            <span className='text-base font-MorabbaMedium'>
                                 کالا های تخفیف دار
                            </span>
                            <SwitchButton2 activeButtonHandler={toggleDiscounted} name="discounted" checked={DiscountedBtn} />
                        </div>

                    </div>
                ) : (
                    <div className={`fixed inset-0  bg-black bg-opacity-20 z-50 transition-opacity ease-out duration-100 backdrop-blur-sm ${isAnimating ? "opacity-100" : "opacity-0"} ${className}`}>
                        <div className='absolute overflow-y-auto bg-white h-full right-0 max-w-[412px] py-5 px-3 ' >
                            <div className='w-full flex justify-end'>
                                <IoClose className='cursor-pointer text-black size-7' onClick={onClose} />
                            </div>
                            {/* filter */}
                            <div className={` ${isOpen ? "" : "hidden"} border-[1px] rounded-sm mt-4 min-h-full border-corn-flower`}  >
                                {/* top (title) */}
                                <div className='w-full border-b-[1px] p-2 py-3 border-corn-flower flex justify-between items-center'>
                                    <span className='flex items-center gap-1 font-MorabbaBold text-base'>
                                        <VscSettings size={26} />
                                        فیلتر ها
                                    </span>
                                    <span>
                                        <div onClick={() => onClose()} className=' cursor-pointer border-l-[3px] w-fit border-blue-600 ml-2'>
                                            <IoIosArrowBack size={24} className=' text-blue-600 rotate-180' />
                                        </div>
                                    </span>
                                </div>
                                {/* brands */}
                                <BrandsForFilter brandValue={brandValue} handleBrandChange={handleBrandChange} className='text-black p-3 border-b-[1px] border-corn-flower font-MorabbaMedium text-base' />
                                <CateogrysForFilters handleCategoryChange={handleCategoryChange} categoryValue={categoryValue} className='text-black p-3 border-b-[1px] border-corn-flower font-MorabbaMedium text-base' />
                                <PriceRange priceRange={priceRange} handleMinPriceChange={handleMinPriceChange} handleMaxPriceChange={handleMaxPriceChange} spanBg='bg-white text-black font-DanaMedium' borderBg="border-corn-flower" className="text-black p-3 border-b-[1px] border-corn-flower font-MorabbaMedium text-base" />
                                {/* switch button */}
                                <div className='flex justify-between items-center p-3' >
                                    <span className='text-base  font-MorabbaMedium'>
                                        کالا های موجود
                                    </span>
                                    <SwitchButton2 activeButtonHandler={toggleAvailable} name="Available" checked={AvailableBtn} />
                                </div>
                                {/* switch button */}
                                <div className='flex justify-between items-center p-3' >
                                    <span className='text-base font-MorabbaMedium'>
                                        کالا های تخفیف دار
                                    </span>
                                    <SwitchButton2 activeButtonHandler={toggleDiscounted} name="discounted" checked={DiscountedBtn} />
                                </div>

                            </div>
                        </div>

                    </div>
                )
            }

        </div>

    )
}
