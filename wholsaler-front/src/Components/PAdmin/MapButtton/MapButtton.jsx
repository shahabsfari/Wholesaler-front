import React from 'react'

export default function MapButtton({latitude , longitude , className}) {

    const openMap = () =>{
        const mapUrl = `https://www.google.com/maps?q=${longitude},${latitude}`;
        window.open(mapUrl , '_blank')
    }
  return (
    <>
        <button onClick={openMap} className={` ${className} btn px-2 font-Dana `}> مسیریابی </button>
    </>
  )
}
