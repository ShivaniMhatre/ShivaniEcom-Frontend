
export default function UserStats({ stats }) {
    return (
        <div className="my-5 space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 grid-cols-1">
                <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-lg hover:border-primary cursor-pointer hover:scale-105 transition-all duration-200">
                    <h2 className="text-xl font-semibold mb-2">Total Payments</h2>
                    <p className="text-2xl font-bold">&#8377; {stats?.totalPayment}</p>
                </div>
                <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-lg hover:border-primary cursor-pointer hover:scale-105 transition-all duration-200">
                    <h2 className="text-xl font-semibold mb-2">Total Review</h2>
                    <p className="text-2xl font-bold"> {stats?.totalReview}</p>
                </div>
                <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-lg hover:border-primary cursor-pointer hover:scale-105 transition-all duration-200">
                    <h2 className="text-xl font-semibold mb-2">Total Purchaased Product</h2>
                    <p className="text-2xl font-bold">&#8377; {stats?.totalPurchasedProduct}</p>
                </div>
            </div>
        </div>
    )
}
