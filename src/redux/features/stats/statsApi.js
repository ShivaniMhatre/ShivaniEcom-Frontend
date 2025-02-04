import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getBaseURL } from '../../../utils/baseURL'

export const statsApi = createApi({
    reducerPath: 'statsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseURL()}/api/stats`,
        credentials: 'include'
    }),
    tagTypes: ['Stats'],
    endpoints: (builder) => ({
        getUserStats: builder.query({
            query: (email) => `/userStats/${email}`,
            providesTags: ['Stats']
        }),
        getAdminStats: builder.query({
            query: () => `/adminStats`,
            providesTags: ['Stats']
        }),
    })
})

export const { useGetAdminStatsQuery, useGetUserStatsQuery } = statsApi;

export default statsApi