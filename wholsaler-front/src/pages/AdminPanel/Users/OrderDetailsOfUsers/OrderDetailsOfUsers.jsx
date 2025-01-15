import React from 'react'
import ItemsList from '../../../Profile/ItemsList/ItemsList'
import { useLocation } from 'react-router-dom';
export default function OrderDetailsOfUsers() {
    const location = useLocation();
    const order = location.state || {};
    console.log("OrderDetailsOfUsers order:" , order)
    return (
        <div className='h-full overflow-y-auto p-3 pt-8 md:p-5'>
            <ItemsList data={order} spanColor="text-gray-200 pt-0 md:pt-5" className="text-white font-Dana" src="../../images/products/oil.webp" />
        </div>

    )
}
