// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { Auth } from '../hooks/auth';
// import { ROLE_PERMISSIONS } from '../roles/permissions';

// const Sidebar = () => {
//     const {role} = Auth();
//     const permissions = ROLE_PERMISSIONS[role];

//   const linkClass = ({ isActive }: { isActive: boolean }) =>
//     `block px-4 py-2 rounded-md ${
//       isActive ? 'bg-slate-700 text-white' : 'text-slate-300 hover:bg-slate-700'
//     }`;
//   return (
//     <aside className='mt-20'>
//       <nav>
//         {permissions.includes('dashboard')&&(
//             <NavLink to='/' className={linkClass} end>
//           Dashboard
//         </NavLink>
//         )}
//         {permissions.includes('users') && (
//           <NavLink to="/users" className={linkClass}>Users</NavLink>
//         )}
//         {permissions.includes('products') && (
//           <NavLink to="/products" className={linkClass}>Products</NavLink>
//         )}
//         {permissions.includes('orders') && (
//           <NavLink to="/orders" className={linkClass}>Orders</NavLink>
//         )}
//         {permissions.includes('customers') && (
//           <NavLink to="/customers" className={linkClass}>Customers</NavLink>
//         )}
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useMediaQuery,
  Box,
  Typography,
  Divider,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';

import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import StoreIcon from '@mui/icons-material/Store';
import { LocalActivityOutlined } from '@mui/icons-material';

const drawerWidth = 260;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Users', icon: <PeopleIcon />, path: '/users' },
  { text: 'Customers', icon: <StoreIcon />, path: '/customers' },
  { text: 'Products', icon: <InventoryIcon />, path: '/products' },
  { text: 'Orders', icon: <ShoppingCartIcon />, path: '/orders' },
  { text: 'Activity Logs', icon: <LocalActivityOutlined />, path: '/logs' },
];

const Sidebar = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={isMobile ? open : true}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          border: 'none',
          background:
            'linear-gradient(180deg, rgba(15,23,42,1), rgba(30,64,175,1))',
          color: '#fff',
          backdropFilter: 'blur(12px)',
        },
      }}
    >
      <Toolbar />

      {/* Branding */}
      <Box
        sx={{
          px: 3,
          py: 4,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #60a5fa, #6366f1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 25px rgba(99,102,241,0.45)',
          }}
        >
          <Typography fontWeight="bold">CRM</Typography>
        </Box>

        <Box>
          <Typography fontWeight={700} fontSize={18}>
            Admin Panel
          </Typography>
          <Typography fontSize={12} color="rgba(255,255,255,0.6)">
            Manage your business
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 1 }} />

      {/* Menu */}
      <List sx={{ px: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={NavLink}
              to={item.path}
              onClick={isMobile ? onClose : undefined}
              sx={{
                position: 'relative',
                mx: 1,
                borderRadius: '14px',
                color: 'rgba(255,255,255,0.7)',
                transition: 'all 0.25s ease',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  height: 0,
                  width: 4,
                  borderRadius: 4,
                  backgroundColor: '#60a5fa',
                  transition: 'height 0.25s ease',
                },
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  color: '#fff',
                },
                '&.active': {
                  backgroundColor: 'rgba(96,165,250,0.15)',
                  color: '#fff',
                },
                '&.active::before': {
                  height: '60%',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: 'inherit',
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: 500,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
