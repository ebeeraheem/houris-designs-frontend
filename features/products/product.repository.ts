import type { Product, ProductListResponse } from "./product.types"
import type { GetProductsParams } from "./product.adapter"
import { fetchProducts, fetchProductBySlug } from "./product.adapter"
import { toProduct, toProductList } from "./product.transformer"

export interface IProductRepository {
  getAll(params?: GetProductsParams): Promise<ProductListResponse>
  getBySlug(slug: string): Promise<Product>
}

export const productRepository: IProductRepository = {
  getAll: async (params) => {
    const raw = await fetchProducts(params)
    return toProductList(raw)
  },

  getBySlug: async (slug) => {
    const raw = await fetchProductBySlug(slug)
    return toProduct(raw)
  },
}
