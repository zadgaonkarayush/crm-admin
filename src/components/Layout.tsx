import { useState } from 'react';
import { Box, Toolbar, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const drawerWidth = 0;

const Layout = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar onMenuClick={() => setOpen(true)} />
      <Sidebar open={open} onClose={() => setOpen(false)} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          minHeight: '100vh',
          backgroundColor: '#f2f0f0ff',
          ml: isMobile ? 0 : `${drawerWidth}px`,
          width: isMobile ? '100%' : `calc(100% - ${drawerWidth}px)`
        }}
      >
        <Toolbar />
        <Outlet /> {/* Render child routes here */}
      </Box>
    </Box>
  );
};

export default Layout;
