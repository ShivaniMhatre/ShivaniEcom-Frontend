import { useState } from "react";
import { useDeleteOrderMutation, useGetAllOrdersQuery } from "../../../../redux/features/orders/orderApi"
import { toast } from 'react-toastify'
import { formatDate } from "../../../../utils/fomatDate";
import { Link } from 'react-router-dom'
import UpdateOrderModal from "./UpdateOrderModal";

export default function ManageOrder() {
    const { data: orders, error, isLoading, refetch } = useGetAllOrdersQuery()
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false)

    console.log(orders)
    const [deleteOrder] = useDeleteOrderMutation();

    const handleEditOrder = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null)
    }

    const handleDeleteOrder = async (orderId) => {
        try {
            await deleteOrder(orderId).unwrap()
            toast.success("Order Deleted Successfullt")
            await refetch()
        } catch (error) {
            toast.error('Failed To delet:', error)
        }
    }

    if (isLoading) return <div>Loading....</div>
    if (error) return <div>Something went wrong!</div>

    return (
        <div className='section__container p-6'>
            <h2 className='text-2xl font-semibold mb-4'>Manage Orders</h2>
            <table className='min-w-full bg-white border border-gray-200 rounded-lg'>
                <thead className='bg-gray-100'>
                    <tr>
                        <th className='py-3 px-4 border-b'>Order Id</th>
                        <th className='py-3 px-4 border-b'>Customer</th>
                        <th className='py-3 px-4 border-b'>Status</th>
                        <th className='py-3 px-4 border-b'>Date</th>
                        <th className='py-3 px-2 border-b'>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        orders && orders.map((order, index) => (
                            <tr key={index}>
                                <td className='py-3 px-4 border-b'>{order?.orderId}</td>
                                <td className='py-3 px-4 border-b'>{order?.email}</td>
                                <td className='py-3 px-4 border-b'>
                                    <span className={`inline-block px-3 py-1 text-xs text-white rounded-full ${getStatusColor(order?.status)}`}>{order?.status}</span>
                                </td>
                                <td className='py-3 px-4 border-b'>{formatDate(order?.updatedAt)}</td>
                                <td className='py-3 px-2 border-b flex items-center space-x-4'>
                                    <Link to={`/orders/${order?._id}`} className="text-blue-500 "><i className="ri-eye-line"></i></Link>
                                    <button className="text-green-500" onClick={() => handleEditOrder(order)}><i className="ri-file-edit-line"></i></button>
                                    <button className="text-red-500" onClick={() => handleDeleteOrder(order?._id)}><i className="ri-delete-bin-6-line"></i></button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            {/* update order modal */}
            {
                selectedOrder && (
                    <UpdateOrderModal
                        order={selectedOrder}
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                    />
                )
            }
        </div>
    )
}

const getStatusColor = (status) => {
    switch (status) {
        case 'pending':
            return 'bg-yellow-500';
        case 'shipped':
            return 'bg-green-500';
        case 'processing':
            return 'bg-blue-500';
        case 'completed':
            return 'bg-gray-500';
        default:
            return 'bg-green-500';
    }
}


