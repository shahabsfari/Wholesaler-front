import React from 'react'
import { AiTwotoneDelete } from "react-icons/ai";

export default function AddFeatureItem({ textValue , setText,  setListString, addText, handleKeyDown, deleteLine, className, type = "specifications", list, title }) {

  return (
    <div className={`${className} grid grid-cols-12 gap-x-2`}>
      <div className='col-span-12  w-full font-Dana text-xl text-white mb-4 pr-2'>
        <span className=' border-r-2 border-blue-400 pr-2' >{title}</span>
      </div>
      <div className='flex mb-4 md:mb-0 flex-col col-span-12 md:col-span-4'>
        <div className='flex flex-col gap-3'>
          <div className={`relative rounded-lg border-2   border-[#55555e]  ${type === "specifications" ? "flex" : "hidden"} justify-center items-center h-11 `}>
            <span className='absolute -top-3 right-4  bg-[#383854] font-Dana text-white text-sm'> تیتر </span>
            <input className='outline-none text-white font-Dana text-base w-full bg-transparent px-2' type="text" />
          </div>
          <div className={`relative rounded-lg border-2   border-[#55555e]  flex justify-center items-center ${type === "specifications" ? "h-[115px]" : "h-[170px]"} `} >
            <span className='absolute -top-3 right-4 bg-[#383854]  font-Dana text-white text-sm'> توضیح </span>
            <textarea value={textValue} onKeyDown={(e)=> handleKeyDown(e) }  onChange={(e) => setText(e.target.value) } className='resize-none outline-none h-full py-3 bg-transparent text-white text-justify px-2 font-Dana text-base w-full' name="" id="">

            </textarea>
          </div>
          <button onClick={()=> addText() } className="bg-blue-500 h-11 rounded-lg px-4 font-Dana text-base text-white">ثبت</button>
        </div>
        <div>
        </div>
      </div>
      {/* table */}
      <div className='max-h-[230px] overflow-auto border-collapse border  border-t border-[#55555e] rounded-lg  col-span-12 md:col-span-8'>
        <table className="table-auto border-collapse w-full  text-sm font-Dana text-white ">
          <thead>
            <tr className='font-Dana text-base sticky z-10  -top-1 bg-[#383854]  ' >
              {
                type === "specifications" ? (
                  <th className='border border-[#55555e] py-1'>تیتر</th>
                )
                  : null
              }
              <th className='border border-[#55555e]  py-1 '>توضیحات</th>
            </tr>
          </thead>
          <tbody >
            {
              list.map((item, index) => {
                if (item.length === 2) {
                  return (
                    <tr key={index} className='leading-loose'>
                      <td className='border-2 border-[#55555e] px-3 '  >{item[0]}</td>
                      <td className='border-2 border-[#55555e] px-3' > {item[1]} </td>
                    </tr>
                  )
                } else {
                  return (
                    <tr key={index} className='leading-loose'>
                      <td className=' border-b border-[#55555e] px-3 flex justify-between items-center'  >
                        <span>
                          {item}
                        </span>
                        <span onClick={() => deleteLine(index)} className='h-full '>
                          <AiTwotoneDelete size={20} className='text-red-400 hover:scale-150 transition-all cursor-pointer' />
                        </span>

                      </td>
                    </tr>
                  )
                }
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
