import type { CreateProductPayload, Product, UpdateProductPayload } from "../types/product.types";
import api from "./axios";

export const getAllProducts = async():Promise<Product[]>=>{
    const response = await api.get<Product[]>('/products');
    return response.data
}
export const createProduct = async(payload:CreateProductPayload):Promise<Product>=>{
     const response = await api.post('/products',payload);
     return response.data
}
export const getProductById = async(id:string):Promise<Product>=>{
  const response = await api.get(`/products/${id}`);
  return response.data
}
export const updateProduct = async(id:string,payload:UpdateProductPayload):Promise<Product>=>{
const response = await api.put(`/products/${id}`,{
     ...payload,
    price: Number(payload.price),
    stock: Number(payload.stock),
});
return response.data
}
export const deleteProduct =async(id:string):Promise<{message:string}>=>{
const response = await api.delete(`/products/${id}`);
return response.data
}

export const bulkProductDelete = async(ids:string[]):Promise<{message:string,deletedCount:number}>=>{
const response = await api.delete<{message:string,deletedCount:number}>(`/products`,{
  data:{ids}
})
return response.data
}