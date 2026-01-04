import type { Order } from "../types/order.types";
import api from "./axios";

export const getAllOrders = async (): Promise<Order[]> => {
  const response = await api.get("/orders");
  return response.data;
};
export const getOrderById = async (id: string) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};
export const updateOrderStatus = async(orderId:string,
     status: "pending" | "completed" | "cancelled" |"shipped"
)=>{
const response = await api.put(`/orders/${orderId}`,{
    status
})
return response.data
}