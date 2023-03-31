export const sxMainContent = {
  root: (theme) => ({
    overflowY: 'auto',
    flexGrow: 1,
    height: `calc(100vh - ${theme.spacing(13.5)})`,
    padding: theme.spacing(10.5, 3, 3, 3),
    float: 'right',
    '&::-webkit-scrollbar': {
      width: '10px',
      height: '10px',
      marginTop: '60px'
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#f5f5f7',
      marginTop: '60px'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#9f9f9f',
      borderRadius: '6px',
      '&:hover': {
        backgroundColor: '#5f5f5f'
      },
      '&:active': {
        backgroundColor: '#7f7f7f'
      }
    },
    '&::-webkit-scrollbar-corner': {
      display: 'none'
    }
  })
};
