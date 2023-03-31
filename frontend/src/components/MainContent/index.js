import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import MainRouter from '../../routes/MainRouter';
import { sxMainContent } from './style';

function MainContent() {
  const user = useSelector((state) => state.user.value);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname !== '/' && !user) {
      navigate('/');
    } else if (pathname === '/' && user) {
      navigate('/home');
    }
  }, [pathname, user, navigate]);
  return (
    <Box component="main" sx={sxMainContent.root}>
      <MainRouter />
    </Box>
  );
}

export default MainContent;
