'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/store/authSlice';
import { RootState } from '@/store/store';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import CustomTypography from '../ui/CustomTypography/CustomTypography';
import PersonIcon from '@mui/icons-material/Person';

export default function ProfileUser() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!isAuthenticated) {
      router.push('/auth/login'); 
      return;
    }
    setAnchorEl(event.currentTarget); 
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    dispatch(logout());
    handleClose();
  };

  return (
    <>
      {isAuthenticated && user ? (
        <Tooltip title={`${user.username} (${user.email})`}>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 ,borderRadius:'15px'} }
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            
          >
              <CustomTypography sx={{marginRight: 1,fontSize: '1rem'}}>{user?.username}</CustomTypography>
            <Avatar sx={{ width: 32, height: 32 }} src={user.avatar} alt={user.username}>
              {user.username.charAt(0)}
            </Avatar>
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Login">
          <Button
            onClick={handleClick}
            size="small"
            sx={{ ml: 2, textTransform: 'none', color: 'inherit' }}
          >
       
            <PersonIcon />
          
          </Button>
        </Tooltip>
      )}

      {isAuthenticated && (
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem>
          
          
            <CustomTypography>{user?.email}</CustomTypography>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      )}
    </>
  );
}