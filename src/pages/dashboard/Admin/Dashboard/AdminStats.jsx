
export default function AdminStats({ stats }) {
    console.log(stats)
    return (
        <div className="my-5 space-y-4">
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 grid-cols-1 sm:grid-cols-2">
                <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:scale-105 transition-all duration-200">
                    <h2 className="text-xl font-semi mb-2">Total Earning</h2>
                    <p className="text-2xl font-bold">&#8377; {stats?.totalEarnings.toFixed(2)}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:scale-105 transition-all duration-200">
                    <h2 className="text-xl font-semi mb-2">Total Orders</h2>
                    <p className="text-2xl font-bold">{stats?.totalOrder}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:scale-105 transition-all duration-200">
                    <h2 className="text-xl font-semi mb-2">Total User</h2>
                    <p className="text-2xl font-bold">{stats?.totalUser}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:scale-105 transition-all duration-200">
                    <h2 className="text-xl font-semi mb-2">Total Products</h2>
                    <p className="text-2xl font-bold">{stats?.totalProduct}</p>
                </div>
            </div>
        </div>
    )
}
