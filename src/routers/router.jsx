import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/home/Home'
import CategoryPage from '../pages/Category/CategoryPage'
import Search from '../pages/search/Search'
import ShopPage from '../pages/shop/ShopPage'
import SingleProduct from '../pages/shop/ProductDetails/SingleProduct'
import Login from '../components/Login'
import Register from '../components/Register'
import PaymentSuccess from '../components/PaymentSuccess'
import DashboardLayout from '../pages/dashboard/DashboardLayout'
import PrivateRoute from './PrivateRoute'
import UserDMain from '../pages/dashboard/User/Dashboard/UserDMain'
import UserOrder from '../pages/dashboard/User/UserOrder'
import OrderDetails from '../pages/dashboard/User/OrderDetails'
import UserPayments from '../pages/dashboard/User/UserPayments'
import UserReviews from '../pages/dashboard/User/UserReviews'
import UserProfile from '../pages/dashboard/User/UserProfile'
import AdminDMain from '../pages/dashboard/Admin/Dashboard/AdminDMain'
import AddProduct from '../pages/dashboard/Admin/AddProduct/AddProduct'
import ManageProduct from '../pages/dashboard/Admin/ManageProduct/ManageProduct'
import UpdateProduct from '../pages/dashboard/Admin/ManageProduct/UpdateProduct'
import ManageUser from '../pages/dashboard/Admin/users/ManageUser'
import ManageOrder from '../pages/dashboard/Admin/ManageOrder/ManageOrder'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/categories/:categoryName', element: <CategoryPage /> },
            { path: '/search', element: <Search /> },
            { path: "/shop", element: <ShopPage /> },
            { path: '/shop/:id', element: <SingleProduct /> },
            {
                path: "/success",
                element: <PaymentSuccess />
            },
            { path: '/orders/:orderId', element: <OrderDetails /> }
        ]
    },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },

    //dashboar route
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,// TODO Use Private Route here
        children: [
            //usr route
            { path: '', element: <UserDMain /> },
            { path: 'orders', element: <UserOrder /> },
            { path: 'payments', element: <UserPayments /> },
            { path: 'profile', element: <UserProfile /> },
            { path: 'reviews', element: <UserReviews /> },


            //admin route
            {
                path: 'admin',
                element:
                    <PrivateRoute role="admin"><AdminDMain /></PrivateRoute>
            },
            {
                path: 'add-product',
                element: <PrivateRoute role="admin"><AddProduct /></PrivateRoute>
            },
            {
                path: 'manage-products',
                element: <PrivateRoute role="admin"><ManageProduct /></PrivateRoute>
            },
            {
                path: 'update-product/:id',
                element: <PrivateRoute role="admin"><UpdateProduct /></PrivateRoute>
            },
            {
                path: 'users',
                element: <PrivateRoute role="admin"><ManageUser /></PrivateRoute>
            },
            {
                path: 'manage-orders',
                element: <PrivateRoute role="admin"><ManageOrder /> </PrivateRoute>
            },
        ]
    },

])

export default router