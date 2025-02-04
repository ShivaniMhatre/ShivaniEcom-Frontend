import { useState } from "react"
import ProductCards from "./ProductCards";
import ShopFiltering from "./ShopFiltering";
import {  useFetchAllProductsQuery } from "../../redux/features/products/productApi";

const filters = {
    categories: ['all', 'accessories', 'dress', 'jewellery', 'cosmetics'],
    colors: ['all', 'black', 'red', 'blue', 'gold', 'silver', 'beige', 'green'],
    priceRanges: [
        { label: 'Under ₹50', min: 0, max: 50 },
        { label: '₹50 - ₹100', min: 50, max: 100 },
        { label: '₹100 - ₹200', min: 100, max: 200 },
        { label: '₹200 and Above', min: 200, max: Infinity },
    ]
}
export default function ShopPage() {
    const [filtersState, setFiltersState] = useState({
        category: 'all',
        color: 'all',
        priceRange: ''
    })

    const [currentPage, setCurrentPage] = useState(1);
    const [productPerPage] = useState(8)

    const { category, color, priceRange } = filtersState;
    const [minPrice, maxPrice] = priceRange.split('-').map(Number)

    const { data: { products = [], totalPage, totalProducts } = {}, error, isLoading } = useFetchAllProductsQuery({
        category: category !== 'all' ? category : '',
        color: color !== 'all' ? color : '',
        minPrice: isNaN(minPrice) ? '' : minPrice,
        maxPrice: isNaN(maxPrice) ? '' : maxPrice,
        page: currentPage,
        limit: productPerPage
    })

    // clear filter
    const clearFilters = () => {
        setFiltersState({
            category: 'all',
            color: 'all',
            priceRange: ''
        })
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error While Loading Products</div>

    const startProduct = (currentPage - 1) * productPerPage + 1
    const endProduct = startProduct + products.length - 1

    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPage) {
            setCurrentPage(pageNumber)
        }
    }
    return (
        <>
            <section className='section__container bg-primary-light'>
                <h2 className='section__header capitalize'>Shop Page</h2>
                <p className='section__subheader'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, praesentium?</p>
            </section>

            <section className="section__container">
                <div className="flex flex-col md:flex-row md:gap-12 gap-8">
                    {/* left side */}
                    <ShopFiltering
                        filters={filters}
                        filtersState={filtersState}
                        setFiltersState={setFiltersState}
                        clearFilters={clearFilters}
                    />

                    {/* Right Side */}
                    <div>
                        <h3 className="text-xl font-medium mb-4">
                            Showing {startProduct} to {endProduct} of {totalProducts} product
                        </h3>
                        <ProductCards products={products} />

                        {/* Pagination control */}
                        <div className="mt-6 flex justify-center">
                            <button
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                Previous
                            </button>

                            {
                                [...Array(totalPage)].map((_, index) => (
                                    <button
                                        onClick={() => handlePageChange(index + 1)}
                                        key={index}
                                        className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} rounded-md mx-1`}>{index + 1}</button>
                                ))
                            }
                            <button
                                disabled={currentPage === totalPage}
                                onClick={() => handlePageChange(currentPage + 1)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2"
                            >
                                Next
                            </button>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}
