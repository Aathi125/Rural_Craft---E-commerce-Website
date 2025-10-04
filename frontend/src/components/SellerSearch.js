import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SellerSearch = () => {
    const [sellers, setSellers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchSellers = async (name = '') => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/sellers${name ? `?name=${name}` : ''}`);
            if (data.success) {
                setSellers(data.sellers);
            } else {
                toast.error('Failed to fetch sellers');
            }
        } catch (error) {
            console.error('Error fetching sellers:', error);
            toast.error(error.response?.data?.message || 'Error fetching sellers');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSellers();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            fetchSellers(searchTerm);
        } else {
            fetchSellers();
        }
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        fetchSellers();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-brown-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-800 to-brown-800 mb-4">
                        Discover Sellers
                    </h1>
                    <p className="text-brown-600 text-lg">Find and connect with your favorite sellers</p>
                </div>

                <form onSubmit={handleSearch} className="mb-12">
                    <div className="flex gap-3 max-w-2xl mx-auto">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by seller name..."
                                className="w-full p-4 pl-12 pr-4 rounded-xl border-2 border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-sm"
                            />
                            <svg
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-600"
                                width="20"
                                height="20"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <button
                            type="submit"
                            className="px-6 py-4 bg-gradient-to-r from-amber-600 to-brown-600 text-white rounded-xl hover:from-amber-700 hover:to-brown-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            Search
                        </button>
                        {searchTerm && (
                            <button
                                type="button"
                                onClick={handleClearSearch}
                                className="px-6 py-4 bg-amber-100 text-amber-800 rounded-xl hover:bg-amber-200 transition-all duration-300"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </form>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {sellers.map((seller) => (
                            <div
                                key={seller._id}
                                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-amber-100 group"
                            >
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="relative">
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-600 to-brown-600 rounded-full opacity-50 group-hover:opacity-100 blur group-hover:blur-md transition-all duration-300"></div>
                                        <div className="relative w-12 h-12 rounded-full bg-gradient-to-r from-amber-600 to-brown-600 flex items-center justify-center text-white font-bold text-xl">
                                            {seller.name.charAt(0)}
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-brown-800">{seller.name}</h2>
                                        <p className="text-amber-700">{seller.email}</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    {seller.businessName && (
                                        <div className="flex items-center text-brown-600">
                                            <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            <span>{seller.businessName}</span>
                                        </div>
                                    )}
                                    {seller.storeLocation && (
                                        <div className="flex items-center text-brown-600">
                                            <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span>{seller.storeLocation}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {sellers.length === 0 && (
                            <div className="col-span-2 text-center py-12">
                                <div className="inline-block p-4 rounded-full bg-amber-100 mb-4">
                                    <svg className="w-12 h-12 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-brown-800 mb-2">No sellers found</h3>
                                <p className="text-brown-600">Try adjusting your search or clear the search term to see all sellers</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SellerSearch; 