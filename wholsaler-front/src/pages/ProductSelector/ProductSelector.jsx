import React, { useEffect, useReducer, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import ProductInProductSelector from '../../Components/PAdmin/ProductInProductSelector/ProductInProductSelector'
import SortSection from '../../Components/PAdmin/SortSection/SortSection'
import FilterInProductSelector from '../../Components/FilterInProductSelector/FilterInProductSelector'
import Footer from '../../Components/Footer/Footer'
import { useLocation } from 'react-router-dom'

const initialState = {
    category: "",
    searchTarget: "",
    brand: "",
    priceRange: {
        min: 0,
        max: 10000000
    },
    sort: 3,
    onlyAvailable: false,
    onlyDiscounted: false,
};

const filterReducer = (state, action) => {
    switch (action.type) {
        case "SET_CATEGORY":
            return { ...state, category: action.payload };
        case "SET_SEARCHTARGET":
            return { ...state, searchTarget: action.payload };
        case "SET_BRAND":
            return { ...state, brand: action.payload };
        case "SET_SORT":
            return { ...state, sort: action.payload };
        case "SET_MIN_PRICE":
            return { ...state, priceRange: { ...state.priceRange, min: action.payload } };
        case "SET_MAX_PRICE":
            return { ...state, priceRange: { ...state.priceRange, max: action.payload } };
        case "TOGGLE_ONLY_AVAILABLE":
            return { ...state, onlyAvailable: !state.onlyAvailable };
        case "TOGGLE_ONLY_DISCOUNTED":
            return { ...state, onlyDiscounted: !state.onlyDiscounted };
        default:
            return state;
    }
};

export default function ProductSelector() {

    const [loading, setLoading] = useState(true)
    const location = useLocation();
    const receivedData = location.state || { type: "nothing" };

    const [products, setProducts] = useState([])

    const [currentPage, setCurrentPage] = useState(0);

    const [totalProducts, setTotalProducts] = useState(0);
    const itemsPerPage = 10;

    const handlePageClick = (event) => {
        const selectedPage = event.selected;
        setCurrentPage(selectedPage);
        sessionStorage.setItem("selectorPage", selectedPage);
    };



    const [state, dispatch] = useReducer(filterReducer, initialState);

    const [openFilter, setOpenFilter] = useState(false)
    const sortList = [
        ["bestSeller", "پرفروش‌ترین‌", 3],
        ["new", "پرتخفیف‌‌ ترین", 4],
        ["view", "پربازدید ترین", 5],
        ["cheap", "ارزان‌ترین", 1],
        ["expensive", "گران‌ترین", 2],
    ]

    const handleCategoryChange = (value) => {
        dispatch({ type: "SET_CATEGORY", payload: value });
    };
    const handleSearchTargetChange = (value) => {
        dispatch({ type: "SET_SEARCHTARGET", payload: value });
    };

    const handleBrandChange = (value) => {
        dispatch({ type: "SET_BRAND", payload: value });
    };

    const handleMinPriceChange = (value) => {
        dispatch({ type: "SET_MIN_PRICE", payload: value });
    };

    const handleChangeSort = (value) => {
        dispatch({ type: "SET_SORT", payload: value });
    };

    const handleMaxPriceChange = (value) => {
        dispatch({ type: "SET_MAX_PRICE", payload: value });
    };

    const toggleAvailable = () => {
        dispatch({ type: "TOGGLE_ONLY_AVAILABLE" });
    };

    const toggleDiscounted = () => {
        dispatch({ type: "TOGGLE_ONLY_DISCOUNTED" });
    };

    useEffect(() => {
        if (receivedData && receivedData.type) {
            if (receivedData.type === "category") {
                handleCategoryChange(receivedData.id);
            } else if (receivedData.type === "brand") {
                handleBrandChange(receivedData.id);
            } else if (receivedData.type === "poster") {
                handleSearchTargetChange(receivedData.category);
            } else if (receivedData.type === "search") {
                handleSearchTargetChange(receivedData.searchTerm);
            } else if (receivedData.type === "filter") {
                handleChangeSort(receivedData.sort)
            }
        }

    }, [receivedData])

    const fetchProducts = async () => {

        setLoading(true)
        const queryParams = { pageSize: itemsPerPage, pageNumber: currentPage, sortBy: 1 };
        // console.log("state", state)
        if (state.category !== '') queryParams.category = state.category;
        if (state.searchTarget !== '') queryParams.searchTarget = state.searchTarget;
        if (state.brand !== '') queryParams.brand = state.brand;
        if (state.priceRange.min !== 0) queryParams.minPrice = state.priceRange.min;
        if (state.priceRange.max !== 10000000) queryParams.maxPrice = state.priceRange.max;
        if (state.onlyDiscounted !== false) queryParams.hasDiscount = state.onlyDiscounted;
        if (state.onlyAvailable !== false) queryParams.isExist = state.onlyAvailable;
        if (state.sort !== 3) queryParams.sortBy = state.sort;
        // if (state.sortBy !== '') queryParams.sortBy = state.sort;

        // console.log(queryParams)
        const queryString = new URLSearchParams(queryParams).toString();
        console.log(`/api/product?${queryString}`)
        try {
            const response = await fetch(`/api/product?${queryString}`);
            const data = await response.json();
            // console.log(data)
            // console.log("state", state)
            if (data.status === "SUCCESS" && !data.hasError) {
                // console.log("data.dataList : ", data.dataList)
                setTotalProducts(data.totalCount)
                setProducts(data.dataList);
            } else {
                console.error("Error:", data.message);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        const debounceFetch = setTimeout(() => {
            fetchProducts();
        }, 300);
        return () => clearTimeout(debounceFetch);
    }, [
        receivedData,
        state.category,
        state.searchTarget,
        state.brand,
        state.priceRange.min,
        state.priceRange.max,
        state.onlyAvailable,
        state.onlyDiscounted,
        state.sort,
        currentPage,
        receivedData
    ])



    return (
        <div className=' w-full flex flex-col justify-between select-none font-Dana box-border min-h-screen items-center bg-white '>
            <div className='flex-1 w-full'>
                <Navbar searchText={receivedData.type === "search" ? receivedData.searchTerm : ""} />
                <div className=' px-0 mb-2 h-full' >
                    <div className='flex custome-container mb-2 gap-3 items-center '>
                        <button className={`${openFilter ? "hidden" : ""} btn py-1 px-2 text-sm `} onClick={() => setOpenFilter(prev => !prev)}  > فیلتر ها </button>
                        <SortSection setSort={handleChangeSort} value={state.sort} classActive='bg-blue-500 text-white' classHover='hover:text-blue-800' className='text-black' data={sortList} />
                    </div>
                    <div className='custome-container auto-rows-min h-full  grid grid-cols-12'>

                        <FilterInProductSelector
                            toggleAvailable={toggleAvailable}
                            toggleDiscounted={toggleDiscounted}
                            AvailableBtn={state.onlyAvailable}
                            DiscountedBtn={state.onlyDiscounted}
                            handleMinPriceChange={handleMinPriceChange}
                            handleMaxPriceChange={handleMaxPriceChange}
                            priceRange={state.priceRange}
                            brandValue={state.brand}
                            handleBrandChange={handleBrandChange}
                            categoryValue={state.category}
                            handleCategoryChange={handleCategoryChange}
                            isOpen={openFilter}
                            onClose={() => setOpenFilter(prev => !prev)}
                        />

                        <div className={`col-span-full h-full  ${openFilter ? "sm:col-span-9" : null}`}>
                            <ProductInProductSelector loading={loading} pageCount={Math.ceil(totalProducts / itemsPerPage)} currentPage={currentPage} handlePageClick={handlePageClick} openFilter={openFilter} data={products} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
