import { useEffect, useState } from 'react';
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
} from 'recharts';
import {
  dashboardCard,
  getMonthWiseOrders,
  getOrderStatusCount,
  getSalesCustomer,
} from '../api/dashboard.api';
import type { DashboardCard, SalesCustomer } from '../types/dashboard.types';
import { CircularProgress } from '@mui/material';
import { getAllOrders } from '../api/orders.api';
import type { Order } from '../types/order.types';
import Calendar from '../components/Calendar';

type OrderStatusChartData = {
  name: string;
  value: number;
};
type OrderChartData = {
  month: string;
  orders: number;
  revenue: number;
};
type MonthOrders = {
  month: number;
  year: number;
  orders: number;
  revenue: number;
};

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const COLORS = ['#facc15', '#22c55e', '#4483ef', '#ef4444'];

const Dashboard = () => {
  const [dashboardStat, setDashboardStat] = useState<DashboardCard | null>(
    null,
  );
  const [salesData, setSalesData] = useState<SalesCustomer[]>([]);
  const [orderData, setOrderData] = useState<OrderChartData[]>([]);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [orderStatusData, setOrderStatusData] = useState<
    OrderStatusChartData[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      try {
        const [
          dashboardStats,
          salesCustomer,
          monthOrders,
          orders,
          orderStatusCount,
        ] = await Promise.all([
          dashboardCard(),
          getSalesCustomer(),
          getMonthWiseOrders(),
          getAllOrders(),
          getOrderStatusCount(),
        ]);
        setDashboardStat(dashboardStats);
        setSalesData(salesCustomer);
        const chartData = monthOrders.map((item: MonthOrders) => ({
          month: `${monthNames[item.month - 1]} ${item.year}`,
          orders: item.orders,
          revenue: item.revenue,
        }));
        setOrderData(chartData);
        setRecentOrders(orders.slice(0, 5));
        const formattedData = Object.entries(orderStatusCount).map(
          ([key, value]) => ({
            name: key.charAt(0).toUpperCase() + key.slice(1),
            value,
          }),
        );
        setOrderStatusData(formattedData);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadDashboardData();
  }, []);

  if (!dashboardStat || loading) {
    return (
      <div className='flex justify-center py-10'>
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className='p-6 min-h-screen bg-gradient-to-br from-slate-100 to-slate-200'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-2xl font-bold text-slate-800'>
          Dashboard Overview
        </h1>
        <p className='text-sm text-slate-500'>
          Business performance & analytics
        </p>
      </div>

      {/* KPI Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10'>
        {[
          {
            title: 'Total Revenue',
            value: `₹${dashboardStat?.totalRevenue}`,
            gradient: 'from-emerald-500 to-green-400',
          },
          {
            title: 'Total Orders',
            value: dashboardStat?.totalOrders,
            gradient: 'from-blue-500 to-indigo-400',
          },
          {
            title: 'Total Customers',
            value: dashboardStat?.totalCustomers,
            gradient: 'from-purple-500 to-fuchsia-400',
          },
        ].map((card) => (
          <div
            key={card.title}
            className={`rounded-2xl p-6 text-white shadow-lg bg-gradient-to-br ${card.gradient} hover:scale-[1.02] transition`}
          >
            <p className='text-sm opacity-80'>{card.title}</p>
            <h2 className='text-3xl font-bold mt-3'>{card.value}</h2>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10'>
        <div className='bg-white/70 backdrop-blur rounded-2xl shadow p-6'>
          <h2 className='text-lg font-semibold text-slate-800 mb-4'>
            Customers by Sales Person
          </h2>
          <ResponsiveContainer width='100%' height={260}>
            <BarChart data={salesData}>
              <XAxis dataKey='salesName' />
              <YAxis />
              <Tooltip />
              <Bar dataKey='customers' fill='#6366f1' radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className='bg-white/70 backdrop-blur rounded-2xl shadow p-6'>
          <h2 className='text-lg font-semibold text-slate-800 mb-4'>
            Orders Over Time
          </h2>
          <ResponsiveContainer width='100%' height={260}>
            <LineChart data={orderData}>
              <XAxis dataKey='month' />
              <YAxis />
              <Tooltip />
              <Line
                type='monotone'
                dataKey='orders'
                stroke='#22c55e'
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Status + Recent Orders */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='bg-white/70 backdrop-blur rounded-2xl shadow p-6'>
          <h2 className='text-lg font-semibold text-slate-800 mb-4'>
            Order Status
          </h2>
          <ResponsiveContainer width='100%' height={260}>
            <PieChart>
              <Pie
                data={orderStatusData}
                dataKey='value'
                innerRadius={65}
                outerRadius={95}
                paddingAngle={4}
              >
                {orderStatusData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className='bg-white/70 backdrop-blur rounded-2xl shadow p-6 lg:col-span-2'>
          <h2 className='text-lg font-semibold text-slate-800 mb-4'>
            Recent Orders
          </h2>

          <table className='w-full text-sm'>
            <thead>
              <tr className='text-left text-slate-500 border-b'>
                <th className='pb-2'>Order</th>
                <th className='pb-2'>Customer</th>
                <th className='pb-2'>Amount</th>
                <th className='pb-2'>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={4} className='py-4 text-center text-slate-500'>
                    No recent orders
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr
                    key={order?._id}
                    className='border-b last:border-none hover:bg-slate-50 transition'
                  >
                    <td className='py-3 font-medium'>{`Order ${order?._id?.slice(-6).toUpperCase()}`}</td>
                    <td>{order?.customer?.name}</td>
                    <td>{order?.total}</td>
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order?.status === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : order?.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
