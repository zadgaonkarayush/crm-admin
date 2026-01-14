import { Chip, IconButton, CircularProgress } from '@mui/material';
import ReusableTable from '../components/ReusableTable';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import type { Order } from '../types/order.types';
import { useEffect, useMemo, useState } from 'react';
import { getAllOrders } from '../api/orders.api';
import ErrorState from '../components/ErrorState';

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    const loadOrders = async () => {
      try {
        setLoading(true);
        const res = await getAllOrders();
        if (mounted) {
          setOrders(res);
        }
      } catch (error: any) {
        setError(error?.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
    return()=>{mounted=false}
  }, []);
  const handleView = (row: Order) => {
    navigate(`/orders/view/${row._id}`);
  };
  const orderColumns = useMemo(
    () => [
      { key: '_id', label: 'Order #' ,
        render:(row:Order)=>`Order ${row?._id?.slice(-6).toUpperCase()}`
      },
      {
        key: 'customer',
        label: 'Customer',
        render: (row: Order) => row.customer?.name || '-',
      },
      {
        key: 'createdBy',
        label: 'Sales',
        render: (row: Order) => row.createdBy?.name || '-',
      },
      {
        key: 'status',
        label: 'Status',
        render: (row: Order) => (
          <Chip
            label={row.status}
            size={'small'}
            color={
              row.status === 'completed'
                ? 'success'
                : row.status === 'pending'
                ? 'warning'
                : row.status === 'cancelled'
                ? 'error'
                : row.status === 'shipped'
                ? 'primary'
                : 'default'
            }
          />
        ),
      },
      {
        key: 'total',
        label: 'Total (₹)',
        render: (row: Order) => `₹${row.total.toLocaleString()}`,
      },
      {
        key: 'createdAt',
        label: 'Date',
        render: (row: Order) => new Date(row.createdAt).toLocaleDateString(),
      },
      {
        key: 'actions',
        label: 'Actions',
        render: (row: Order) => (
          <IconButton size='small' onClick={() => handleView(row)}>
            <VisibilityIcon color='success' />
          </IconButton>
        ),
      },
    ],
    [handleView]
  );

  if (loading) {
    return (
      <div className='flex justify-center py-10'>
        <CircularProgress />
      </div>
    );
  }
  if (error) return <ErrorState message={error} />;

  return (
    <div className='space-y-6 text-white'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-semibold text-gray-800'>Orders</h1>
      </div>
      <div className=' border border-white/10 rounded-xl p-4'>
        <ReusableTable
          columns={orderColumns}
          data={orders}
          title='Orders List'
        />
      </div>
    </div>
  );
};

export default Orders;
