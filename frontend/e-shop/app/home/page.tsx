
import axios from "axios";
import ProductGrid from "../../components/products/productGrid";
import Header from "../../components/header";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  productType: string;
  vendor: { id: number; name: string };
  category: { id: number; name: string };
  imageUrl?: string;
}


export default async function Home() {
  let products: Product[] = [];
  let error: string | undefined;

  try {
    const response = await axios.get<Product[]>(
      "http://localhost:3000/products"
    );
    products = response.data;
  } catch (err) {
    console.error("Failed to fetch products:", err);
    error = "Failed to load products";
  }

  if (error) return <div className="text-center mt-20">Error: {error}</div>;
  if (products.length === 0)
    return <div className="text-center mt-20">No products found</div>;

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-5 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center">All Products</h1>
        <ProductGrid products={products} />
      </div>
    </>
  );
}

//csr

// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import ProductGrid from "../components/products/productGrid";
// import Header from '../components/header';  // Import the Header component

// interface Product {
//   id: number;
//   title: string;
//   description: string;
//   price: number;
//   productType: string;
//   vendor: { id: number; name: string };
//   category: { id: number; name: string };
//   imageUrl?: string;
// }

// export default function Home() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get<Product[]>("http://localhost:3000/products");
//         setProducts(response.data);
//       } catch (err) {
//         console.error("Failed to fetch products:", err);
//         setError("Failed to load products");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   if (loading) return <div className="text-center mt-20">Loading...</div>;
//   if (error) return <div className="text-center mt-20">Error: {error}</div>;
//   if (products.length === 0)
//     return <div className="text-center mt-20">No products found</div>;

//   return (

//     <>
//     <Header/>
//     <div className="max-w-7xl mx-auto px-5 py-10">
      
//       <h1 className="text-3xl font-bold mb-6 text-center">All Products</h1>
//       <ProductGrid products={products} />
//     </div>
//     </>
//   );
// }


