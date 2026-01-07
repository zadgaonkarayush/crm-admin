import { useEffect, useState } from 'react';
import {
  Paper,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import type { Role } from '../../types/user.types';
import { useAuth } from '../../context/authContext';
import { createUser, getAllUsers } from '../../api/user.api';
import { useNavigate } from 'react-router-dom';

interface AddUserForm {
  name: string;
  email: string;
  password: string;
  role: Role;
  managerId: string;
}


const AddUser = () => {
  const { user } = useAuth();
  if (!user) return null;
  console.log(user);
  const navigate = useNavigate()

  const isAdmin = user.role === 'admin';
  const isManager = user.role === 'manager';

  const [form, setForm] = useState<AddUserForm>({
    name: '',
    email: '',
    password: '',
    role: 'sales',
    managerId: isManager ? user._id : '',
  });
 const [managers, setManagers] = useState<{ _id: string; name: string }[]>([]);

 useEffect(()=>{
 const loadManager =async()=>{
  const users = await getAllUsers();
  const onlyManager = users.filter((u:any)=>u.role === "manager");
  setManagers(onlyManager)
 }
 if (isAdmin) {
    loadManager();
  }
 },[isAdmin])
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async() => {
    const payload = {
      name: form.name,
      email: form.email,
      password: form.password,
      role: isManager ? 'sales' : form.role,
      managerId: isManager
        ? user._id
        : form.role === 'sales'
        ? form.managerId
        : undefined,
    };
    const res = await createUser(payload)
    console.log(res.message);
    navigate('/users')
  };



  return (
    <Paper className='p-6  mx-auto'>
      <h2 className='text-xl font-semibold'>Add User</h2>

      <div className='m-4'>
        <TextField
          label='Name'
          name='name'
          fullWidth
          value={form.name}
          onChange={handleChange}
        />
      </div>
      <div className='m-4'>
        <TextField
          label='Email'
          name='email'
          fullWidth
          value={form.email}
          onChange={handleChange}
        />
      </div>
      <div className='m-4'>
        <TextField
          label='Password'
          name='password'
          type='password'
          fullWidth
          value={form.password}
          onChange={handleChange}
        />
      </div>

      {/* ROLE – ADMIN ONLY */}
      {isAdmin && (
        <div className='m-4'>
          <FormControl fullWidth>
            <InputLabel id='role-label'>Role</InputLabel>
            <Select
              labelId='role-label'
              name='role'
              value={form.role}
              label='Role'
              onChange={handleChange}
            >
              <MenuItem value='admin'>Admin</MenuItem>
              <MenuItem value='manager'>Manager</MenuItem>
              <MenuItem value='sales'>Sales</MenuItem>
            </Select>
          </FormControl>
        </div>
      )}

      {/* MANAGER – ONLY IF SALES & ADMIN */}
      {isAdmin && form.role === 'sales' && (
        <div className='m-4'>
          <FormControl fullWidth>
            <InputLabel>Manager</InputLabel>
            <Select
              name='managerId'
              value={form.managerId}
              onChange={handleChange}
            >
              {managers.map((m) => (
                <MenuItem key={m._id} value={m._id}>
                  {m.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      )}

      <div className='flex justify-end gap-2'>
        <Button variant='contained' color='warning'
        onClick={()=>navigate(-1)}
        >Back</Button>
        <Button variant='contained' onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </Paper>
  );
};

export default AddUser;
