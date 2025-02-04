import { useState } from 'react'
import commentorImage from '../../../assets/avatar.png'
import RatingStars from '../../../components/RatingStars'
import { formatDate } from '../../../utils/fomatDate'
import PostReview from './PostReview'

export default function ReviewCard({ productReviews }) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleOpenReviewModal = () => {
        setIsModalOpen(true)
    }
    const handleCloseReviewModal = () => {
        setIsModalOpen(false)
    }
    const reviews = productReviews || []
    return (
        <div className='my-6 bg-white p-8'>
            <div>
                {
                    reviews.length > 0 ? (<div>
                        <h3 className="text-lg font-medium">All Comments....</h3>
                        <div>
                            {
                                reviews.map((review, index) => (
                                    <div key={index}>
                                        <div className='flex gap-4 items-center'>
                                            <img src={commentorImage} alt="" className='size-14' />
                                            <div className='space-y-1 '>
                                                <p className='text-lg font-medium underline capitalize underline-offset-4 text-blue-400'>{review?.userId?.username}</p>
                                                <p className='text-[12px] italic'>{formatDate(review?.createdAt)}</p>
                                                <RatingStars rating={review?.rating} />
                                            </div>

                                        </div>
                                        <div className='text-gray-600 mt-5 border p-8'>
                                            <p className='md:w-4/5'>{review?.comment}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>) : <p>No Reviews Yet</p>
                }
            </div>

            {/* Add Review button */}
            <div className='mt-12'>
                <button
                    onClick={handleOpenReviewModal}
                    className='px-6 py-3 bg-primary text-white rounded-md'>Add a Review</button>
            </div>
            {/* Review modal */}
            <PostReview isModalOpen={isModalOpen} handleCloseReviewModal={handleCloseReviewModal} />
        </div>
    )
}
