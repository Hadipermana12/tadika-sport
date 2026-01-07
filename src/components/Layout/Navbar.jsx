import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useStore from '../../store/useStore';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const cart = useStore((state) => state.cart);

    const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { path: "/home", label: "Home" },
        { path: "/category", label: "Shop" },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className={`fixed w-full top-0 z-[1000] font-sans transition-all duration-300 border-b ${scrolled
                ? 'h-16 bg-black/80 backdrop-blur-2xl border-white/10'
                : 'h-20 bg-black/40 backdrop-blur-md border-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-6 md:px-8 h-full flex justify-between items-center">
                <div className="flex items-center gap-8">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>

                    <Link to="/home" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white group-hover:bg-blue-500 transition-colors">JS</div>
                        <span className="text-xl md:text-2xl font-black text-white tracking-tighter cursor-pointer group-hover:text-blue-400 transition-colors">
                            Jersey<span className="text-blue-500">Store</span>
                        </span>
                    </Link>

                    <ul className="hidden md:flex gap-3">
                        {navLinks.map(link => (
                            <li key={link.label}>
                                <Link
                                    to={link.path}
                                    className={`px-5 py-2 rounded-full text-[13px] font-bold transition-all border ${isActive(link.path)
                                            ? 'bg-blue-600 text-white border-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.3)]'
                                            : 'bg-white/5 text-gray-400 border-white/5 hover:border-blue-600/50 hover:bg-blue-600/10 hover:text-blue-600'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex items-center gap-3 md:gap-6">
                    <div className="hidden lg:flex items-center bg-white/5 px-4 py-2.5 rounded-full hover:bg-white/10 transition-all w-48 focus-within:w-64 focus-within:bg-white/10 border border-white/5">
                        <Search className="w-4 h-4 text-gray-400" />
                        <input type="text" placeholder="Search jerseys..." className="bg-transparent border-none text-white outline-none text-sm w-full placeholder-gray-500 ml-3" />
                    </div>

                    <Link to="/cart" className="relative p-2 text-white hover:text-blue-400 transition-colors">
                        <ShoppingCart className="w-6 h-6" />
                        {cartItemCount > 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {cartItemCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="absolute top-16 left-0 w-full bg-[#050505] border-b border-white/5 md:hidden p-6 shadow-xl">
                    <ul className="flex flex-col gap-6">
                        {navLinks.map(link => (
                            <li key={link.label}>
                                <Link
                                    onClick={() => setIsMenuOpen(false)}
                                    to={link.path}
                                    className={`text-lg font-bold transition-colors ${isActive(link.path) ? 'text-blue-500' : 'text-white hover:text-blue-400'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link onClick={() => setIsMenuOpen(false)} to="/cart" className="text-white hover:text-blue-400 font-bold text-lg">
                                Cart ({cartItemCount})
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
