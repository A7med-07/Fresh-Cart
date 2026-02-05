export interface sub {
  results: number
  metadata: sup
  data: supCat[]
}

export interface sup {
  currentPage: number
  numberOfPages: number
  limit: number
  nextPage: number
}

export interface supCat {
  _id: string
  name: string
  slug: string
  category: string
  createdAt: string
  updatedAt: string
}