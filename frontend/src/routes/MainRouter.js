import { useEffect, useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { publicRoutes } from './publicRoutes';
import { privateRoutes } from './privateRoutes';
import ErrorElement from '../components/Common/ErrorElement';
import { useSelector } from 'react-redux';
import FallBackElement from '../components/Common/FallBackElement';
import { Box, useTheme } from '@mui/material';

const MainRouter = () => {
  const user = useSelector((state) => state.user.value);
  const [routes, setRoutes] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    if (user) {
      setRoutes(privateRoutes);
    } else {
      setRoutes(publicRoutes);
    }
  }, [user]);

  const router = useMemo(() => {
    return routes.map((route) => {
      if (route.children) {
        return (
          <Route key={route.path} path={route.path} element={route.element}>
            {router(route.children)}
          </Route>
        );
      }
      return <Route key={route.path} path={route.path} element={route.element} />;
    });
  }, [routes]);

  return routes ? (
    <Routes>
      {router}
      <Route
        path="*"
        element={
          <Box minHeight={`calc(100vh - ${theme.spacing(13.5)})`}>
            <ErrorElement />
          </Box>
        }
      />
    </Routes>
  ) : (
    <FallBackElement />
  );
};

export default MainRouter;
