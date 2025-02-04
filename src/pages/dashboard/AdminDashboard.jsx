import { useDispatch } from "react-redux";
import { useLogoutUserMutation } from "../../redux/features/auth/authApi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";


const navItem = [
    { path: '/dashboard/admin', label: 'Dashboard' },
    { path: '/dashboard/add-product', label: 'Add New Product' },
    { path: '/dashboard/manage-products', label: 'Manage Product' },
    { path: '/dashboard/users', label: 'Users' },
    { path: '/dashboard/manage-orders', label: 'Manage Orders' },
]

export default function AdminDashboard() {
    const [logoutUser] = useLogoutUserMutation();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            await logoutUser().unwrap()
            dispatch(logout())
            navigate('/')
        } catch (error) {
            toast.error("Failed To Logout", error)
        }
    }
    return (
        <div  className="space-y-5 bg-white p-8 md:h-screen flex flex-col justify-between">
            <div>
                <div className="nav__logo">
                    <Link to='/'>Shivani<span>.</span></Link>
                    <p className='text-xs italic'>Admin Dashboard</p>
                </div>
                <hr className='mt-5' />
                <ul className='space-y-5 pt-5'>
                    {
                        navItem.map((item, index) => (
                            <li key={index}>
                                <NavLink
                                    className={
                                        ({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-black"}
                                    end
                                    to={item.path}>{item.label}</NavLink>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className='mb-3'>
                <hr className='mb-3' />
                <button
                    onClick={handleLogout}
                    className='text-white bg-primary font-medium px-5 py-1 rounded-sm'
                >
                    Logout
                </button>
            </div>
        </div>
    )
}
