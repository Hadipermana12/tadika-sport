import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import useStore from '../../store/useStore';
import { Package, Users, Settings, LogOut, LayoutGrid } from 'lucide-react';
import { useEffect } from 'react';

const AdminLayout = () => {
    const navigate = useNavigate();
    const { isAdmin, logout } = useStore();

    useEffect(() => {
        if (!isAdmin) {
            navigate('/login');
        }
    }, [isAdmin, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!isAdmin) return null;

    const location = useLocation();

    const getLinkClass = (path) => {
        return location.pathname.includes(path) 
            ? "flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-600/10 text-blue-500 font-bold border border-blue-600/20"
            : "flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors font-medium";
    };

    return (
        <div className="min-h-screen flex bg-[#050505] text-white font-sans">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 p-6 flex flex-col">
                <div className="text-2xl font-black text-white mb-10 tracking-tighter">
                    Jersey<span className="text-blue-500">Admin</span>
                </div>

                <nav className="flex-1 space-y-2">
                    <Link to="/home" className="flex items-center gap-3 px-4 py-3 rounded-lg text-green-500 hover:bg-green-500/10 transition-colors font-bold mb-4 border border-green-500/20">
                        <LayoutGrid className="w-5 h-5" /> Go to Store
                    </Link>
                    <Link to="/admin/dashboard" className={getLinkClass('/admin/dashboard')}>
                        <LayoutGrid className="w-5 h-5" /> Dashboard
                    </Link>
                    <Link to="/admin/products" className={getLinkClass('/admin/products')}>
                        <Package className="w-5 h-5" /> Products
                    </Link>
                    <Link to="/admin/orders" className={getLinkClass('/admin/orders')}>
                        <Users className="w-5 h-5" /> Orders
                    </Link>
                    <Link to="/admin/settings" className={getLinkClass('/admin/settings')}>
                        <Settings className="w-5 h-5" /> Settings
                    </Link>
                </nav>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors font-bold mt-auto"
                >
                    <LogOut className="w-5 h-5" /> Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
