import type { User} from './user.types.ts'
export interface Customer {
  _id: string;
  name: string;
  company?: string;
  email?: string;
  phone?: string;
  address?: string;
  notes?: string;

  createdBy: User | string;

  createdAt: string;
  updatedAt: string;
}
export interface CustomerFormData {
  name: string;
  company?: string;
  email?: string;
  phone?: string;
  address?: string;
  notes?: string;

  // only admin / manager will send this
  salesId?: string;
}
export interface CustomerListResponse {
  data: Customer[];
  meta: {
    total: number;
    page: number;
    pages: number;
  };
}
export interface CustomerDetailResponse {
  data: Customer;
}
