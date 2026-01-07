import { useState } from 'react';
import ProductGrid from '../components/Product/ProductGrid';
import useStore from '../store/useStore';

const Category = () => {
    const products = useStore((state) => state.products);
    const [filter, setFilter] = useState('All');

    const categories = ['All', 'Premier League', 'La Liga', 'Serie A'];

    const filteredProducts = filter === 'All'
        ? products
        : products.filter(p => p.category === filter);

    return (
        <div className="min-h-screen max-w-7xl mx-auto px-6 md:px-8 py-12">
            <h1 className="text-4xl font-black text-white mb-8 tracking-tight">Shop Jerseys</h1>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-4 mb-12">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${filter === cat
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <ProductGrid products={filteredProducts} />
        </div>
    );
};

export default Category;
