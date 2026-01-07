import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useStore from '../store/useStore';
import { formatCurrency } from '../utils/formatCurrency';
import { ArrowLeft, ShoppingCart, Check } from 'lucide-react';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const products = useStore((state) => state.products);
    const addToCart = useStore((state) => state.addToCart);

    // Check if passed via navigation state, otherwise default to 'home'
    const defaultVariant = location.state?.defaultVariant || 'home';

    const product = products.find(p => p.id === parseInt(id));
    const [selectedSize, setSelectedSize] = useState('');
    const [variant, setVariant] = useState(defaultVariant);
    const [isAdded, setIsAdded] = useState(false);

    // Update variant if location state changes (unlikely here but good practice)
    useEffect(() => {
        if (location.state?.defaultVariant) {
            setVariant(location.state.defaultVariant);
        }
    }, [location.state]);

    if (!product) return <div className="text-white text-center py-20">Product not found</div>;

    const currentVariant = product.variants[variant];

    const handleAddToCart = () => {
        if (!selectedSize) return alert('Please select a size');
        addToCart({
            ...product,
            image: currentVariant.image,
            name: `${product.name} (${variant === 'home' ? 'Home' : 'Away'})`,
            variant: variant,
            size: selectedSize
        });
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="min-h-screen max-w-7xl mx-auto px-6 md:px-8 py-12">
            <button onClick={() => navigate(-1)} className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" /> Back
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-white/5 relative group">
                    <img
                        src={currentVariant.image}
                        alt={`${product.name} ${variant}`}
                        className="w-full h-full object-cover transition-all duration-500"
                    />
                    <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-3">
                        <button
                            onClick={() => setVariant('home')}
                            className={`px-4 py-2 rounded-full font-bold text-sm backdrop-blur-md transition-all ${variant === 'home' ? 'bg-white text-black' : 'bg-black/50 text-white hover:bg-black/70'
                                }`}
                        >
                            Home
                        </button>
                        <button
                            onClick={() => setVariant('away')}
                            className={`px-4 py-2 rounded-full font-bold text-sm backdrop-blur-md transition-all ${variant === 'away' ? 'bg-blue-600 text-white' : 'bg-black/50 text-white hover:bg-black/70'
                                }`}
                        >
                            Away
                        </button>
                    </div>
                </div>

                <div className="flex flex-col justify-center">
                    <div className="text-blue-500 font-bold uppercase tracking-wider mb-2">{product.category}</div>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-2 leading-tight">{product.name}</h1>
                    <div className="text-lg font-semibold text-gray-300 mb-6 capitalize">{variant} Kit</div>

                    <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                        {currentVariant.description || product.description || "Experience the best quality jersey with breathable fabric and authentic design, perfect for match days or casual wear."}
                    </p>

                    <div className="text-3xl font-bold text-white mb-8">{formatCurrency(product.price)}</div>

                    <div className="mb-8">
                        <div className="text-sm text-gray-400 font-bold mb-3 uppercase">Select Size</div>
                        <div className="flex gap-4">
                            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`w-12 h-12 rounded-lg font-bold border-2 transition-all ${selectedSize === size
                                            ? 'border-blue-600 bg-blue-600 text-white'
                                            : 'border-white/10 text-gray-400 hover:border-white/30'
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        disabled={!selectedSize}
                        className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${isAdded
                                ? 'bg-green-600 text-white'
                                : selectedSize
                                    ? 'bg-blue-600 text-white hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/30'
                                    : 'bg-white/10 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        {isAdded ? <><Check /> Added to Cart</> : <><ShoppingCart /> Add to Cart</>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
