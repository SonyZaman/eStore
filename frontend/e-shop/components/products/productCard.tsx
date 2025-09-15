// components/productCard.tsx
"use client";

interface ProductCardProps {
  id: number;
  title: string;
  description: string;
  price: number;
  productType: string;
  vendor: { name: string };
  category: { name: string };
  imageUrl?: string;
}

export default function ProductCard({
  id,
  title,
  description,
  price,
  productType,
  vendor,
  category,
  imageUrl,
}: ProductCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
      <img
        src={imageUrl || "/images/picture.jpg"}  // Fallback image if no image URL is provided
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-500 text-sm mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <p className="font-bold text-xl text-blue-600">${price}</p>
          <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded-full hover:bg-blue-600 transition">
            Add to Cart
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2">{productType}</p>
        {/* <p className="text-xs text-gray-400">{vendor.name}</p>
        <p className="text-xs text-gray-400">{category.name}</p> */}
      </div>
    </div>
  );
}
