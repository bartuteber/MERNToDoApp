import { Box } from '@mui/material';
import HomePage from '../views/HomePage';

export const privateRoutes = [
  {
    path: '/home',
    element: (
      <Box minHeight={`calc(100vh - 108px)`}>
        <HomePage />
      </Box>
    )
  }
];
