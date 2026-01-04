import type { CustomerFormData } from "../types/customer.types";
import api from "./axios";
import type{ Customer } from "../types/customer.types";
interface CustomerListResponse {
  data: Customer[];
  meta: {
    total: number;
    page: number;
    pages: number;
  };
}

export const getAllCustomer = async (): Promise<Customer[]> => {
  const response = await api.get<CustomerListResponse>("/customer");
  return response.data.data;
};
export const getCustomerById = async(id:string):Promise<Customer>=>{
const response = await api.get<Customer>(`/customer/${id}`);
return response.data
}
export const createCustomer = async(payload:CustomerFormData):Promise<Customer>=>{
    const response = await api.post('/customer',payload);
    return response.data
}
export const updateCustomer = async(id:string,payload:CustomerFormData):Promise<Customer>=>{
    const response = await api.put(`/customer/${id}`,payload);
    return response.data
}