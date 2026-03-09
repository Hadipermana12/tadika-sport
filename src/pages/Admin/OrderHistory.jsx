
import { useState, useEffect } from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import { Eye, Printer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/api/orders')
            .then(res => res.json())
            .then(data => setOrders(data))
            .catch(err => console.error(err));
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'text-green-500';
            case 'pending': return 'text-yellow-500';
            case 'cancelled': return 'text-red-500';
            default: return 'text-gray-400';
        }
    };

    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <h2 className="text-xl font-bold text-white p-6 border-b border-white/10">Order History</h2>
            <table className="w-full text-left">
                <thead className="bg-black/20 text-gray-400 text-xs uppercase font-bold">
                    <tr>
                        <th className="p-6">Order ID</th>
                        <th className="p-6">Customer</th>
                        <th className="p-6">Date</th>
                        <th className="p-6">Total</th>
                        <th className="p-6">Status</th>
                        <th className="p-6 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-white/5 transition-colors">
                            <td className="p-6 text-white font-mono">#{order.id}</td>
                            <td className="p-6">
                                <div className="font-bold text-white">{order.customer_name}</div>
                                <div className="text-xs text-gray-500">{order.customer_email}</div>
                            </td>
                            <td className="p-6 text-gray-400">
                                {new Date(order.created_at).toLocaleDateString()}
                            </td>
                            <td className="p-6 text-white font-bold">{formatCurrency(order.total_amount)}</td>
                            <td className={`p-6 font-bold uppercase ${getStatusColor(order.status)}`}>
                                {order.status}
                            </td>
                            <td className="p-6 text-right">
                                <button 
                                    onClick={() => navigate(`/invoice/${order.id}`)}
                                    className="text-blue-400 hover:text-blue-300 transition-colors p-2 bg-white/5 rounded-lg flex items-center gap-2 ml-auto"
                                >
                                    <Printer className="w-4 h-4" /> Invoice
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderHistory;
