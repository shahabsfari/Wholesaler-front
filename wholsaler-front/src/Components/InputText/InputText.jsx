import React from 'react'
import Swal from 'sweetalert2';
export default function InputText({ dir="rtl" , inputClassName="", id = "input-field", className = "",border = "border-[1px] border-corn-flower" , justEnglish = false, value, setFunc = false, title, type = "text", bg = "bg-white", mode = "bg-white", readOnly = false }) {
  const handlerEnglish = (e) => {
    const value = e.target.value;
    if (/[^a-zA-Z0-9\s]/.test(value)) {
      Swal.fire({
          icon: "warning",
          title: "توجه",
          text: "لطفاً کیبورد را به انگلیسی تغییر دهید.",
      });
  } else {
      setFunc(value);
  }
  };
  const handleChange = (e) => {
    if (setFunc === false) return;

    if (justEnglish) {
      handlerEnglish(e)
    } else {
      setFunc(e.target.value);
    }
  }
  return (  
    <div className={`relative ${border} rounded-lg ${className}`} >
      <input dir={dir} autoComplete='off' value={value} onChange={(e) => handleChange(e)} id={id} readOnly={readOnly} className={`outline-none bg-transparent w-full h-11 px-2 text-sm font-dana peer ${inputClassName}`} type={type} placeholder=' ' />
      <label htmlFor={id} className={`${value ? `-top-4  ${mode}` : `top-2 ${bg}`} absolute transition-all peer-focus:-top-4 peer-focus:bg-corn-flower peer-focus:text-white peer-focus:rounded-md   right-2   px-2  text-base font-dana`}> {title} </label>
    </div>
  )
}