import { Box, IconButton, useTheme, AppBar, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { useSignout } from '../../hooks/useSignout';

const MERNAppBar = () => {
  const theme = useTheme();
  const user = useSelector((state) => state.user.value);
  const { signout } = useSignout();

  const { pathname } = useLocation();

  const handleClickLogout = async () => {
    await signout();
  };

  const pageTitle = useMemo(() => {
    switch (pathname) {
      case '/home': {
        return 'MERN To Do App';
      }
      case '/': {
        return 'Login MERN ToDo';
      }
      default:
        return 'MERN ToDo';
    }
  }, [pathname]);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        display: 'flex',
        justifyContent: user ? 'space-between' : 'center',
        flexDirection: 'row',
        zIndex: theme.zIndex.appBar,
        backgroundColor: theme.palette.backgroundMern,
        backdropFilter: 'blur(6px)',
        alignItems: 'center',
        height: '60px',
        padding: '0px 16px'
      }}>
      <Typography variant="h5" fontWeight={600} color="rgba(0, 0, 0, 0.8)">
        {pageTitle}
      </Typography>
      <Box display="flex">
        {user && (
          <IconButton onClick={handleClickLogout}>
            <LogoutIcon />
          </IconButton>
        )}
      </Box>
    </AppBar>
  );
};

export default MERNAppBar;
