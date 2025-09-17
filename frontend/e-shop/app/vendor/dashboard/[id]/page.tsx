// File: app/vendor/dashboard/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import NotificationCenter from '../../notification/page';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  productType: string;
  imageUrl?: string;
  vendorId: number;
  createdAt?: string;
  updatedAt?: string;
}

interface Vendor {
  id: number;
  name: string;
  email: string;
  storeName: string;
  storeDescription: string;
  contactNumber: string;
  address: string;
}

const ProductDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editLoading, setEditLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [isClientMounted, setIsClientMounted] = useState(false);

  // Edit form states
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editProductType, setEditProductType] = useState('');
  const [editImageUrl, setEditImageUrl] = useState('');

  // Safe localStorage access
  const getLocalStorageItem = (key: string): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  };

  const removeLocalStorageItem = (key: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  };

  useEffect(() => {
    setIsClientMounted(true);
  }, []);

  useEffect(() => {
    if (!isClientMounted) return;

    const checkAuth = () => {
      const token = getLocalStorageItem('access_token');
      const email = getLocalStorageItem('vendor_email');
      
      if (!token || !email) {
        router.push('/login');
        return null;
      }
      
      return { token, email };
    };

    const auth = checkAuth();
    if (auth && productId) {
      fetchProductDetails(auth.token);
      fetchVendorProfile(auth.token, auth.email);
    }
  }, [productId, router, isClientMounted]);

  const fetchProductDetails = async (token: string) => {
    try {
      setError('');
      setLoading(true);

      const response = await axios.get(`http://localhost:3000/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProduct(response.data);
      
      // Initialize edit form with current values
      setEditTitle(response.data.title);
      setEditDescription(response.data.description);
      setEditPrice(response.data.price);
      setEditProductType(response.data.productType);
      setEditImageUrl(response.data.imageUrl || '');

    } catch (err) {
      console.error('Error fetching product:', err);
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          removeLocalStorageItem('access_token');
          removeLocalStorageItem('vendor_email');
          router.push('/login');
        } else if (err.response?.status === 404) {
          setError('Product not found');
        } else {
          setError('Error loading product details');
        }
      } else {
        setError('Error loading product details');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchVendorProfile = async (token: string, email: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/vendors/email/${email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVendor(response.data);
    } catch (err) {
      console.error('Error fetching vendor profile:', err);
    }
  };

  const handleSaveChanges = async () => {
    if (!editTitle.trim() || !editDescription.trim() || !editPrice || !editProductType.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    if (editPrice <= 0) {
      setError('Price must be greater than 0');
      return;
    }

    try {
      setEditLoading(true);
      setError('');
      const token = getLocalStorageItem('access_token');

      const updatedProduct = {
        title: editTitle.trim(),
        description: editDescription.trim(),
        price: Number(editPrice),
        productType: editProductType.trim(),
        ...(editImageUrl.trim() && { imageUrl: editImageUrl.trim() })
      };

      const response = await axios.put(
        `http://localhost:3000/products/${productId}`,
        updatedProduct,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setProduct(response.data);
      setIsEditing(false);
      setSuccessMessage('Product updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);

    } catch (err) {
      console.error('Error updating product:', err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Error updating product');
      } else {
        setError('Error updating product. Please try again.');
      }
    } finally {
      setEditLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      return;
    }

    try {
      const token = getLocalStorageItem('access_token');
      await axios.delete(`http://localhost:3000/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      router.push('/vendor/dashboard');
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Error deleting product. Please try again.');
    }
  };

  const handleLogout = () => {
    removeLocalStorageItem('access_token');
    removeLocalStorageItem('vendor_email');
    router.push('/login');
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = () => {
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
        Active
      </span>
    );
  };

  if (!isClientMounted || loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#b16316] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product profile...</p>
        </div>
      </div>
    );
  }

  if (error && !product) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
          <div className="text-red-600 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2 text-gray-900">{error}</h2>
          <button
            onClick={() => router.push('/vendor/dashboard')}
            className="mt-4 bg-[#b16316] text-white px-6 py-2 rounded hover:bg-[#9d5414]"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/vendor/dashboard')}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Back to Dashboard
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Product Profile</h1>
                <p className="text-sm text-gray-600">{vendor?.storeName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <NotificationCenter />
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Alert Messages */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4 mb-6 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="bg-green-50 border-l-4 border-green-400 text-green-700 p-4 mb-6 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm">{successMessage}</p>
              </div>
            </div>
          </div>
        )}

        {product && (
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
            {!isEditing ? (
              <>
                {/* Hero Section with Image and Basic Info */}
                <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 h-64">
                  {product.imageUrl ? (
                    <div className="absolute inset-0">
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="w-full h-full object-cover opacity-80"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-24 h-24 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  
                  {/* Floating Action Buttons */}
                  <div className="absolute top-6 right-6 flex gap-3">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-white/90 hover:bg-white text-gray-700 p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={handleDeleteProduct}
                      className="bg-red-500/90 hover:bg-red-600 text-white p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Product Profile Content */}
                <div className="p-8">
                  {/* Header Section */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <h1 className="text-4xl font-bold text-gray-900">{product.title}</h1>
                        {getStatusBadge()}
                      </div>
                      
                      <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                          <span className="font-medium">{product.productType}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>ID: {product.id}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="lg:text-right">
                      <div className="text-5xl font-bold text-green-600 mb-2">
                        ${product.price}
                      </div>
                      <p className="text-gray-500">Current Price</p>
                    </div>
                  </div>

                  {/* Description Section */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Product Description
                    </h3>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-600 font-semibold">Created Date</p>
                          <p className="text-gray-700 font-medium">{formatDate(product.createdAt)}</p>
                        </div>
                        <div className="bg-blue-200 p-3 rounded-full">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a4 4 0 118 0v4m-4 10V9" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-600 font-semibold">Last Updated</p>
                          <p className="text-gray-700 font-medium">{formatDate(product.updatedAt)}</p>
                        </div>
                        <div className="bg-green-200 p-3 rounded-full">
                          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-600 font-semibold">Category</p>
                          <p className="text-gray-700 font-medium">{product.productType}</p>
                        </div>
                        <div className="bg-purple-200 p-3 rounded-full">
                          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Vendor Information */}
                  {vendor && (
                    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        Store Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-orange-600 font-medium">Store Name</p>
                          <p className="text-gray-700">{vendor.storeName}</p>
                        </div>
                        <div>
                          <p className="text-orange-600 font-medium">Owner</p>
                          <p className="text-gray-700">{vendor.name}</p>
                        </div>
                        <div>
                          <p className="text-orange-600 font-medium">Contact</p>
                          <p className="text-gray-700">{vendor.contactNumber}</p>
                        </div>
                        <div>
                          <p className="text-orange-600 font-medium">Email</p>
                          <p className="text-gray-700">{vendor.email}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Edit Form */}
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Edit Product</h2>
                  </div>
                  
                  <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); handleSaveChanges(); }}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <label htmlFor="editTitle" className="block text-sm font-semibold text-gray-700 mb-3">
                            Product Title *
                          </label>
                          <input
                            type="text"
                            id="editTitle"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            disabled={editLoading}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#b16316] focus:border-[#b16316] transition-colors"
                            placeholder="Enter product title"
                          />
                        </div>

                        <div>
                          <label htmlFor="editProductType" className="block text-sm font-semibold text-gray-700 mb-3">
                            Product Type *
                          </label>
                          <input
                            type="text"
                            id="editProductType"
                            value={editProductType}
                            onChange={(e) => setEditProductType(e.target.value)}
                            disabled={editLoading}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#b16316] focus:border-[#b16316] transition-colors"
                            placeholder="e.g., Electronics, Clothing"
                          />
                        </div>

                        <div>
                          <label htmlFor="editPrice" className="block text-sm font-semibold text-gray-700 mb-3">
                            Price ($) *
                          </label>
                          <input
                            type="number"
                            id="editPrice"
                            value={editPrice || ''}
                            onChange={(e) => setEditPrice(Number(e.target.value))}
                            min="0"
                            step="0.01"
                            disabled={editLoading}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#b16316] focus:border-[#b16316] transition-colors"
                            placeholder="0.00"
                          />
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <label htmlFor="editDescription" className="block text-sm font-semibold text-gray-700 mb-3">
                            Description *
                          </label>
                          <textarea
                            id="editDescription"
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            disabled={editLoading}
                            rows={6}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#b16316] focus:border-[#b16316] transition-colors resize-none"
                            placeholder="Describe your product in detail..."
                          />
                        </div>

                        <div>
                          <label htmlFor="editImageUrl" className="block text-sm font-semibold text-gray-700 mb-3">
                            Image URL (Optional)
                          </label>
                          <input
                            type="url"
                            id="editImageUrl"
                            value={editImageUrl}
                            onChange={(e) => setEditImageUrl(e.target.value)}
                            disabled={editLoading}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#b16316] focus:border-[#b16316] transition-colors"
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                      <button
                        type="submit"
                        disabled={editLoading}
                        className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-xl font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 transition-all duration-200 transform hover:scale-[1.02]"
                      >
                        {editLoading ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Saving Changes...</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Save Changes</span>
                          </>
                        )}
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          setError('');
                          // Reset form to original values
                          if (product) {
                            setEditTitle(product.title);
                            setEditDescription(product.description);
                            setEditPrice(product.price);
                            setEditProductType(product.productType);
                            setEditImageUrl(product.imageUrl || '');
                          }
                        }}
                        disabled={editLoading}
                        className="flex-1 sm:flex-none bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 transition-all duration-200"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span>Cancel</span>
                      </button>
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;