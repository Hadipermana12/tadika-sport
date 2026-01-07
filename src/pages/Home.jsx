import Hero from '../components/Hero';
import ProductGrid from '../components/Product/ProductGrid';
import useStore from '../store/useStore';
import { FadeUp } from '../components/Common/Animations';

const Home = () => {
    const products = useStore((state) => state.products);
    const featuredProducts = products.slice(0, 4);

    return (
        <div className="min-h-screen">
            <Hero />
            <div className="max-w-7xl mx-auto px-6 md:px-8">

                <FadeUp delay={0.2}>
                    <ProductGrid title="Featured Collection" products={featuredProducts} />
                </FadeUp>

                <FadeUp delay={0.2}>
                    <section className="py-16 my-8 relative overflow-hidden rounded-3xl group">
                        <div className="absolute inset-0 bg-blue-900/20 backdrop-blur-3xl transition-all duration-700 group-hover:bg-blue-900/30"></div>
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity"></div>

                        <div className="relative z-10 text-center py-12 px-6">
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">
                                New Season <span className="text-blue-500">24/25</span>
                            </h2>
                            <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
                                Pre-order the latest kits from your favorite clubs. Authentic quality, delivered worldwide.
                            </p>
                            <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-blue-500 hover:text-white transition-all transform hover:scale-105 shadow-lg">
                                Shop Now
                            </button>
                        </div>
                    </section>
                </FadeUp>

                <FadeUp delay={0.2}>
                    <ProductGrid title="Best Sellers" products={products.slice(2, 6)} />
                </FadeUp>
            </div>
        </div>
    );
};

export default Home;
