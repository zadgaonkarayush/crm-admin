import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 14,
  backgroundColor: alpha('#ffffff', 0.15),
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255,255,255,0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: alpha('#ffffff', 0.25),
  },
  '&:focus-within': {
    boxShadow: '0 0 0 2px rgba(96,165,250,0.6)',
  },
  marginLeft: theme.spacing(2),
  width: '100%',
  maxWidth: 320,
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'rgba(255,255,255,0.7)',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#fff',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.2, 1, 1.2, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create(['width', 'opacity']),
    fontSize: 14,
    '&::placeholder': {
      color: 'rgba(255,255,255,0.6)',
    },
  },
}));

export default function SearchAppBar({
  onMenuClick,
}: {
  onMenuClick: () => void;
}) {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backdropFilter: 'blur(14px)',
        background:
          'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,64,175,0.95))',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <Toolbar sx={{ minHeight: 72 }}>
        {/* Menu */}
        <IconButton
          edge="start"
          color="inherit"
          onClick={onMenuClick}
          sx={{
            mr: 1,
            backgroundColor: 'rgba(255,255,255,0.08)',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.16)',
            },
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* Brand */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #60a5fa, #6366f1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              boxShadow: '0 8px 20px rgba(99,102,241,0.4)',
            }}
          >
            CRM
          </Box>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              letterSpacing: 0.4,
              display: { xs: 'none', sm: 'block' },
            }}
          >
            Admin Panel
          </Typography>
        </Box>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Search */}
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search orders, users…" />
        </Search>

        {/* Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ml: 2 }}>
          <IconButton
            sx={{
              color: '#fff',
              backgroundColor: 'rgba(255,255,255,0.08)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.16)',
              },
            }}
          >
            <Badge badgeContent={3} color="error">
              <NotificationsNoneIcon />
            </Badge>
          </IconButton>

          <Avatar
            sx={{
              width: 36,
              height: 36,
              cursor: 'pointer',
              border: '2px solid rgba(255,255,255,0.4)',
            }}
          >
            A
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
