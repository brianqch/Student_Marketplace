// components/ProductList/ProductList.js
import ProductCard from '../Shop Page/ProductCard';
import PaginationComponent from '../Shop Page/PaginationComponent';

export default function ProductList({ items, page, totalPages, handlePageChange }) {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <span>All products <span className="text-gray-600">({items ? items.length : 0} items)</span></span>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {items.map((item) => (
                        <ProductCard item={item} key={item.id} />
                    ))}
                </div>
                {/* Pagination */}
                <PaginationComponent 
                    totalPages={totalPages} 
                    currentPage={page} 
                    handlePageChange={handlePageChange} 
                />
            </div>
        </div>
    )
}
