import type { DashboardCard, SalesCustomer } from "../types/dashboard.types";
import api from "./axios"

export const dashboardCard = async():Promise<DashboardCard>=>{
    const response = await api.get("/dashboard/summary");
    return response.data
}
export const getSalesCustomer = async():Promise<SalesCustomer[]>=>{
     const response = await api.get("/dashboard/sales");
    return response.data
}
export const getMonthWiseOrders = async()=>{
     const response = await api.get("/dashboard/month-orders");
    return response.data
}