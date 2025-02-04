import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getBaseURL } from '../../../utils/baseURL'

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseURL()}/api/order`,
        credentials: 'include'
    }),
    tagTypes: ['Order'],
    endpoints: (builder) => ({
        getOrderByEmail: builder.query({
            query: (email) => ({
                url: `/${email}`,
                method: 'GET',
            }),
            providedTags: ['Order']
        }),
        getOrderById: builder.query({
            query: (orderId) => ({
                url: `/order/${orderId}`,
                method: 'GET',
            }),
            providedTags: ['Order']
        }),
        getAllOrders: builder.query({
            query: () => (
                {
                    url: '',
                    method: 'GET',  
                }
            ),
            providesTags: ['Order']
        }),
        updateOrderStatus: builder.mutation({
            query: ({id, status}) => ({
                url: `/updateOrderStatus/${id}`,
                method: 'PATCH',
                body: { status }
            }),
            invalidatesTags: ['Order']
        }),
        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `/deleteOrder/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Order']
        })
    })
})

export const {
    useGetOrderByEmailQuery,
    useGetOrderByIdQuery,
    useDeleteOrderMutation,
    useUpdateOrderStatusMutation,
    useGetAllOrdersQuery
} = orderApi
export default orderApi