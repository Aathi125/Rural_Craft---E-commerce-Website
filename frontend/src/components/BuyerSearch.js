import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const BuyerSearch = () => {
    const [buyers, setBuyers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchBuyers = async (name = '') => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/buyers${name ? `?name=${name}` : ''}`);
            if (data.success) {
                setBuyers(data.buyers);
            } else {
                toast.error('Failed to fetch buyers');
            }
        } catch (error) {
            console.error('Error fetching buyers:', error);
            toast.error(error.response?.data?.message || 'Error fetching buyers');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBuyers();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            fetchBuyers(searchTerm);
        } else {
            fetchBuyers();
        }
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        fetchBuyers();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-brown-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-800 to-brown-800 mb-4">
                        Discover Buyers
                    </h1>
                    <p className="text-brown-600 text-lg">Find and connect with your buyers</p>
                </div>

                <form onSubmit={handleSearch} className="mb-12">
                    <div className="flex gap-3 max-w-2xl mx-auto">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by buyer name..."
                                className="w-full p-4 pl-12 pr-4 rounded-xl border-2 border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300 bg-white shadow-sm"
                            />
                            <svg
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-400"
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
                            className="px-6 py-4 bg-gradient-to-r from-amber-700 to-brown-700 text-white rounded-xl hover:from-amber-800 hover:to-brown-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {buyers.map((buyer) => (
                            <div
                                key={buyer._id}
                                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-amber-100"
                            >
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-600 to-brown-600 flex items-center justify-center text-white font-bold text-xl">
                                        {buyer.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-brown-800">{buyer.name}</h2>
                                        <p className="text-amber-700">{buyer.email}</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    {buyer.shippingAddress && (
                                        <div className="flex items-center text-brown-600">
                                            <svg className="w-5 h-5 mr-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span>Shipping: {buyer.shippingAddress}</span>
                                        </div>
                                    )}
                                    {buyer.billingAddress && (
                                        <div className="flex items-center text-brown-600">
                                            <svg className="w-5 h-5 mr-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                            </svg>
                                            <span>Billing: {buyer.billingAddress}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {buyers.length === 0 && (
                            <div className="col-span-2 text-center py-12">
                                <div className="inline-block p-4 rounded-full bg-amber-100 mb-4">
                                    <svg className="w-12 h-12 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-brown-800 mb-2">No buyers found</h3>
                                <p className="text-brown-600">Try adjusting your search or clear the search term to see all buyers</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BuyerSearch; 