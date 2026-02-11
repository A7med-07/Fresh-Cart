import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ProductItem } from "@/types/productInterface"
import Image from "next/image"
import Link from "next/link"
import AddBtn from "../addBtn/addBtn"


export function ProductCard({ prod }: { prod: ProductItem }) {
    return (
        <Card className="group relative mx-auto w-full max-w-xs sm:max-w-sm pt-0 overflow-hidden border-2 border-gray-100 hover:border-green-300 transition-all duration-500 hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 rounded-2xl bg-gradient-to-b from-white to-gray-50/50">

            <Link href={`/productdetails/${prod._id}`}>
                {/* Image Container with Overlay */}
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
                        <span className="text-sm font-bold text-gray-800">{prod.ratingsAverage}</span>
                    </div>
                </div>

                <CardHeader className="p-4 sm:p-6 space-y-3">
                    <CardAction>
                        <Badge variant="secondary" className="text-xs sm:text-sm bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200 font-semibold">
                            {prod.brand.name}
                        </Badge>
                    </CardAction>
                    
                    <CardTitle className="text-base sm:text-lg font-bold text-gray-800 group-hover:text-green-600 transition-colors duration-300 line-clamp-2">
                        {prod.title.split(' ').slice(0, 2).join(' ')}
                    </CardTitle>
                    
                    <CardDescription className="my-2 sm:my-3">
                        <div className="flex justify-between items-center text-sm sm:text-base">
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold text-green-600">
                                    {prod.price}
                                </span>
                                <span className="text-xs text-gray-500 font-medium">EGP</span>
                            </div>
                        </div>
                    </CardDescription>
                </CardHeader>
            </Link>

            {/* Bottom Accent Line */}
            <div className="h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

            <AddBtn productId={prod._id} />
        </Card>
    )
}