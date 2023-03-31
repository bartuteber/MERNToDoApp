import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { sxFallBackElement } from './style';

function FallBackElement() {
  return (
    <Box sx={sxFallBackElement.root}>
      <CircularProgress size="64px" sx={sxFallBackElement.circularProgress} />
    </Box>
  );
}

export default FallBackElement;
