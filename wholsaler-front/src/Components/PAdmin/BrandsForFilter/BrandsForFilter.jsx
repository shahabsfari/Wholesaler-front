import React, { useContext, useState } from 'react'
import { HiCheckCircle } from "react-icons/hi2";
import { IoIosArrowUp } from "react-icons/io";
import AuthContext from '../../../AuthContext';
export default function BrandsForFilter({ brandValue , handleBrandChange ,className = "text-white font-DanaMedium text-base"}) {
    const {brands} = useContext(AuthContext)
    const titlesArrayBrands = brands.map(item => item.name);
    const [showBrands, setShowBrands] = useState(false)
    function getIdByTitleBrands(name) {
        const item = brands.find(item => item.name === name);
        return item ? item.id : null;
    }
    const slectedBrandHandler = (brand) => {
        if (brandValue === getIdByTitleBrands(brand)) {
            handleBrandChange('')
        } else {
            handleBrandChange(getIdByTitleBrands(brand))
            
        }
    }

    return (
        <div className= {` ${className}  select-none`}>
            <span onClick={() => setShowBrands(prev => !prev)} className='cursor-pointer flex w-full justify-between items-center py-1 '>
                برند ها
                <span>
                    <IoIosArrowUp className={`${showBrands ? "rotate-180" : "-rotate-90"}`} />
                </span>
            </span>
            <div className={`${showBrands ? "" : "hidden"} flex flex-col gap-y-2 pt-2`}>
                {
                    titlesArrayBrands.map((brand, index) => (
                        <div key={index} className='flex flex-col'>
                            <span onClick={() => slectedBrandHandler(brand)} className='flex w-full items-center justify-between px-4 text-sm'>
                                {brand}
                                <HiCheckCircle className={`text-blue-500 size-5 ${ brandValue === getIdByTitleBrands(brand)  ? "block" : "hidden"}`} />
                            </span>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}
