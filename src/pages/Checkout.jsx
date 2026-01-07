import { useState } from 'react';
import useStore from '../store/useStore';
import { formatCurrency } from '../utils/formatCurrency';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const navigate = useNavigate();
    const { cart, clearCart } = useStore();
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsProcessing(true);
        // Simulate API call
        setTimeout(() => {
            clearCart();
            setIsProcessing(false);
            alert('Order placed successfully!');
            navigate('/home');
        }, 2000);
    };

    if (cart.length === 0) return null;

    return (
        <div className="min-h-screen max-w-4xl mx-auto px-6 md:px-8 py-12">
            <h1 className="text-3xl font-black text-white mb-8 text-center">Checkout</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-xl font-bold text-white mb-6">Shipping Details</h2>
                    <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input required type="text" placeholder="First Name" className="bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 w-full" />
                            <input required type="text" placeholder="Last Name" className="bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 w-full" />
                        </div>
                        <input required type="email" placeholder="Email Address" className="bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 w-full" />
                        <input required type="text" placeholder="Address" className="bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 w-full" />

                        <input required type="text" placeholder="Phone Number" className="bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 w-full" />
                    </form>
                </div>

                <div>
                    <h2 className="text-xl font-bold text-white mb-6">Your Order</h2>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                            {cart.map((item) => (
                                <div key={`${item.id}-${item.size}`} className="flex justify-between items-center bg-black/20 p-3 rounded-lg">
                                    <div>
                                        <div className="text-white font-bold text-sm">{item.name}</div>
                                        <div className="text-gray-400 text-xs">Size: {item.size} x {item.quantity}</div>
                                    </div>
                                    <div className="text-white font-bold text-sm">{formatCurrency(item.price * item.quantity)}</div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-white/10 pt-4 mb-6">
                            <div className="flex justify-between text-xl font-bold text-white">
                                <span>Total</span>
                                <span>{formatCurrency(total)}</span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            form="checkout-form"
                            disabled={isProcessing}
                            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${isProcessing
                                ? 'bg-gray-600 cursor-wait'
                                : 'bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-600/20'
                                }`}
                        >
                            {isProcessing ? 'Processing...' : 'Place Order'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
