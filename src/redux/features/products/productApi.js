import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getBaseURL } from '../../../utils/baseURL'

const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseURL()}/api/product`,
        credentials: 'include'
    }),
    tagTypes: ['Products'],
    endpoints: (builder) => ({
        fetchAllProducts: builder.query({
            query: ({
                category,
                color,
                minPrice,
                maxPrice,
                page = 1,
                limit = 10
            }) => {
                const quertParams = new URLSearchParams({
                    category: category || '',
                    color: color || '',
                    minPrice: minPrice || 0,
                    maxPrice: maxPrice || '',
                    page: page.toString(),
                    limit: limit.toString(),
                }).toString();
                return `/?${quertParams}`
            },
            providesTags: ['Products']
        }),
        fetchSingleProduct: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: 'Products', id }]
        }),
        fetchProductById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: "Products", id }],
          }),
      
        AddProduct: builder.mutation({
            query: (newProduct) => ({
                url: '/createProduct',
                method: 'POST',
                body: newProduct,
                credentials: "include"
            }),
            invalidatesTags: ['Products']
        }),
        fetchRelatedProducts: builder.query({
            query: (id) => `/relatedProduct/${id}`,
        }),
        updateProduct: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/updateProduct/${id}`,
                method: 'PATCH',
                body: rest,
                credentials: "include"
            }),
            invalidatesTags: ['Products']
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
                credentials: 'include'
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Products', id }]
        }),
    })
})

export const {
    useAddProductMutation,
    useFetchAllProductsQuery,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useFetchRelatedProductsQuery,
    useFetchSingleProductQuery,
    useFetchProductByIdQuery
} = productApi;
export default productApi