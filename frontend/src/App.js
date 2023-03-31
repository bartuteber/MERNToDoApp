// import { useContext } from 'react';
import { Box, Stack, ThemeProvider } from '@mui/material';
// import { StoreContext } from './store/store';
import MERNAppBar from './components/AppBar';
import MainContent from './components/MainContent';
import theme from './assets/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box height="100%">
        <Stack direction="row">
          <Box
            sx={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column'
            }}>
            <MERNAppBar />
            <MainContent />
          </Box>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

export default App;
