import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/CartSlice'
import authApi from './features/auth/authApi'
import authReducer from './features/auth/authSlice'
import productApi from './features/products/productApi'
import reviewsApi from './features/reviews/reviewsApi'
import statsApi from './features/stats/statsApi'
import orderApi from './features/orders/orderApi'

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        [authApi.reducerPath]: authApi.reducer,
        auth: authReducer,
        [productApi.reducerPath]: productApi.reducer,
        [reviewsApi.reducerPath]: reviewsApi.reducer,
        [statsApi.reducerPath]: statsApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            productApi.middleware,
            reviewsApi.middleware,
            statsApi.middleware,
            orderApi.middleware),
})