import { productRepository } from "./product.repository"
import type { Product, ProductListResponse } from "./product.types"
import type {
  CreateProductPayload,
  UpdateProductPayload,
} from "./product.schema"
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

  getProductById: (id: string): Promise<Product> => {
    return productRepository.getById(id)
  },

  createProduct: (payload: CreateProductPayload): Promise<Product> => {
    return productRepository.create(payload)
  },

  updateProduct: (
    id: string,
    payload: UpdateProductPayload
  ): Promise<Product> => {
    return productRepository.update(id, payload)
  },

  toggleProduct: async (id: string): Promise<Product> => {
    const product = await productRepository.getById(id)
    const nextEnabled = !product.isEnabled

    return productRepository.update(id, {
      isEnabled: nextEnabled,
    } as UpdateProductPayload)
  },

  deleteProduct: (id: string): Promise<void> => {
    return productRepository.remove(id)
  },
}
