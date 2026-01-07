import { Link, useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import { formatCurrency } from '../utils/formatCurrency';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

const Cart = () => {
    const navigate = useNavigate();
    const { cart, removeFromCart, updateQuantity } = useStore();

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    if (cart.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
                <h2 className="text-3xl font-bold text-white mb-4">Your cart is empty</h2>
                <p className="text-gray-400 mb-8">It looks like you haven't added any jerseys yet.</p>
                <Link to="/category" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-500 transition-all">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen max-w-7xl mx-auto px-6 md:px-8 py-12">
            <h1 className="text-4xl font-black text-white mb-12">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-6">
                    {cart.map((item, index) => (
                        <div key={`${item.id}-${item.size}-${item.variant}-${index}`} className="bg-white/5 border border-white/5 rounded-2xl p-6 flex gap-6 items-center">
                            <div className="w-24 h-24 bg-white/5 rounded-xl overflow-hidden shadow-inner flex-shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>

                            <div className="flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <div className="text-blue-500 text-xs font-bold uppercase mb-1">{item.category}</div>
                                        <h3 className="text-xl font-bold text-white">{item.name}</h3>
                                        <div className="text-gray-400 text-sm">Size: <span className="text-white font-bold">{item.size}</span></div>
                                        {/* Variant is likely part of the name now, but good to ensure uniqueness */}
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id, item.size, item.variant)}
                                        className="text-gray-500 hover:text-red-500 transition-colors p-2"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="flex justify-between items-end mt-4">
                                    <div className="flex items-center gap-3 bg-black/40 rounded-lg p-1">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.size, item.variant, item.quantity - 1)}
                                            className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 rounded-md transition-colors"
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="font-bold text-white w-4 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.size, item.variant, item.quantity + 1)}
                                            className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 rounded-md transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="text-xl font-bold text-white">
                                        {formatCurrency(item.price * item.quantity)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-white/5 border border-white/5 rounded-2xl p-8 sticky top-24">
                        <h3 className="text-2xl font-bold text-white mb-6">Order Summary</h3>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-gray-400">
                                <span>Subtotal</span>
                                <span className="text-white font-bold">{formatCurrency(total)}</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <span>Shipping</span>
                                <span className="text-green-400 font-bold">Free</span>
                            </div>
                            <div className="h-px bg-white/10 my-4"></div>
                            <div className="flex justify-between text-xl font-bold text-white">
                                <span>Total</span>
                                <span>{formatCurrency(total)}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/checkout')}
                            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-500 shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
                        >
                            Checkout <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
