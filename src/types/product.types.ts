export interface Product{
_id:string;
sku:string;
name:string;
description?:string;
price:number;
stock:number;
 createdAt: string;
  updatedAt: string;
}
export interface CreateProductPayload {
  name: string;
  description?: string;
  price: number;
  stock: number;
}
export interface UpdateProductPayload {
  sku?:string;
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
}
