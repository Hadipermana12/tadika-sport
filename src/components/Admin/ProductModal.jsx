
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const ProductModal = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: 'Premier League',
        price: '',
        stock_home: 0,
        stock_away: 0,
        homeImage: null,
        awayImage: null,
        existingImage: '',
        existingAwayImage: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                category: initialData.category || 'Premier League',
                price: initialData.price || '',
                stock_home: initialData.variants?.home?.stock !== undefined ? initialData.variants.home.stock : (initialData.stock !== undefined ? initialData.stock : 0),
                stock_away: initialData.variants?.away?.stock !== undefined ? initialData.variants.away.stock : 0,
                homeImage: null,
                awayImage: null,
                existingImage: (initialData.variants?.home?.image) || initialData.image || '',
                existingAwayImage: (initialData.variants?.away?.image) || ''
            });
        } else {
            setFormData({
                name: '',
                category: 'Premier League',
                price: '',
                stock_home: 0,
                stock_away: 0,
                homeImage: null,
                awayImage: null,
                existingImage: '',
                existingAwayImage: ''
            });
        }
    }, [initialData, isOpen]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'number' ? (value === '' ? '' : Number(value)) : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-gray-900 border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
                <div className="flex justify-between items-center p-6 border-b border-white/10">
                    <h2 className="text-xl font-bold text-white">{initialData ? 'Edit Product' : 'Add Product'}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">Product Name</label>
                        <input
                            required
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                            placeholder="e.g. Manchester United 24/25"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">Category</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                        >
                            <option value="Premier League" className="bg-gray-900 text-white">Premier League</option>
                            <option value="La Liga" className="bg-gray-900 text-white">La Liga</option>
                            <option value="Serie A" className="bg-gray-900 text-white">Serie A</option>
                            <option value="Bundesliga" className="bg-gray-900 text-white">Bundesliga</option>
                            <option value="National Team" className="bg-gray-900 text-white">National Team</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">Price (Rp)</label>
                        <input
                            required
                            type="number"
                            value={formData.price}
                            onChange={(e) => setFormData({...formData, price: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                            placeholder="e.g. 1200000"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">
                                Stock (Home)
                            </label>
                            <input
                                required
                                name="stock_home"
                                value={formData.stock_home}
                                onChange={handleChange}
                                type="number"
                                min="0"
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">
                                Stock (Away)
                            </label>
                            <input
                                required
                                name="stock_away"
                                value={formData.stock_away}
                                onChange={handleChange}
                                type="number"
                                min="0"
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">Home Jersey Image {initialData && "(Leave empty to keep current)"}</label>
                        <input
                            required={!initialData}
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFormData({...formData, homeImage: e.target.files[0]})}
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500 file:cursor-pointer"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">Away Jersey Image (Optional)</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFormData({...formData, awayImage: e.target.files[0]})}
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500 file:cursor-pointer"
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-blue-600/20"
                        >
                            {initialData ? 'Update Product' : 'Create Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductModal;
