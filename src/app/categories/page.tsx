import { CategoryResponse, myCategory } from '@/types/categoryInterface'
import { Category } from '@/types/productInterface'
import CategoryCard from '../_components/CategoryCard/CategoryCard'
import { supCat } from '@/types/supCatInterface'

export default async function Categories() {
    // https://ecommerce.routemisr.com/api/v1/categories


    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`)
    let { data: allCategories }: { data: Category[] } = await res.json()





    return <>

        <div className="container mx-auto px-4 py-12 bg-gradient-to-b from-white via-green-50/10 to-gray-50 min-h-screen">
            {/* Header Section */}
            <div className="text-center mb-12 opacity-0 animate-[fadeIn_0.6s_ease-out_forwards]">
                <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    All Categories
                </h1>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Explore our wide range of product categories
                </p>
                <div className="h-1 w-32 bg-gradient-to-r from-green-600 rounded-full mx-auto mt-4"></div>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                {allCategories.map((Category, index) => {
                    return (
                        <div 
                            key={Category._id}
                            className="opacity-0 animate-[fadeIn_0.6s_ease-out_forwards]"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <CategoryCard cat={Category} />
                        </div>
                    )
                })}
            </div>
        </div>
    </>
}