import useStore from '../../store/useStore';
import { formatCurrency } from '../../utils/formatCurrency';
import { Plus, Trash2, Edit } from 'lucide-react';

const Dashboard = () => {
    const { products, deleteProduct } = useStore();

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-black text-white">Product Management</h1>
                <button className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20">
                    <Plus className="w-5 h-5" /> Add Product
                </button>
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

            {/* Products Table */}
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
                                        <button className="text-gray-400 hover:text-blue-400 transition-colors p-2 bg-white/5 rounded-lg">
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
        </div>
    );
};

export default Dashboard;
