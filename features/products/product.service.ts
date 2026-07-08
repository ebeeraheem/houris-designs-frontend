import { productRepository } from "./product.repository"
import type { Product, ProductListResponse } from "./product.types"
import type { GetProductsParams } from "./product.adapter"
import { PRODUCTS_PER_PAGE } from "./product.constants"

const buildSearchParams = (params: GetProductsParams): GetProductsParams => ({
  ...params,
  page: params.page ?? 1,
  pageSize: params.pageSize ?? PRODUCTS_PER_PAGE,
})

export const productService = {
  getProducts: (
    params: GetProductsParams = {}
  ): Promise<ProductListResponse> => {
    return productRepository.getAll(buildSearchParams(params))
  },

  getProductBySlug: (slug: string): Promise<Product> => {
    return productRepository.getBySlug(slug)
  },
}
