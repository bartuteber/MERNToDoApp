export const sxSignin = {
  textField: () => ({
    '& label.Mui-focused': {
      color: 'white'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgba(255,255,255,0.5)'
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white'
      },
      '&:hover fieldset': {
        borderColor: 'white'
      }
    }
  }),
  paper: (theme) => ({
    width: '500px',
    backgroundColor: theme.palette.backgroundDark,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: theme.spacing(2),
    position: 'relative',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(10)
  }),
  inputWrapper: (theme) => ({
    padding: theme.spacing(2),
    display: 'flex',
    flex: 1,
    width: `calc(100% - ${theme.spacing(10)})`,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  }),
  buttonsWrapper: (theme) => ({
    padding: theme.spacing(3, 0),
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(5),
    justifyContent: 'space-between',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: theme.spacing(3),
    right: theme.spacing(3)
  }),
  containedButton: (theme) => ({
    backgroundColor: theme.palette.backgroundMern,
    '&:hover': {
      backgroundColor: theme.palette.backgroundMernDark
    },
    '&.Mui-disabled': {
      backgroundColor: theme.palette.backgroundMern,
      opacity: '50%'
    }
  }),
  outlinedButton: (theme) => ({
    borderColor: theme.palette.backgroundMern,
    '&:hover': {
      borderColor: theme.palette.backgroundMernDark
    }
  })
};
