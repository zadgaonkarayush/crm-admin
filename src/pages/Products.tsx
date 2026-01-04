import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, CircularProgress } from '@mui/material';
import ReusableTable from '../components/ReusableTable';
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import {
  bulkProductDelete,
  deleteProduct,
  getAllProducts,
} from '../api/product.api';
import type { Product } from '../types/product.types';
import ErrorState from '../components/ErrorState';

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleView = (row: Product) => {
    navigate(`/products/view/${row._id}`);
  };

  const handleEdit = (row: Product) => {
    navigate(`/products/edit/${row._id}`);
  };

  const handleDelete = async (id: string) => {
    await deleteProduct(id);

    setProducts((prev) => prev.filter((user) => user._id !== id));
  };

  const handleBulkDelete = async (ids: string[]) => {
    if (!ids.length) return;

    if (!window.confirm(`Delete ${ids.length} products?`)) return;

    await bulkProductDelete(ids);
    setProducts((prev) => prev.filter((user) => !ids.includes(user._id)));
  };

  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      try {
        setLoading(true);
        const res = await getAllProducts();
        if (mounted) {
          setProducts(res);
        }
      } catch (error: any) {
        setError(error?.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    loadData();
    return () => {
      mounted = false;
    };
  }, []);

  const productColumns = useMemo(
    () => [
      { key: 'sku', label: 'SKU' },
      { key: 'name', label: 'Product Name' },
      { key: 'price', label: 'Price (₹)' },
      { key: 'stock', label: 'Stock' },
      {
        key: 'actions',
        label: 'Actions',
        render: (row: Product) => (
          <div className='flex gap-1'>
            <IconButton size='small' onClick={() => handleView(row)}>
              <VisibilityIcon fontSize='small' color='success' />
            </IconButton>

            <IconButton size='small' onClick={() => handleEdit(row)}>
              <EditIcon fontSize='small' color='primary' />
            </IconButton>

            <IconButton
              size='small'
              color='error'
              onClick={() => handleDelete(row._id)}
            >
              <DeleteIcon fontSize='small' />
            </IconButton>
          </div>
        ),
      },
    ],
    [handleView, handleDelete, handleEdit]
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
      {/* Header */}
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-semibold text-gray-800'>Products</h1>
      </div>

      {/* Table */}
      <div className=' border border-white/10 rounded-xl p-4'>
        <ReusableTable
          data={products}
          columns={productColumns}
          onCreate={() => navigate('/products/add')}
          title='Products'
          onBulkDelete={handleBulkDelete}
        />
      </div>
    </div>
  );
};

export default Products;
