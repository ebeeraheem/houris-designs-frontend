import type {
  Product,
  ProductListResponse,
} from "./product.types"
import type {
  CreateProductPayload,
  UpdateProductPayload,
} from "./product.schema"
import type { GetProductsParams } from "./product.adapter"
import {
  fetchProducts,
  fetchProductById,
  postProduct,
  patchProduct,
  destroyProduct,
} from "./product.adapter"
import { toProduct, toProductList } from "./product.transformer"

export interface IProductRepository {
  getAll(params?: GetProductsParams): Promise<ProductListResponse>
  getById(id: string): Promise<Product>
  create(payload: CreateProductPayload): Promise<Product>
  update(id: string, payload: UpdateProductPayload): Promise<Product>
  remove(id: string): Promise<void>
}

export const productRepository: IProductRepository = {
  getAll: async (params) => {
    const raw = await fetchProducts(params)
    return toProductList(raw)
  },

  getById: async (id) => {
    const raw = await fetchProductById(id)
    return toProduct(raw)
  },

  create: async (payload) => {
    const raw = await postProduct(payload)
    return toProduct(raw)
  },

  update: async (id, payload) => {
    const raw = await patchProduct(id, payload)
    return toProduct(raw)
  },

  remove: async (id) => {
    await destroyProduct(id)
  },
}
