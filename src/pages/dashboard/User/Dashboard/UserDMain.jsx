import { useSelector } from "react-redux"
import { useGetUserStatsQuery } from "../../../../redux/features/stats/statsApi"
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import UserStats from "./UserStats"
import  lodingGif  from '../../../../assets/web-5811_256.gif'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function UserDMain() {
    const { user } = useSelector((state) => state.auth)
    const { data: stats, error, isLoading } = useGetUserStatsQuery(user?.email)
    console.log(stats)
    if (isLoading) return <div className="text-center text-gray-500 justify-center"><img src={lodingGif} className="size-14"/></div>
    if (!stats) {
        return <div className="text-center text-gray-500">No Data Available......</div>
    }

    const data = {
        labels: ['Total Payments', 'Total Reviews', 'Total Purchaased Product'],
        datasets: [
            {
                label: 'User Stats',
                data: [stats.totalPayment, stats.totalReview * 100, stats.totalPurchasedProduct * 100],
                backgroundColor: 'rgba(76,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,

            }
        ]
    }
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {

                        return `${tooltipItem.label}:${tooltipItem.raw}`

                    }
                }
            }
        }
    }
    return (
        <div className="p-6">
            <div>
                <h1 className="text-2xl font-semibold mb-4">User Dashboard</h1>
                <p className="text-gray-500">Hi, {user?.username}! Welcome to your user dashboard</p>
            </div>
            <UserStats stats={stats} />
            <div className="mb-6">
                <Bar data={data} options={options} />
            </div>
        </div>
    )
}
