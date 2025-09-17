'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// Import the notification component from the correct path
import NotificationCenter from '../notification/page';
import SimpleBarChart from './components/barchart/page';
import SimplePieChart from './components/piechart/page';
import StoreProfile from './components/vendorProfile/page';
import ProductList from './components/productList/page';
import ProductForm from './components/productForm/page';


interface Vendor {
  id: number;
  name: string;
  email: string;
  storeName: string;
  storeDescription: string;
  contactNumber: string;
  address: string;
}

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

interface CategoryData {
  category: string;
  count: number;
  value: number;
  percentage: number;
}


const VendorDashboard = () => {
  const router = useRouter();
  
  // State management
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [productLoading, setProductLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [currentEmail, setCurrentEmail] = useState<string>('');
  const [isClientMounted, setIsClientMounted] = useState(false);

  // Product form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [productType, setProductType] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Edit mode
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showProductForm, setShowProductForm] = useState(false);

  // Process category data for charts
  const categoryData = useMemo(() => {
    const categoryCount = products.reduce((acc, product) => {
      const category = product.productType || 'Uncategorized';
      if (!acc[category]) {
        acc[category] = { count: 0, totalValue: 0 };
      }
      acc[category].count += 1;
      acc[category].totalValue += product.price;
      return acc;
    }, {} as Record<string, { count: number; totalValue: number }>);

    const totalProducts = products.length;
    
    return Object.entries(categoryCount).map(([category, data]) => ({
      category,
      count: data.count,
      value: Number(data.totalValue),
      percentage: totalProducts > 0 ? (data.count / totalProducts) * 100 : 0
    })).sort((a, b) => b.count - a.count);
  }, [products]);

  // Safe localStorage access
  const getLocalStorageItem = (key: string): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  };

  const setLocalStorageItem = (key: string, value: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  };

  const removeLocalStorageItem = (key: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  };

  // Handle client-side mounting
  useEffect(() => {
    setIsClientMounted(true);
    
    const email = getLocalStorageItem('vendor_email');
    if (email) {
      setCurrentEmail(email);
    }
  }, []);

  useEffect(() => {
    if (!isClientMounted) return;

    const token = getLocalStorageItem('access_token');
    const email = getLocalStorageItem('vendor_email');
    
    if (!token || !email) {
      router.push('/login');
      return;
    }
    
    fetchVendorProfile(token, email);
  }, [router, isClientMounted]);

  const fetchVendorProfile = async (token: string, email: string) => {
    try {
      setError('');
      setLoading(true);
      
      const response = await axios.get(`http://localhost:3000/vendors/email/${email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setVendor(response.data);
      await fetchVendorProducts(response.data.id, token);
    } catch (err) {
      console.error('Error fetching vendor profile:', err);
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        removeLocalStorageItem('access_token');
        removeLocalStorageItem('vendor_email');
        router.push('/login');
      } else {
        setError('Error fetching vendor profile. Please try again.');
      }
    }
  };

  const fetchVendorProducts = async (vendorId: number, token?: string) => {
    try {
      const authToken = token || getLocalStorageItem('access_token');
      const response = await axios.get(`http://localhost:3000/products/vendor/${vendorId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setProducts(response.data);
    } catch (err) {
      console.error('Error fetching vendor products:', err);
      setError('Error fetching vendor products');
    } finally {
      setLoading(false);
    }
  };

  const clearMessages = () => {
    setError('');
    setSuccessMessage('');
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPrice(0);
    setProductType('');
    setImageUrl('');
    setEditingProduct(null);
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();

    if (!title.trim() || !description.trim() || !price || !productType.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    if (price <= 0) {
      setError('Price must be greater than 0');
      return;
    }

    if (!vendor?.id) {
      setError('Vendor information not available. Please refresh the page.');
      return;
    }

    try {
      setProductLoading(true);
      const token = getLocalStorageItem('access_token');

      const productData = {
        title: title.trim(),
        description: description.trim(),
        price: Number(price),
        productType: productType.trim(),
        vendorId: vendor.id,
        ...(imageUrl.trim() && { imageUrl: imageUrl.trim() })
      };

      if (editingProduct) {
        const response = await axios.put(
          `http://localhost:3000/products/${editingProduct.id}`,
          productData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setProducts(prevProducts => 
          prevProducts.map(p => p.id === editingProduct.id ? response.data : p)
        );
        setSuccessMessage('Product updated successfully!');
      } else {
        const response = await axios.post(
          'http://localhost:3000/products',
          productData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setProducts(prevProducts => [response.data, ...prevProducts]);
        setSuccessMessage('Product created successfully!');
      }
      
      resetForm();
      setShowProductForm(false);
      setTimeout(() => setSuccessMessage(''), 3000);

    } catch (err) {
      console.error('Error saving product:', err);
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.message || 'Error saving product';
        setError(errorMessage);
      } else {
        setError('Error saving product. Please try again.');
      }
    } finally {
      setProductLoading(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setTitle(product.title);
    setDescription(product.description);
    setPrice(product.price);
    setProductType(product.productType);
    setImageUrl(product.imageUrl || '');
    setShowProductForm(true);
    clearMessages();
  };

  const handleDeleteProduct = async (productId: number) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const token = getLocalStorageItem('access_token');
      await axios.delete(`http://localhost:3000/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
      setSuccessMessage('Product deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
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

  if (!isClientMounted) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#b16316] mx-auto"></div>
          <p className="mt-4 text-gray-600">Initializing...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#b16316] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
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
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Vendor Dashboard</h1>
              <p className="text-gray-600">Welcome back, {vendor?.name || currentEmail}</p>
            </div>
            <div className="flex items-center gap-3">
              <NotificationCenter />
              
              <button
                onClick={() => {
                  resetForm();
                  setShowProductForm(!showProductForm);
                }}
                className="bg-[#b16316] hover:bg-[#9d5414] text-white px-4 py-2 rounded-md transition-colors"
              >
                {showProductForm ? 'Cancel' : 'Add Product'}
              </button>
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

      <div className="max-w-7xl mx-auto py-6 px-4">
        {/* Alert Messages */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4 mb-6">
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
          <div className="bg-green-50 border-l-4 border-green-400 text-green-700 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="CurrentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm">{successMessage}</p>
              </div>
            </div>
          </div>
        )}

        {vendor && (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-[#b16316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Products</dt>
                        <dd className="text-lg font-medium text-gray-900">{products.length}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-[#b16316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Categories</dt>
                        <dd className="text-lg font-medium text-gray-900">
                          {categoryData.length}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            {products.length > 0 && categoryData.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Simple Bar Chart - Category vs Product Count */}
                <SimpleBarChart
                  data={categoryData}
                  title="Products by Category"
                  subtitle="Number of products in each category"
                  dataKey="count"
                  color="#b16316"
                />

                {/* Simple Pie Chart - Category Distribution */}
                <SimplePieChart
                  data={categoryData}
                  title="Category Distribution"
                  subtitle="Percentage breakdown by category"
                />
              </div>
            )}

            {/* Vendor Profile */}
            <StoreProfile vendor={vendor} currentEmail={currentEmail} />
            
           

            {/* Product Form */}
            {showProductForm && (
  <ProductForm
    editingProduct={editingProduct}
    productLoading={productLoading}
    title={title}
    description={description}
    price={price}
    productType={productType}
    imageUrl={imageUrl}
    onTitleChange={setTitle}
    onDescriptionChange={setDescription}
    onPriceChange={setPrice}
    onProductTypeChange={setProductType}
    onImageUrlChange={setImageUrl}
    onSubmit={handleProductSubmit}
    onCancel={() => {
      resetForm();
      setShowProductForm(false);
    }}
  />
)}


            

            {/* Products List */}
            <ProductList 
    products={products} 
    onEditProduct={handleEditProduct}
    onDeleteProduct={handleDeleteProduct}
    onAddProduct={() => {
      resetForm();
      setShowProductForm(true);
    }}
  />
           
          </>
        )}
      </div>
    </div>
  );
};

export default VendorDashboard;





// // Simple Bar Chart Component
// const SimpleBarChart = ({ data, title, subtitle, dataKey, color = '#b16316', formatter }: {
//   data: CategoryData[];
//   title: string;
//   subtitle: string;
//   dataKey: 'count' | 'value';
//   color?: string;
//   formatter?: (value: number) => string;
// }) => {
//   const maxValue = Math.max(...data.map(item => item[dataKey]));
  
//   return (
//     <div className="bg-white shadow rounded-lg p-6">
//       <div className="mb-4">
//         <h3 className="text-lg font-medium text-gray-900">{title}</h3>
//         <p className="text-sm text-gray-500">{subtitle}</p>
//       </div>
//       <div className="space-y-4">
//         {data.map((item, index) => (
//           <div key={index} className="flex items-center">
//             <div className="w-24 text-sm text-gray-700 truncate mr-3">
//               {item.category}
//             </div>
//             <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
//               <div
//                 className="h-6 rounded-full flex items-center justify-end pr-2 text-white text-xs font-medium"
//                 style={{
//                   width: `${(item[dataKey] / maxValue) * 100}%`,
//                   backgroundColor: color,
//                   minWidth: '30px'
//                 }}
//               >
//                 {formatter ? formatter(item[dataKey]) : item[dataKey]}
//               </div>
//             </div>
//             <div className="w-16 text-sm text-gray-600 text-right ml-3">
//               {formatter ? formatter(item[dataKey]) : item[dataKey]}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // Simple Pie Chart Component
// const SimplePieChart = ({ data, title, subtitle }: {
//   data: CategoryData[];
//   title: string;
//   subtitle: string;
// }) => {
//   const colors = ['#b16316', '#d4871f', '#f39c12', '#e67e22', '#ff6b35', '#ff8c42', '#ffa726', '#ffb74d'];
  
//   return (
//     <div className="bg-white shadow rounded-lg p-6">
//       <div className="mb-4">
//         <h3 className="text-lg font-medium text-gray-900">{title}</h3>
//         <p className="text-sm text-gray-500">{subtitle}</p>
//       </div>
      
//       {/* Legend */}
//       <div className="grid grid-cols-1 gap-3">
//         {data.map((item, index) => (
//           <div key={index} className="flex items-center justify-between">
//             <div className="flex items-center">
//               <div 
//                 className="w-4 h-4 rounded mr-3"
//                 style={{ backgroundColor: colors[index % colors.length] }}
//               ></div>
//               <span className="text-sm text-gray-700">{item.category}</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <span className="text-sm font-medium text-gray-900">{item.count}</span>
//               <span className="text-xs text-gray-500">({item.percentage.toFixed(1)}%)</span>
//             </div>
//           </div>
//         ))}
//       </div>
      
//       {/* Simple circular progress indicators */}
//       <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
//         {data.slice(0, 6).map((item, index) => (
//           <div key={index} className="text-center">
//             <div className="relative w-16 h-16 mx-auto mb-2">
//               <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
//                 <path
//                   d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
//                   fill="none"
//                   stroke="#e5e7eb"
//                   strokeWidth="2"
//                 />
//                 <path
//                   d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
//                   fill="none"
//                   stroke={colors[index % colors.length]}
//                   strokeWidth="2"
//                   strokeDasharray={`${item.percentage}, 100`}
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <span className="text-xs font-medium text-gray-900">{item.count}</span>
//               </div>
//             </div>
//             <p className="text-xs text-gray-600 truncate">{item.category}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

//###########product list################

 {/* <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Your Products</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Manage your product inventory
                </p>
              </div>
              
              {products.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A10.003 10.003 0 0124 26c4.21 0 7.813 2.602 9.288 6.286M30 14a6 极 0 11-12 0 6 6 0 0112 0zm12 6a4 4 0 11-8 0 4 4 极 018 0zm-28 0a4 4 0 11-8 0 4 4 0 018 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No products yet</h3>
                  <p className="mt-1 text极 text-gray-500">Get started by creating your first product.</p>
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        resetForm();
                        setShowProductForm(true);
                      }}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#b16316] hover:bg-[#9d5414] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b16316]"
                    >
                      <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1极5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                      Create Product
                    </button>
                  </div>
                </div>
              ) : (
                <div className="px-6 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                      <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        {product.imageUrl && (
                          <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="w-full h-48 object-cover rounded-md mb-3"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        )}
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{product.title}</h4>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-3">{product.description}</p>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-xl font-bold text-green-600">${product.price}</span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            {product.productType}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => router.push(`/vendor/dashboard/${product.id}`)}
                            className="flex-1 bg-green-50 text-green-700 hover:bg-green-100 px-3 py-2 rounded text-sm font-medium transition-colors"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="flex-1 bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-2 rounded text-sm font-medium transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="flex-1 bg-red-50 text-red-700 hover:bg-red-100 px-3 py-2 rounded text-sm font-medium transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))} 
                  </div>
                </div>
              )}
            </div>*/}




//#########vendor profile###########



 {/* <div className="bg-white shadow rounded-lg mb-6">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Store Profile</h3>
              </div>
              <div className="px-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Owner Name:</span>
                      <p className="mt-1 text-sm text-gray-900">{vendor.name}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Email:</span>
                      <p className="mt-1 text-sm text-gray-900">{vendor.email}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Contact:</span>
                      <p className="mt-1 text-sm text-gray-900">{vendor.contactNumber}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Store Name:</span>
                      <p className="mt-1 text-sm text-gray-900">{vendor.storeName}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Description:</span>
                      <p className="mt-1 text-sm text-gray-900">{vendor.storeDescription || 'No description provided'}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Address:</span>
                      <p className="mt-1 text-sm text-gray-900">{vendor.address || 'No address provided'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}




//###############product form##############

{/* {showProductForm && (
              <div className="bg-white shadow rounded-lg mb-6">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {editingProduct ? 'Edit Product' : 'Create New Product'}
                  </h3>
                </div>
                <div className="px-6 py-4">
                  <form onSubmit={handleProductSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                          Product Title *
                        </label>
                        <input
                          type="text"
                          id="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          disabled={productLoading}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#b16316] focus:border-[#b16316] sm:text-sm px-3 py-2 border"
                          placeholder="Enter product title"
                        />
                      </div>

                      <div>
                        <label htmlFor="productType" className="block text-sm font-medium text-gray-700">
                          Product Type *
                        </label>
                        <input
                          type="text"
                          id="productType"
                          value={productType}
                          onChange={(e) => setProductType(e.target.value)}
                          disabled={productLoading}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#b16316] focus:border-[#b16316] sm:text-sm px-3 py-2 border"
                          placeholder="e.g., Electronics, Clothing, Books"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description *
                      </label>
                      <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled={productLoading}
                        rows={4}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#b16316] focus:border-[#b16316] sm:text-sm px-3 py-2 border"
                        placeholder="Describe your product in detail"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                          Price ($) *
                        </label>
                        <input
                          type="number"
                          id="price"
                          value={price || ''}
                          onChange={(e) => setPrice(Number(e.target.value))}
                          min="0"
                          step="0.01"
                          disabled={productLoading}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#b16316] focus:border-[#b16316] sm:text-sm px-3 py-2 border"
                          placeholder="0.00"
                        />
                      </div>

                      <div>
                        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                          Image URL (Optional)
                        </label>
                        <input
                          type="text"
                          id="imageUrl"
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                          disabled={productLoading}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#b16316] focus:border-[#b16316] sm:text-sm px-3 py-2 border"
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          resetForm();
                          setShowProductForm(false);
                        }}
                        disabled={productLoading}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b16316] disabled:opacity-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={productLoading}
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#b16316] hover:bg-[#9d5414] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b16316] disabled:opacity-50 flex items-center"
                      >
                        {productLoading && (
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        )}
                        {productLoading 
                          ? (editingProduct ? 'Updating...' : 'Creating...') 
                          : (editingProduct ? 'Update Product' : 'Create Product')
                        }
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )} */}



