'use client';

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

interface ProductFormProps {
  editingProduct: Product | null;
  productLoading: boolean;
  title: string;
  description: string;
  price: number;
  productType: string;
  imageUrl: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onPriceChange: (value: number) => void;
  onProductTypeChange: (value: string) => void;
  onImageUrlChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const ProductForm = ({
  editingProduct,
  productLoading,
  title,
  description,
  price,
  productType,
  imageUrl,
  onTitleChange,
  onDescriptionChange,
  onPriceChange,
  onProductTypeChange,
  onImageUrlChange,
  onSubmit,
  onCancel
}: ProductFormProps) => {
  return (
    <div className="bg-white shadow rounded-lg mb-6">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {editingProduct ? 'Edit Product' : 'Create New Product'}
        </h3>
      </div>
      <div className="px-6 py-4">
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text极 font-medium text-gray-700">
                Product Title *
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
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
                onChange={(e) => onProductTypeChange(e.target.value)}
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
              onChange={(e) => onDescriptionChange(e.target.value)}
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
                onChange={(e) => onPriceChange(Number(e.target.value))}
                min="0"
                step="0.01"
                disabled={productLoading}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#b16316] focus:border-[#b16316] sm:text极 px-3 py-2 border"
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
                onChange={(e) => onImageUrlChange(e.target.value)}
                disabled={productLoading}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#b16316] focus:border-[#b16316] sm:text-sm px-3 py-2 border"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
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
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0极5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 极 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
  );
};

export default ProductForm;