import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#050505] text-white">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=2831&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-luminosity"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent"></div>
            </div>

            <div className="container mx-auto px-6 z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <div className="order-2 lg:order-1 text-center lg:text-left pt-10 lg:pt-0">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6 animate-fade-in-up">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-sm font-semibold tracking-wide text-gray-300">New 24/25 Season Collection</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 tracking-tighter animate-fade-in-up slide-delay-1">
                        AYO <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">BELI !!</span>
                    </h1>

                    <p className="text-lg text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed animate-fade-in-up slide-delay-2">
                        Discover the official jerseys of the world's biggest clubs. Authentic quality, breathable fabric, and designs that make history.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up slide-delay-3">
                        <Link to="/category" className="group bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/30 flex items-center justify-center gap-2">
                            <ShoppingBag className="w-5 h-5" /> Shop Now
                        </Link>
                        <Link to="/category" className="group bg-white/5 text-white border border-white/10 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:bg-white/10 flex items-center justify-center gap-2 backdrop-blur-sm">
                            View Collections <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-gray-500">
                        <div className="flex items-center gap-2">
                            <div className="font-bold text-2xl text-white">100%</div>
                            <div className="text-xs leading-tight">Authentic<br />Products</div>
                        </div>
                        <div className="w-px h-8 bg-white/10"></div>
                        <div className="flex items-center gap-2">
                            <div className="font-bold text-2xl text-white">24h</div>
                            <div className="text-xs leading-tight">Fast<br />Shipping</div>
                        </div>
                    </div>
                </div>

                {/* Hero Image / Visual */}
                <div className="order-1 lg:order-2 relative animate-fade-in-up slide-delay-2">
                    <div className="relative z-10 transform hover:scale-105 transition-transform duration-700">
                        {/* Using a high quality jersey image with transparency or good crop would be ideal. 
                             For now, using a nice Unsplash image masked or composed. */}
                        <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-white/10 shadow-2xl relative">
                            <img
                                src="https://garapmedia.com/wp-content/uploads/2024/12/Logo-Manchester-United.jpeg"
                                alt="Featured Jersey"
                                className="w-full h-full object-cover mix-blend-overlay opacity-80"
                            />
                            {/* Overlaying a mock 'floating' jersey effect if we had a transparent png */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h2 className="text-9xl font-black text-white/5 rotate-90 absolute scale-150 select-none">JERSEY</h2>
                            </div>

                            <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="text-3xl font-bold text-blue-300 uppercase">TIM KALAHAN</div>
                                        <div className="text-white font-bold">Manchester United 24/25</div>
                                    </div>
                                    <span className="bg-white text-black text-xs font-bold px-3 py-1 rounded-full">Best Seller</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-500 rounded-full blur-[50px] opacity-40 animate-pulse"></div>
                    <div className="absolute top-1/2 -left-12 w-32 h-32 bg-purple-500 rounded-full blur-[60px] opacity-30"></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
