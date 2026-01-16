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
import { NavLink, useNavigate } from 'react-router-dom';

import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import StoreIcon from '@mui/icons-material/Store';
import { LocalActivityOutlined, Logout } from '@mui/icons-material';
import { useState } from 'react';
import ConfirmModal from './ConfirmModal';

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
  const navigate = useNavigate();
  const [logout, setLogout] = useState(false);
  const handleLogoutConfirm = () => {
    localStorage.clear();
    navigate('/');
  };
  const handleLogoutClick = () => {
    setLogout(true);
  };

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={isMobile ? open : true}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          border: 'none',
          background: 'linear-gradient(180deg, #0f172a 0%, #1e3a8a 100%)',
          color: '#fff',
          boxShadow: '0 20px 40px rgba(0,0,0,0.35)',
        },
      }}
    >
      <Toolbar />

      {/* BRANDING */}
      <Box sx={{ px: 3, py: 3, display: 'flex', gap: 2 }}>
        <Box
          sx={{
            width: 46,
            height: 46,
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #60a5fa, #6366f1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(99,102,241,0.55)',
            fontWeight: 800,
          }}
        >
          CRM
        </Box>

        <Box>
          <Typography fontWeight={700} fontSize={17}>
            Admin Panel
          </Typography>
          <Typography fontSize={12} color='rgba(255,255,255,0.6)'>
            Manage your business
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

      {/* MENU + LOGOUT CONTAINER */}
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* MENU */}
        <List sx={{ px: 1, mt: 1 }}>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={NavLink}
                to={item.path}
                onClick={isMobile ? onClose : undefined}
                sx={{
                  mx: 1,
                  height: 48,
                  borderRadius: '14px',
                  color: 'rgba(255,255,255,0.75)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.25s ease',

                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: 3,
                    height: '100%',
                    background: '#60a5fa',
                    opacity: 0,
                    transition: 'opacity 0.25s ease',
                  },

                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    color: '#fff',
                  },

                  '&.active': {
                    backgroundColor: 'rgba(96,165,250,0.18)',
                    color: '#fff',
                    fontWeight: 600,
                  },

                  '&.active::before': {
                    opacity: 1,
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
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* LOGOUT – FIXED AT BOTTOM */}
        <Box sx={{ mt: 'auto', mb: 2, px: 2 }}>
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)', mb: 1 }} />

          <ListItem disablePadding>
            <ListItemButton
              onClick={handleLogoutClick}
              sx={{
                height: 46,
                borderRadius: '14px',
                color: '#fca5a5',
                '&:hover': {
                  backgroundColor: 'rgba(239,68,68,0.15)',
                  color: '#fecaca',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                <Logout />
              </ListItemIcon>
              <ListItemText
                primary='Logout'
                primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }}
              />
            </ListItemButton>
          </ListItem>
        </Box>
      </Box>

      <ConfirmModal
        open={logout}
        title='Logout Confirmation'
        description='Are you sure you want to logout?'
        confirmText='Logout'
        cancelText='Cancel'
        onCancel={() => setLogout(false)}
        onConfirm={handleLogoutConfirm}
      />
    </Drawer>
  );
};

export default Sidebar;
