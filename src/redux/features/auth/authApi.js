import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseURL } from '../../../utils/baseURL';

const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseURL()}/api/auth`,
        credentials: 'include'
    }),
    tagTypes:['Users'],
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (newUser) => ({
                url: '/register',
                method: 'POST',
                body: newUser
            })
        }),
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: "/login",
                method: "POST",
                body: credentials,
            }),
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "POST"
            }),
        }),
        getUser: builder.query({
            query: () => ({
                url: "/getalluser",
                method: "GET"
            }),
            refetchOnMount: true,
            invalidatesTags: ['Users'],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/deleteUser/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Users'],
        }),
        updateRole: builder.mutation({
            query: ({ userId, role }) => ({
                url: `/updateRole/${userId}`,
                method: "PUT",
                body: { role }
            }),
            refetchOnMount: true,
            invalidatesTags: ['Users'],
        }),
        editProfile: builder.mutation({
            query: (profileData) => ({
                url: `/edit-profile`,
                method: "PATCH",
                body: profileData
              }),
        })
    })
})

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useGetUserQuery,
    useDeleteUserMutation,
    useEditProfileMutation,
    useUpdateRoleMutation } = authApi;
export default authApi