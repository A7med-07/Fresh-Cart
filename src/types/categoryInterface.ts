
export interface CategoryResponse {
  results: number
  metadata: Metadata
  data: myCategory[]
}

export interface Metadata {
  currentPage: number
  numberOfPages: number
  limit: number
}

export interface myCategory {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
}

