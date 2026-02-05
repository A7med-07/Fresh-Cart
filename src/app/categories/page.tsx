import { CategoryResponse, myCategory } from '@/types/categoryInterface'
import { Category } from '@/types/productInterface'
import CategoryCard from '../_components/CategoryCard/CategoryCard'

export default async function Categories() {
    // https://ecommerce.routemisr.com/api/v1/categories


    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`)
    let { data: allCategories }: { data: Category[] } = await res.json()


    return <>

        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-green-500 text-center">
                All Categories
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {allCategories.map((Category) => {
                    return <CategoryCard key={Category._id} cat={Category} />
                })}
            </div>
        </div>

    </>
}
