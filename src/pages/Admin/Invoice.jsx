
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';
import { Printer } from 'lucide-react';

const Invoice = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/api/orders/${id}`)
            .then(res => res.json())
            .then(data => {
                setOrder(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="text-white text-center p-10">Loading Invoice...</div>;
    if (!order) return <div className="text-red-500 text-center p-10">Order not found</div>;

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8 text-black">
            <div className="max-w-3xl mx-auto bg-white shadow-xl p-10 print:shadow-none print:max-w-full">
                {/* Header */}
                <div className="flex justify-between items-start mb-10">
                    <div>
                        <h1 className="text-4xl font-black text-blue-900 mb-2">INVOICE</h1>
                        <p className="text-gray-500 font-bold">#INV-{order.id.toString().padStart(6, '0')}</p>
                    </div>
                    <div className="text-right">
                        <h2 className="text-xl font-bold text-gray-800">TADIKA SPORT</h2>
                        <p className="text-sm text-gray-500">Jl. Olahraga No. 123</p>
                        <p className="text-sm text-gray-500">Jakarta, Indonesia</p>
                        <p className="text-sm text-gray-500">customercare@tadikasport.com</p>
                    </div>
                </div>

                {/* Customer & Order Info */}
                <div className="grid grid-cols-2 gap-10 mb-10 border-b-2 border-gray-100 pb-10">
                    <div>
                        <h3 className="text-xs uppercase tracking-wider font-bold text-gray-400 mb-4">Billed To</h3>
                        <div className="font-bold text-lg">{order.customer_name}</div>
                        <div className="text-gray-600">{order.address}</div>
                        <div className="text-gray-600">{order.city}, {order.postal_code}</div>
                        <div className="text-gray-600">{order.customer_email}</div>
                        <div className="text-gray-600">{order.phone_number}</div>
                    </div>
                    <div className="text-right">
                        <div className="mb-4">
                            <h3 className="text-xs uppercase tracking-wider font-bold text-gray-400">Order Date</h3>
                            <div className="font-bold">{new Date(order.created_at).toLocaleDateString()}</div>
                        </div>
                        <div>
                            <h3 className="text-xs uppercase tracking-wider font-bold text-gray-400">Order Status</h3>
                            <div className="font-bold uppercase text-blue-600">{order.status}</div>
                        </div>
                    </div>
                </div>

                {/* Items Table */}
                <table className="w-full mb-10">
                    <thead>
                        <tr className="bg-gray-50 text-left text-xs uppercase font-bold text-gray-400">
                            <th className="p-4 rounded-l-lg">Item Description</th>
                            <th className="p-4">Size</th>
                            <th className="p-4 text-center">Qty</th>
                            <th className="p-4 text-right rounded-r-lg">Price</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {order.items && order.items.map((item, index) => (
                            <tr key={index}>
                                <td className="p-4">
                                    <div className="font-bold text-gray-800">{item.product_name}</div>
                                    <div className="text-xs text-gray-500 capitalize">{item.variant_type} Kit</div>
                                </td>
                                <td className="p-4 font-mono text-sm">{item.size}</td>
                                <td className="p-4 text-center font-bold">{item.quantity}</td>
                                <td className="p-4 text-right font-bold text-gray-800">
                                    {formatCurrency(item.price * item.quantity)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Totals */}
                <div className="flex justify-end mb-12">
                    <div className="w-1/2">
                        <div className="flex justify-between py-3 border-b border-gray-100">
                            <span className="font-bold text-gray-500">Subtotal</span>
                            <span className="font-bold text-gray-800">{formatCurrency(order.total_amount)}</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-gray-100">
                            <span className="font-bold text-gray-500">Shipping</span>
                            <span className="font-bold text-gray-800">Free</span>
                        </div>
                        <div className="flex justify-between py-4 text-xl">
                            <span className="font-black text-gray-800">Total</span>
                            <span className="font-black text-blue-600">{formatCurrency(order.total_amount)}</span>
                        </div>
                    </div>
                </div>

                {/* Footer / Print Button */}
                <div className="flex justify-between items-center print:hidden border-t pt-8 border-gray-100">
                    <p className="text-sm text-gray-400">Thank you for shopping with Tadika Sport.</p>
                    <button 
                        onClick={handlePrint}
                        className="bg-black text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-800 transition-colors"
                    >
                        <Printer className="w-4 h-4" /> Print Invoice
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Invoice;
