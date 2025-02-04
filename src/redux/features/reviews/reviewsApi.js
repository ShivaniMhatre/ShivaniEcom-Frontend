import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getBaseURL } from '../../../utils/baseURL'

const reviewsApi = createApi({
    reducerPath: 'reviewsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseURL()}/api/review`,
        credentials: 'include'
    }),
    tagTypes: ['Reviews'],
    endpoints: (builder) => ({
        postReview: builder.mutation({
            query: (reviewData) => ({
                url: "/postReview",
                method: "POST",
                body: reviewData
            }),
            invalidatesTags: (result, error, {postId}) => [{type: "Reviews", id: postId}]
        }),
        getReviewCount: builder.query({
            query: () => ({
                url: "/totalReviews",

            })
        }),
        // getReviewsByUserId: builder.query({
        //     query: (userId) => ({
        //         url: `/${userId}`,
        //     }),
        //     providesTags: (result) => result ? [{ type: "Reviews", id: result[0]?.email }] : []
        // }),
        getReviewsByUserId: builder.query({
            query: (userId) => ({
                url: `/${userId}`
            }),
            providesTags: (result) => result ? [{type: "Reviews", id: result[0]?.email}] : []
        })
    })
})

export const {
    useGetReviewCountQuery,
    useGetReviewsByUserIdQuery,
    usePostReviewMutation
} = reviewsApi

export default reviewsApi