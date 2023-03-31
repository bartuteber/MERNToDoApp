import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3'
    },
    secondary: {
      main: '#f44336'
    },
    backgroundMern: 'rgba(91, 223, 50, 1)',
    backgroundMernDark: 'rgb(51,183,10)',
    backgroundDark: '#666666'
  },
  spacing: 8
});

export default theme;
