import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { dashboardCard, getMonthWiseOrders, getSalesCustomer } from "../api/dashboard.api";
import type { DashboardCard, SalesCustomer } from "../types/dashboard.types";

;



const orderStatusData = [
  { name: "Completed", value: 520 },
  { name: "Pending", value: 210 },
  { name: "Cancelled", value: 115 },
];

const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const COLORS = ["#22c55e", "#facc15", "#ef4444"];

const recentOrders = [
  { id: "#ORD001", customer: "Amit", amount: "₹12,500", status: "Completed" },
  { id: "#ORD002", customer: "Sneha", amount: "₹8,200", status: "Pending" },
  { id: "#ORD003", customer: "Ravi", amount: "₹5,100", status: "Cancelled" },
  { id: "#ORD004", customer: "Pooja", amount: "₹18,000", status: "Completed" },
];

const Dashboard = () => {
  const [dashboardStat,setDashboardStat] = useState<DashboardCard | null>(null)
  const [salesData,setSalesData] = useState<SalesCustomer[]>([]);
  const [orderData,setOrderData] = useState([])
  useEffect(() => {
    const fetchDashboardStats = async () => {
      const data = await dashboardCard(); // API call
      setDashboardStat(data);
    };
    const fetchSalesCustomer = async()=>{
      const data = await getSalesCustomer();
      setSalesData(data)
    }
      const fetchMonthOrders = async()=>{
      const data = await getMonthWiseOrders();
      const chartData = data.map((item:any)=>({
         month: `${monthNames[item.month - 1]} ${item.year}`,
         orders: item.orders,
      revenue: item.revenue
      }))
      setOrderData(chartData)
    }
     
  
    fetchDashboardStats();
    fetchSalesCustomer();
    fetchMonthOrders();
  }, []);
  console.log(salesData)

  if (!dashboardStat) {
    return <div className="p-6">Loading dashboard...</div>;
  }
  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">
          Dashboard Overview
        </h1>
        <p className="text-sm text-slate-500">
          Business performance & analytics
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[
          {
            title: "Total Revenue",
            value: `₹${dashboardStat?.totalRevenue}`,
            gradient: "from-emerald-500 to-green-400",
          },
          {
            title: "Total Orders",
            value: dashboardStat?.totalOrders,
            gradient: "from-blue-500 to-indigo-400",
          },
          {
            title: "Total Customers",
            value:dashboardStat?.totalCustomers,
            gradient: "from-purple-500 to-fuchsia-400",
          },
        ].map((card) => (
          <div
            key={card.title}
            className={`rounded-2xl p-6 text-white shadow-lg bg-gradient-to-br ${card.gradient} hover:scale-[1.02] transition`}
          >
            <p className="text-sm opacity-80">{card.title}</p>
            <h2 className="text-3xl font-bold mt-3">{card.value}</h2>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-white/70 backdrop-blur rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Customers by Sales Person
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={salesData}>
              <XAxis dataKey="salesName" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="customers"
                fill="#6366f1"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/70 backdrop-blur rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Orders Over Time
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={orderData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#22c55e"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Status + Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white/70 backdrop-blur rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Order Status
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={orderStatusData}
                dataKey="value"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={4}
              >
                {orderStatusData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/70 backdrop-blur rounded-2xl shadow p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Recent Orders
          </h2>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b">
                <th className="pb-2">Order</th>
                <th className="pb-2">Customer</th>
                <th className="pb-2">Amount</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b last:border-none hover:bg-slate-50 transition"
                >
                  <td className="py-3 font-medium">{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.amount}</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
