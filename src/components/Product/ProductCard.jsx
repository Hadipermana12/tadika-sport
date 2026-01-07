import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import useStore from '../../store/useStore';

const ProductCard = ({ product }) => {
    const addToCart = useStore((state) => state.addToCart);
    const [variant, setVariant] = useState('home'); // 'home' or 'away'

    const handleAddToCart = (e) => {
        e.preventDefault();
        // Add to cart with current selected variant
        addToCart({
            ...product,
            image: product.variants[variant].image,
            name: `${product.name} (${variant === 'home' ? 'Home' : 'Away'})`,
            variant: variant,
            size: 'M'
        });
    };

    const currentVariant = product.variants[variant];

    return (
        <div className="group block bg-white/5 border border-white/5 rounded-2xl overflow-hidden hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(37,99,235,0.15)] transition-all duration-300">
            <Link to={`/product/${product.id}`} state={{ defaultVariant: variant }} className="block aspect-[4/5] overflow-hidden relative">
                <img
                    src={currentVariant.image}
                    alt={`${product.name} ${variant}`}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                <button
                    onClick={handleAddToCart}
                    className="absolute bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-blue-500 hover:scale-110 shadow-lg z-20"
                >
                    <ShoppingCart className="w-5 h-5" />
                </button>
            </Link>

            <div className="p-5">
                <div className="text-xs font-bold text-blue-400 mb-2 uppercase tracking-wider">{product.category}</div>
                <Link to={`/product/${product.id}`} className="block">
                    <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-blue-400 transition-colors">
                        {product.name}
                    </h3>
                </Link>

                {/* Variant Toggles */}
                <div className="flex gap-2 mb-3">
                    <button
                        onClick={(e) => { e.preventDefault(); setVariant('home'); }}
                        className={`px-3 py-1 rounded-md text-xs font-bold transition-colors border ${variant === 'home'
                                ? 'bg-white text-black border-white'
                                : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30'
                            }`}
                    >
                        Home
                    </button>
                    <button
                        onClick={(e) => { e.preventDefault(); setVariant('away'); }}
                        className={`px-3 py-1 rounded-md text-xs font-bold transition-colors border ${variant === 'away'
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30'
                            }`}
                    >
                        Away
                    </button>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-white">{formatCurrency(product.price)}</span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
