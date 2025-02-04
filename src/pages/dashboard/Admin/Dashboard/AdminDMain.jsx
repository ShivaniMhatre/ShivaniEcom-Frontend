import { useSelector } from "react-redux"
import { useGetAdminStatsQuery } from "../../../../redux/features/stats/statsApi"
import lodingGif from '../../../../assets/web-5811_256.gif'
import AdminStats from "./AdminStats";
import AdminCharts from "./AdminCharts";

export default function AdminDMain() {
    const { user } = useSelector((state) => state.auth)
    const { data: stats, error, isLoading } = useGetAdminStatsQuery();

    if (isLoading) return <div className="flex justify-center"><img src={lodingGif} className="size-14" /> </div>
    if (!stats) return <div>No stats found...</div>
    if (error) return <div>No Orders Found....</div>

    return (
        <div className="p-6">
            <div>
                <h1 className="text-2xl font-semibold mb-4">Admin Dashboard </h1>
                <p className="text-gray-500">Hi, {user?.username}! Welcome to the admin dashboard</p>
                <AdminStats stats={stats} />
                <AdminCharts stats={stats} />
            </div>
        </div>
    )
}
