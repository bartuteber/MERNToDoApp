import { Box } from '@mui/material';
import LandingPage from '../views/LandingPage';

export const publicRoutes = [
  {
    path: '/',
    element: (
      <Box
        display="flex"
        minHeight={`calc(100vh - 108px)`}
        justifyContent="center"
        alignItems="center">
        <LandingPage />
      </Box>
    )
  }
];
