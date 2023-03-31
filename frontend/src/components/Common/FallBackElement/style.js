export const sxFallBackElement = {
  root: () => ({
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }),
  circularProgress: (theme) => ({
    color: theme.palette.backgroundMern,
    height: theme.spacing(12),
    width: theme.spacing(12)
  })
};
