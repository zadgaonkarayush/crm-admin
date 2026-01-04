export interface OrderLine {
  product: {
    _id: string;
    name: string;
    sku: string;
    price: number;
  };
  quantity: number;
  price: number;
  tax: number;
}
export interface Customer {
  _id: string;
  name: string;
  email: string;
}
export interface OrderUser {
  _id: string;
  name: string;
  role: "admin" | "manager" | "sales";
}
export type OrderStatus =
  | "draft"
  | "pending"
  | "shipped"
  | "completed"
  | "cancelled";

export interface Order {
  _id: string;
  customer: Customer;
  createdBy: OrderUser;
  status: OrderStatus;
  total: number;
  lines: OrderLine[];
  createdAt: string;
  updatedAt: string;
}
