'use client'
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AddBtn from '@/app/_components/addBtn/addBtn';
import Loading from '@/app/loading';

const SubcategoryDetailsPage = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProducts = async () => {
      try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?subcategory=${id}`);
        const data = await res.json();
        console.log("Fetched data:", data);
        setProducts(data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  if (loading) return <p><Loading/></p>;
  
  if (products.length === 0) return (
    <div className="flex flex-col justify-center items-center text-center min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/10 to-gray-50 px-4">
      <div className="opacity-0 animate-[fadeIn_0.6s_ease-out_forwards]">
        <div className="mx-auto mb-6 h-24 w-24 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center shadow-lg">
          <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">No Products Found</h1>
        <p className="text-gray-600 text-lg mb-8">No products available in this subcategory.</p>
        <Link href="/categories">
          <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            Browse Categories
          </button>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-12 bg-gradient-to-b from-white via-purple-50/10 to-gray-50 min-h-screen">
      {/* Header */}
      <div className="text-center mb-12 opacity-0 animate-[fadeIn_0.6s_ease-out_forwards]">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center shadow-md">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Products in Subcategory
          </h1>
        </div>
        <p className="text-gray-600 text-lg">
          Discover {products.length} amazing {products.length === 1 ? 'product' : 'products'}
        </p>
        <div className="h-1 w-32 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full mx-auto mt-4"></div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {products.map((prod: any, index: number) => (
          <Card 
            key={prod._id} 
            className="group relative mx-auto w-full max-w-xs sm:max-w-sm pt-0 overflow-hidden border-2 border-gray-100 hover:border-purple-300 transition-all duration-500 hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 rounded-2xl bg-gradient-to-b from-white to-gray-50/50 opacity-0 animate-[fadeIn_0.6s_ease-out_forwards]"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <Link href={`/productdetails/${prod._id}`}>
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <Image
                  src={prod.imageCover}
                  alt={prod.title}
                  width={200}
                  height={300}
                  className="w-full h-[200px] sm:h-[250px] object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Rating Badge */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 transform translate-x-20 group-hover:translate-x-0 transition-transform duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4 text-yellow-400">
                    <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                  </svg>
                  <span className="text-sm font-bold text-gray-800">{prod.ratingsAverage || 0}</span>
                </div>
              </div>

              <CardHeader className="p-4 sm:p-6 space-y-3">
                <Badge variant="secondary" className="text-xs sm:text-sm w-fit bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700 border border-purple-200 font-semibold">
                  {prod.brand?.name || "Brand"}
                </Badge>
                
                <CardTitle className="text-base sm:text-lg font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-300 line-clamp-2">
                  {prod.title.split(" ").slice(0, 2).join(" ")}
                </CardTitle>
                
                <CardDescription className="my-2 sm:my-3">
                  <div className="flex justify-between items-center text-sm sm:text-base">
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold text-purple-600">
                        {prod.priceAfterDiscount || prod.price}
                      </span>
                      <span className="text-xs text-gray-500 font-medium">EGP</span>
                    </div>
                  </div>
                </CardDescription>
              </CardHeader>
            </Link>

            {/* Bottom Accent Line */}
            <div className="h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

            <AddBtn productId={prod._id} />
          </Card>
        ))}
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default SubcategoryDetailsPage;