import { Button } from "@/components/ui/button";
import { ProductItem } from "@/types/productInterface";
import Image from "next/image";
import { ProductCard } from "./_components/ProductCard/ProductCard";
import MainSlider from "./_components/MainSlider/MainSlider";
import CategorySlider from "./_components/CategorySlider/CategorySlider";

export default async function Home() {

  let response = await fetch(`https://ecommerce.routemisr.com/api/v1/products `)

  let { data: allProducts }: { data: ProductItem[] } = await response.json()
  console.log(allProducts);



  return <>

<MainSlider/>
<CategorySlider/>

       
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
      {allProducts.map((prod) => <ProductCard key={prod._id} prod={prod} />)}
    </div>




  </>
}