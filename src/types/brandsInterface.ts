import { ProductItem } from './productInterface'

export interface BrandDetailsResponse {
  data: BrandDetails
}

export interface BrandDetails {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
}

export interface BrandProductsResponse {
  results: number
  metadata: {
    currentPage: number
    numberOfPages: number
    limit: number
  }
  data: ProductItem[]
}