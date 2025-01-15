import React, { useContext, useEffect, useReducer, useState } from 'react'
import Filter from '../Filter/Filter';
import SortSection from '../SortSection/SortSection';
import ListOfProducts from '../ListOfProducts/ListOfProducts';
import PaginationButtons from '../../PaginationButtons/PaginationButtons';
import { TbEyeUp } from 'react-icons/tb';
import AuthContext from '../../../AuthContext';

const initialState = {
    category: "",
    brand: "",
    priceRange: {
        min: 0,
        max: 10000000
    },
    sort: 3,
    onlyAvailable: false,
    onlyNotAvailable: false,
    onlyDiscounted: false,
};

const filterReducer = (state, action) => {
    switch (action.type) {
        case "SET_CATEGORY":
            return { ...state, category: action.payload };
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
        case "TOGGLE_ONLY_NOT_AVAILABLE":
            return { ...state, onlyNotAvailable: !state.onlyNotAvailable };
        case "TOGGLE_ONLY_DISCOUNTED":
            return { ...state, onlyDiscounted: !state.onlyDiscounted };
        default:
            return state;
    }
};

export default function ProductList() {
    const {user} = useContext(AuthContext)

    const [currentPage, setCurrentPage] = useState(() => {
        const savedPage = sessionStorage.getItem("productsPage");
        return savedPage ? Number(savedPage) : 0;
    });

    const [totalProducts, setTotalProducts] = useState(0);
    const itemsPerPage = 10;

    const handlePageClick = (event) => {
        const selectedPage = event.selected;
        setCurrentPage(selectedPage);
        sessionStorage.setItem("productsPage", selectedPage); // ذخیره در sessionStorage
    };




    const [state, dispatch] = useReducer(filterReducer, initialState);
    const handleCategoryChange = (value) => {
        dispatch({ type: "SET_CATEGORY", payload: value });
    };

    const handleBrandChange = (value) => {
        dispatch({ type: "SET_BRAND", payload: value });
    };

    const handleMinPriceChange = (value) => {
        dispatch({ type: "SET_MIN_PRICE", payload: value });
    };
    const handleSortChange = (value) => {
        dispatch({ type: "SET_SORT", payload: value });
    };

    const handleMaxPriceChange = (value) => {
        dispatch({ type: "SET_MAX_PRICE", payload: value });
    };

    const toggleAvailable = () => {
        dispatch({ type: "TOGGLE_ONLY_AVAILABLE" });
    };
    const toggleNotAvailable = () => {
        dispatch({ type: "TOGGLE_ONLY_NOT_AVAILABLE" });
    };

    const toggleDiscounted = () => {
        dispatch({ type: "TOGGLE_ONLY_DISCOUNTED" });
    };

    const data = [
        ["bestSeller", "پرفروش‌ترین‌", 3],
        ["new", "پرتخفیف‌‌ ترین", 4], 
        ["view", "پربازدید ترین", 5 ],
        ["cheap", "ارزان‌ترین", 1],
        ["expensive", "گران‌ترین", 2],
    ]
    const [filterSideBar, setFilterSideBar] = useState(false)
    const filterSideBarHandler = () => {
        setFilterSideBar(prev => !prev)
    }

    const [products, setProducts] = useState([]);
    const [productLoading, setProductLoading] = useState(true);

    const fetchProducts = async () => {
        setProductLoading(true)
        const queryParams = { pageSize: itemsPerPage, pageNumber: currentPage, sortBy: 1 };
        console.log("state", state)
        if (state.category !== '') queryParams.category = state.category;
        if (state.brand !== '') queryParams.brand = state.brand;
        if (state.priceRange.min !== 0) queryParams.minPrice = state.priceRange.min;
        if (state.priceRange.max !== 10000000) queryParams.maxPrice = state.maxPrice.max;
        if (state.onlyDiscounted !== false) queryParams.hasDiscount = state.onlyDiscounted;
        if (state.onlyAvailable !== false) queryParams.isExist = true;
        if (state.onlyNotAvailable !== false) queryParams.isExist = false;
        if (state.sort !== 3) queryParams.sortBy = state.sort;
        // if (state.sortBy !== '') queryParams.sortBy = state.sort;

        console.log(queryParams)
        const queryString = new URLSearchParams(queryParams).toString();
        console.log(`/api/product/getAll?${queryString}`)
        try {
            console.log("url" , `/api/product/getAll?${queryString}`)
            const response = await fetch(`/api/product/getAll?${queryString}` , {
                headers : {
                    'Authorization': `Bearer ${user.token}`,
                }
            });
            const data = await response.json();

            if (data.status === "SUCCESS" && !data.hasError) {
                setProducts(data.dataList);
                setTotalProducts(data.totalCount)
            } else {
                console.error("Error:", data.message);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setProductLoading(false)
        }
    };

    console.log(state)

    useEffect(() => {
        const debounceFetch = setTimeout(() => {
            fetchProducts();
        }, 300);
        return () => clearTimeout(debounceFetch);
    }, [
        state.category,
        state.searchTarget,
        state.brand,
        state.priceRange.min,
        state.priceRange.max,
        state.onlyAvailable,
        state.onlyNotAvailable,
        state.onlyDiscounted,
        state.sort,
        currentPage,
    ])
    console.log("ddgsgsdg" , products)
    return (
        <div className='h-full flex flex-col'>
            <div className='flex w-full'>
                <div className='flex w-full gap-x-2 sm:justify-between items-center' >
                    <SortSection value={state.sort} setSort={handleSortChange} data={data} />
                    <button onClick={() => filterSideBarHandler()} className='text-white font-Dana bg-blue-500 p-1 px-2 rounded-md'>
                        فیلتر کردن
                    </button>
                </div>
                <Filter
                    toggleNotAvailable={toggleNotAvailable}
                    toggleAvailable={toggleAvailable}
                    toggleDiscounted={toggleDiscounted}
                    AvailableBtn={state.onlyAvailable}
                    NotAvailableBtn={state.onlyNotAvailable}
                    DiscountedBtn={state.onlyDiscounted}
                    handleMinPriceChange={handleMinPriceChange}
                    handleMaxPriceChange={handleMaxPriceChange}
                    priceRange={state.priceRange}
                    brandValue={state.brand}
                    handleBrandChange={handleBrandChange}
                    categoryValue={state.category}
                    handleCategoryChange={handleCategoryChange}
                    onClose={filterSideBarHandler}
                    isOpen={filterSideBar}
                />
            </div>
            <div className='flex-1 h-full flex flex-col justify-between'>
                <ListOfProducts productLoading={productLoading} fetchProducts={fetchProducts} products={products} />
                <PaginationButtons
                    pageCount={Math.ceil( totalProducts / itemsPerPage)}
                    currentPage={currentPage}
                    handlePageClick={handlePageClick}
                />
            </div>
        </div>
    )
}
