import ReusableTable from "../components/ReusableTable";
import DeleteIcon from "@mui/icons-material/Delete";

import { Chip, IconButton , CircularProgress} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { deleteBulkUser, deleteUser, getAllUsers } from "../api/user.api";
import type { User } from "../types/user.types";

const Users = () => {
  
const [data,setData] = useState<User[]>([]);
const [loading, setLoading] = useState(true);


 const navigate = useNavigate();
  // Optional: handle bulk delete or add new user
  const handleBulkDelete =async (ids: string[]) => {
     if (!ids.length) return;

  if (!window.confirm(`Delete ${ids.length} users?`)) return;
   await deleteBulkUser(ids);

   setData((prev)=>prev.filter((user)=>!ids.includes(user._id)));
  };
  const handleDelete =async(id:string)=>{
      if (!window.confirm("Are you sure you want to delete this user?")) return;

      await deleteUser(id);

      setData((prev)=>prev.filter((user)=>user._id !== id))
  }

  const handleCreateUser = () => {
   navigate('/users/add')
    // Open modal or navigate to create user page
  };
  const columns =useMemo(()=>[
    
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    {
      key: "role",
      label: "Role",
      render: (row: User) => (
        <Chip
          label={row.role.toUpperCase()}
          color={
            row.role === "admin"
              ? "error"
              : row.role === "manager"
              ? "primary"
              : "default"
          }
          size="small"
        />
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row: User) => (
      <>
         <IconButton
        size="small"
        color="error"
        onClick={() => handleDelete(row._id)}
      >
        <DeleteIcon />
      </IconButton>
      </>
      ),
    },
  ]
  ,[handleDelete])

  useEffect(()=>{
    let mounted = true;

     const loadData = async()=>{
       try{
        setLoading(true)
          const res =await getAllUsers();
       if(mounted){
         setData(res)
       }
       }catch(error){
         console.error(error);
       }finally{
        setLoading(false)
       }
     }
     loadData()
     return ()=>{mounted=false};
  },[]);
  


   if (loading) {
      return (
        <div className="flex justify-center py-10">
          <CircularProgress />
        </div>
      );
    }
  
  return (
    <div className="space-y-6 text-white">
        <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-semibold text-gray-800'>Users</h1>
      </div>

      <ReusableTable
        columns={columns}
        data={data}
        title="Users"
        onCreate={handleCreateUser}
        onBulkDelete={handleBulkDelete}
      />
    </div>
  );
};

export default Users;
