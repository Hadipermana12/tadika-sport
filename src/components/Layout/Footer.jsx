const Footer = () => {
    return (
        <footer className="bg-[#050505] text-[#94a3b8] py-16 px-6 font-sans border-t border-white/5 mt-auto">
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
                <div className="md:col-span-1">
                    <h2 className="text-2xl font-bold text-white mb-6 font-serif tracking-tight">JerseyStore</h2>
                    <p className="mb-6 leading-relaxed">
                        Premium football jerseys for true fans. Authentic quality, best prices.
                    </p>
                </div>

                <div>
                    <h3 className="font-bold text-white mb-4">Shop</h3>
                    <ul className="space-y-3">
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Premier League</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">La Liga</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Serie A</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Bundesliga</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-white mb-4">Support</h3>
                    <ul className="space-y-3">
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Shipping Info</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Returns</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Size Guide</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Contact Us</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-white mb-4">Legal</h3>
                    <ul className="space-y-3">
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                    </ul>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                <p>© 2026 JerseyStore. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
