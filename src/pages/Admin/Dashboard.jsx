import useStore from '../../store/useStore';
import { formatCurrency } from '../../utils/formatCurrency';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, Trash2, Edit, Printer, ArrowRight, TrendingUp, PackageOpen, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderHistory from './OrderHistory';
import ProductModal from '../../components/Admin/ProductModal';

const Dashboard = ({ defaultTab = 'dashboard' }) => {
    const { products, deleteProduct, fetchProducts, addProduct, updateProduct } = useStore();
    const [activeTab, setActiveTab] = useState(defaultTab);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [recentOrders, setRecentOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
        
        // Fetch recent orders for dashboard
        fetch('http://localhost:5000/api/orders')
            .then(res => res.json())
            .then(data => setRecentOrders(data.slice(0, 5))) // Just get top 5
            .catch(err => console.error(err));
    }, [fetchProducts]);

    useEffect(() => {
        setActiveTab(defaultTab);
    }, [defaultTab]);

    const handleAddProduct = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleSaveProduct = (formData) => {
        if (editingProduct) {
            updateProduct(editingProduct.id, formData);
        } else {
            addProduct(formData);
        }
    };

    const mockSalesData = [
        { day: 'Mon', revenue: 15000000 },
        { day: 'Tue', revenue: 22000000 },
        { day: 'Wed', revenue: 18000000 },
        { day: 'Thu', revenue: 35000000 },
        { day: 'Fri', revenue: 28000000 },
        { day: 'Sat', revenue: 45000000 },
        { day: 'Sun', revenue: 52000000 },
    ];

    // Derived states for widgets
    const lowStockItems = products.filter(p => (p.stock_home + p.stock_away) > 0 && (p.stock_home + p.stock_away) <= 10);
    const outOfStockItems = products.filter(p => (p.stock_home + p.stock_away) <= 0);
    
    // Mock top products for preview - usually derived from actual order item counts
    const topProducts = [...products].slice(0, 4);

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black text-white mb-2">
                        {activeTab === 'dashboard' && 'Dashboard Overview'}
                        {activeTab === 'products' && 'Product Management'}
                        {activeTab === 'orders' && 'Order Management'}
                        {activeTab === 'settings' && 'Platform Settings'}
                    </h1>
                </div>
                {activeTab === 'products' && (
                    <button 
                        onClick={handleAddProduct}
                        className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20"
                    >
                        <Plus className="w-5 h-5" /> Add Product
                    </button>
                )}
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                    <div className="text-gray-400 text-sm font-bold uppercase mb-2">Total Revenue</div>
                    <div className="text-3xl font-black text-white">{formatCurrency(125000000)}</div>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                    <div className="text-gray-400 text-sm font-bold uppercase mb-2">Total Orders</div>
                    <div className="text-3xl font-black text-white">342</div>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                    <div className="text-gray-400 text-sm font-bold uppercase mb-2">Active Products</div>
                    <div className="text-3xl font-black text-white">{products.length}</div>
                </div>
            </div>

            {/* Content Area */}
            {activeTab === 'products' && (
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-black/20 text-gray-400 text-xs uppercase font-bold">
                            <tr>
                                <th className="p-6">Product Name</th>
                                <th className="p-6">Category</th>
                                <th className="p-6">Price</th>
                                <th className="p-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-lg bg-white/5 overflow-hidden">
                                                {product.variants && product.variants.home ? (
                                                    <img src={product.variants.home.image} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <img src={product.image} alt="" className="w-full h-full object-cover" />
                                                )}
                                            </div>
                                            <span className="font-bold text-white">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-6 text-gray-400">{product.category}</td>
                                    <td className="p-6 text-white font-bold">{formatCurrency(product.price)}</td>
                                    <td className="p-6 text-right">
                                        <div className="flex justify-end gap-3">
                                            <button 
                                                onClick={() => handleEditProduct(product)}
                                                className="text-gray-400 hover:text-blue-400 transition-colors p-2 bg-white/5 rounded-lg"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => deleteProduct(product.id)}
                                                className="text-gray-400 hover:text-red-500 transition-colors p-2 bg-white/5 rounded-lg"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            
            {activeTab === 'orders' && <OrderHistory />}
            
            {activeTab === 'settings' && (
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden p-8 text-center">
                    <h3 className="text-xl font-bold text-white mb-2">Platform Settings</h3>
                    <p className="text-gray-400">Application configuration options can be added here.</p>
                </div>
            )}
            
            {activeTab === 'dashboard' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Main Charts and Tables */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Sales Chart */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <TrendingUp className="text-blue-500 w-5 h-5" /> Revenue Trends (Last 7 Days)
                                </h3>
                            </div>
                            <div className="h-72 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={mockSalesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                                        <XAxis dataKey="day" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `Rp ${value/1000000}M`} />
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                                            itemStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
                                            formatter={(value) => formatCurrency(value)}
                                        />
                                        <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Recent Orders Table */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                            <div className="flex justify-between items-center p-6 border-b border-white/10">
                                <h3 className="text-xl font-bold text-white leading-none">Recent Orders</h3>
                                <button 
                                    onClick={() => navigate('/admin/orders')}
                                    className="text-blue-500 hover:text-blue-400 font-bold flex items-center gap-2 text-sm transition-colors"
                                >
                                    View All <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                            
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-black/20 text-gray-400 text-xs uppercase font-bold">
                                        <tr>
                                            <th className="p-4 pl-6">Customer</th>
                                            <th className="p-4">Date</th>
                                            <th className="p-4">Total</th>
                                            <th className="p-4 pr-6">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {recentOrders.length > 0 ? recentOrders.map((order) => (
                                            <tr key={order.id} className="hover:bg-white/5 transition-colors">
                                                <td className="p-4 pl-6">
                                                    <div className="font-bold text-white">{order.customer_name}</div>
                                                    <div className="text-xs text-gray-500">{order.customer_email}</div>
                                                </td>
                                                <td className="p-4 text-gray-400">
                                                    {new Date(order.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="p-4 text-white font-bold">{formatCurrency(order.total_amount)}</td>
                                                <td className="p-4 pr-6">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                                    order.status === 'completed' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                                                    order.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                                                    'bg-red-500/10 text-red-500 border border-red-500/20'
                                                }`}>
                                                    {order.status}
                                                </span>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="4" className="p-8 text-center text-gray-500 font-medium">No recent orders found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Side Widgets */}
                    <div className="space-y-8">
                        {/* Top Products */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
                                <PackageOpen className="text-purple-500 w-5 h-5" /> Top Selling Jerseys
                            </h3>
                            <div className="space-y-4">
                                {topProducts.map((product, idx) => (
                                    <div key={product.id} className="flex items-center gap-4 group">
                                        <div className="w-10 h-10 rounded-lg bg-gray-800 overflow-hidden flex-shrink-0 relative">
                                            {product.variants && product.variants.home ? (
                                                <img src={product.variants.home.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                            ) : (
                                                <img src={product.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-bold text-white text-sm truncate">{product.name}</div>
                                            <div className="text-xs text-gray-400">{product.category}</div>
                                        </div>
                                        <div className="text-sm font-black text-white bg-white/10 px-2 py-1 rounded">
                                            #{idx + 1}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Inventory Alerts */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
                                <AlertCircle className="text-red-500 w-5 h-5" /> Inventory Alerts
                            </h3>
                            
                            <div className="space-y-4">
                                {outOfStockItems.length === 0 && lowStockItems.length === 0 && (
                                    <div className="text-gray-400 text-sm italic text-center py-4">All products adequately stocked.</div>
                                )}
                                
                                {outOfStockItems.map(item => (
                                    <div key={item.id} className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl flex justify-between items-center">
                                        <div className="min-w-0 flex-1">
                                            <div className="text-white font-bold text-sm truncate">{item.name}</div>
                                            <div className="text-red-500 text-xs font-bold uppercase mt-1">Out of Stock!</div>
                                        </div>
                                        <button onClick={() => { setActiveTab('products'); handleEditProduct(item); }} className="text-red-400 hover:text-white px-3 py-1 bg-red-500/20 rounded-lg text-xs font-bold transition-colors shrink-0 ml-3">
                                            Restock
                                        </button>
                                    </div>
                                ))}

                                {lowStockItems.map(item => (
                                    <div key={item.id} className="bg-yellow-500/5 border border-yellow-500/20 p-3 rounded-xl flex justify-between items-center">
                                        <div className="min-w-0 flex-1">
                                            <div className="text-white font-bold text-sm truncate">{item.name}</div>
                                            <div className="text-yellow-500 text-xs font-bold uppercase mt-1">Only {item.stock_home + item.stock_away} left</div>
                                        </div>
                                        <button onClick={() => { setActiveTab('products'); handleEditProduct(item); }} className="text-yellow-400 hover:text-white px-3 py-1 bg-yellow-500/20 rounded-lg text-xs font-bold transition-colors shrink-0 ml-3">
                                            Update
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <ProductModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSaveProduct}
                initialData={editingProduct}
            />
        </div>
    );
};

export default Dashboard;
