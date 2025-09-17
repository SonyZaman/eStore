'use client';

import { useRouter } from 'next/navigation';

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

interface ProductListProps {
  products: Product[];
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: number) => void;
  onAddProduct: () => void;
}

const ProductList = ({ products, onEditProduct, onDeleteProduct, onAddProduct }: ProductListProps) => {
  const router = useRouter();

  if (products.length === 0) {
    return (
      <div className="px-6 py-12 text-center">
        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
          <path d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 极 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A10.003 10.003 0 0124 26c4.21 0 7.813 2.602 9.288 6.286M30 14a6 6 0 11-12 0 6 6 0 0112 0zm12 6a4 4 0 11-8 0 4 4 0 018 0zm-28 0a4 4 0 11-8 0 4 4 0 018 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No products yet</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by creating your first product.</p>
        <div className="mt-6">
          <button
            type="button"
            onClick={onAddProduct}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#b16316] hover:bg-[#9d5414] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b16316]"
          >
            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2极-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Create Product
          </button>
        </div>
      </div>
    );
  }

  return (
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
                onClick={() => onEditProduct(product)}
                className="flex-1 bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-2 rounded text-sm font-medium transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => onDeleteProduct(product.id)}
                className="flex-1 bg-red-50 text-red-700 hover:bg-red-100 px-3 py-2 rounded text-sm font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;