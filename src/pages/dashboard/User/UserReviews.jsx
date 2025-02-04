import { useSelector } from "react-redux"
import { useGetReviewsByUserIdQuery } from "../../../redux/features/reviews/reviewsApi"
import lodingGif from '../../../assets/web-5811_256.gif'
import { useNavigate } from "react-router-dom";

export default function UserReviews() {
    const { user } = useSelector((state) => state.auth);

    const { data: reviews, error, isLoading } = useGetReviewsByUserIdQuery(user?._id);
    const reviewsData = reviews?.reviews || [];

    const navigate = useNavigate()

    if (isLoading) return <div className="flex justify-center"><img src={lodingGif} className="size-14" /></div>
    if (reviewsData.length === 0) return <div>No Reviews Found</div>

    const handleCardClick = () => {
        navigate('/shop')
    }

    console.log(reviews)
    return (
        <div className='py-6'>
            <h2 className='text-2xl font-bold mb-8"'>Your given reviews</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-8 gap-6'>
                {
                    reviewsData && (
                        reviewsData.map((review, index) => (
                            <div key={index} className="bg-white shadow-md rounded-lg p-4 border-gray-200 cursor-pointer hover:scale-105 transition-all duration-200 ">
                                <p className="text-lg font-semibold mb-2">Rating: {review?.rating}</p>
                                <p className="mb-2"><strong>Comment:</strong> {review?.comment}</p>
                                <p className="text-sm text-gray-500"><strong>Product Id:</strong> {review?.productId}</p>
                                <p className="text-sm text-gray-500"><strong>Date:</strong> {new Date(review?.createdAt).toLocaleDateString()}</p>
                            </div>
                        ))
                    )
                }
                <div className="bg-gray-100 text-black flex items-center justify-center rounded-lg p-6 border cursor-pointer hover:bg-primary hover:text-white transition-all duration-200"
                onClick={handleCardClick}>
                    <span>+</span>
                    <p>Add New Reviews</p>
                </div>
            </div>

        </div>
    )
}
