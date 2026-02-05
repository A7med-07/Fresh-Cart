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
  const { id } = useParams(); // id هيروح من الرابط مباشرة
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
  if (products.length === 0) return   <div className="flex justify-center items-center text-center h-screen text-green-500">
      <h1 className="text-2xl font-bold"> No products available in this subcategory.</h1>
    </div>;

  return (
 <div>
  <h1 className="text-2xl text-center underline  font-bold mb-6 text-emerald-500"><span className='shadow-green-400'>Products in Subcategory</span></h1>

  {products.length > 0 ? (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
      {products.map((prod: any) => (
        <Card key={prod._id} className="relative mx-auto w-full max-w-xs sm:max-w-sm pt-0">
          <Link href={`/productdetails/${prod._id}`}>
            <Image
              src={prod.imageCover}
              alt={prod.title}
              width={200}
              height={300}
              className="w-full h-[200px] sm:h-[250px] object-cover"
            />
            <CardHeader className="p-3 sm:p-6">
              <Badge variant="secondary" className="text-xs sm:text-sm mb-2">
                {prod.brand?.name || "Brand"}
              </Badge>
              <CardTitle className="text-base sm:text-lg">
                {prod.title.split(" ").slice(0, 2).join(" ")}
              </CardTitle>
              <CardDescription className="my-2 sm:my-3">
                <div className="flex justify-between text-sm sm:text-base">
                  <span>{prod.priceAfterDiscount || prod.price} EGP</span>
                  <span className="flex gap-1 items-center">
                    {prod.ratingsAverage || 0}{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                      />
                    </svg>
                  </span>
                </div>
              </CardDescription>
            </CardHeader>
          </Link>

          <AddBtn productId={prod._id} />
        </Card>
      ))}
    </div>
  ) : (
    <div className="flex justify-center items-center text-center h-screen text-green-500">
      <h1 className="text-2xl font-bold"> No products available in this subcategory.</h1>
    </div>
  )}
</div>
  );
};

export default SubcategoryDetailsPage;
