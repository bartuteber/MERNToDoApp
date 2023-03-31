export const sxToDoCard = {
  card: (theme) => ({
    '&:hover': {
      boxShadow: '1px 3px 5px rgba(248, 181, 42, 0.7)'
    },
    display: 'flex',
    mt: theme.spacing(0.5),
    ml: theme.spacing(0.5),
    borderBottom: '1px solid #666666',
    textAlign: 'left',
    boxShadow: 'none'
  }),
  name: (theme) => ({
    fontSize: theme.spacing(2),
    color: '#350816',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1)
  }),
  cardContent: () => ({
    display: 'flex',
    justifyContent: 'space-between',
    flex: 1,
    position: 'relative'
  }),
  editButton: (theme) => ({ color: theme.palette.backgroundDark }),
  deleteButton: () => ({ color: 'red' }),
  cardButtons: () => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'flex-start'
  })
};
