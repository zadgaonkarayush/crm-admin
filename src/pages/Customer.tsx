// import ReusableTable from "../components/ReusableTable";
// import { Chip, IconButton } from "@mui/material";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getAllCustomer } from "../api/customer.api";
// const Customers = () => {
//  const [customers,setCustomers] = useState<any[]>([]);

//  useEffect(()=>{
//   const loadData =async ()=>{
//      const res = await getAllCustomer();
//      setCustomers(res)
//   }
//   loadData();
//  },[])

//   const columns = [
//     { key: "name", label: "Name" },
//     { key: "company", label: "Company" },
//     { key: "email", label: "Email" },
//     { key: "phone", label: "Phone" },
//     { key: "address", label: "Address" },
//      {
//       key: "actions",
//       label: "Actions",
//       render: (row:any) => (
//         <div className="flex gap-1">
//           <IconButton size="small" onClick={() => handleView(row)}>
//             <VisibilityIcon fontSize="small" color='success' />
//           </IconButton>

//           <IconButton size="small" onClick={() => handleEdit(row)}>
//             <EditIcon fontSize="small" color='primary' />
//           </IconButton>

//           <IconButton
//             size="small"
//             color="error"
//             onClick={() => handleDelete(row._id)}
//           >
//             <DeleteIcon fontSize="small" />
//           </IconButton>
//         </div>
//       ),
//     },
//   ];
//   console.log(customers)
// const navigate = useNavigate();

//   const handleBulkDelete = (ids: string[]) => {
//     console.log("Delete customers:", ids);
//   };
//  const handleView = (row:any) => {
//     navigate(`/customers/view/${row._id}`)}

//   const handleEdit = (row:any) => {
//     navigate(`/customers/edit/${row._id}`)
//   };
//     const handleCreateCustomer = (row:any) => {
//     navigate('/customers/add')
//   };

//   const handleDelete = (id:any) => {
//     if (window.confirm("Delete this product?")) {
//       console.log("Delete ID:", id);
//     }
//   };
//   return (
//     <div className="space-y-6 text-white">
//       <ReusableTable
//         columns={columns}
//         data={customers}
//         title="Customers"
//         onCreate={handleCreateCustomer}
//         onBulkDelete={handleBulkDelete}
//       />
//     </div>
//   );
// };

// export default Customers;
import { useCallback, useEffect, useMemo, useState } from 'react';
import { IconButton, CircularProgress } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

import ReusableTable from '../components/ReusableTable';
import { getAllCustomer } from '../api/customer.api';
import type { Customer } from '../types/customer.types';
const Customers = () => {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadCustomers = async () => {
      try {
        setLoading(true);
        const res = await getAllCustomer();
        if (isMounted) setCustomers(res);
      } catch (err) {
        setError('Failed to load customers');
      } finally {
        setLoading(false);
      }
    };

    loadCustomers();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleView = useCallback(
    (id: string) => navigate(`/customers/view/${id}`),
    [navigate]
  );

  const handleEdit = useCallback(
    (id: string) => navigate(`/customers/edit/${id}`),
    [navigate]
  );

  const handleDelete = useCallback((id: string) => {
    // open confirmation modal instead of window.confirm
    console.log('Delete:', id);
  }, []);

  const columns = useMemo(
    () => [
      { key: 'name', label: 'Name' },
      { key: 'company', label: 'Company' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' },
      { key: 'address', label: 'Address' },
      {
        key: 'actions',
        label: 'Actions',
        render: (row: Customer) => (
          <div className='flex gap-1'>
            <IconButton size='small' onClick={() => handleView(row._id)}>
              <VisibilityIcon fontSize='small' color='success' />
            </IconButton>

            <IconButton size='small' onClick={() => handleEdit(row._id)}>
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
    [handleView, handleEdit, handleDelete]
  );

  if (loading) {
    return (
      <div className='flex justify-center py-10'>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <p className='text-red-500 text-center'>{error}</p>;
  }

  return (
    <div className='space-y-6 text-white'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-semibold text-gray-800'>Customers</h1>
      </div>
      <div className=' border border-white/10 rounded-xl p-4'>
        <ReusableTable
        columns={columns}
        data={customers}
        title='Customers'
        onCreate={() => navigate('/customers/add')}
      />
      </div>
    </div>
  );
};

export default Customers;
