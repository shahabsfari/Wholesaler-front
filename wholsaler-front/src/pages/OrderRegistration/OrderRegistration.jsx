import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import ProductForRegistration from '../../Components/ProductForRegistration/ProductForRegistration'
import RegistrationForBuy from '../../Components/RegistrationForBuy/RegistrationForBuy'
import Footer from '../../Components/Footer/Footer'
import AuthContext from '../../AuthContext'


export default function OrderRegistration() {
    const [customerData, setCustomerData] = useState([])
    const { user, userloading, cartItems, isLoggedIn } = useContext(AuthContext)
    const [selectedAddress, setSelectedAddress] = useState("")

    useEffect(() => {
        if (!userloading, isLoggedIn) {
            const fetchCustomerData = async (userId) => {
                try {
                    const response = await fetch(`/api/customer/user/${userId}`);
                    const data = await response.json();
                    console.log("Customer Data:", data.dataList[0]);

                    if (data.status === "SUCCESS" && !data.hasError) {
                        setCustomerData(data.dataList[0]);
                    } else {
                        console.error("Error fetching data:", data.message);
                        setCustomerData(null)
                        return null;
                    }
                } catch (error) {
                    console.error("Network error:", error);
                    setCustomerData(null)
                }
            };
            fetchCustomerData(user.id)
        }
    }, [user])


    return (
        <div className=' w-full select-none font-Dana box-border items-center bg-white h-full  '>
            <Navbar />
            <div className='custome-container mb-2'>
                <div className='w-full grid grid-cols-12 gap-y-2 md:gap-x-10 md:px-5 mt-2'>
                    <div className='col-span-12 lg:col-span-8' >
                        <ProductForRegistration selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} setCustomerData={setCustomerData} customerData={customerData} />
                    </div>
                    <div className='col-span-12 lg:col-span-4 h-full  ' >
                        <RegistrationForBuy selectedAddress={selectedAddress} cartItems={cartItems} customerData={customerData} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
