import { myCategory } from "./categoryInterface"
import { ProductItem } from "./productInterface"

export interface CategoryDetailsResponse {
  data: myCategory
}

export interface CategoryProductsResponse {
  results: number
  metadata: {
    currentPage: number
    numberOfPages: number
    limit: number
  }
  data: ProductItem[]
}