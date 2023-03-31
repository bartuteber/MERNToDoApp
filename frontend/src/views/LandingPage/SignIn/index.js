import { Alert, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { useMemo, useState } from 'react';
import { sxSignin } from './style';
import { useSignin } from '../../../hooks/useSignin';

const Signin = (props) => {
  const { changeToSignupMode } = props;

  const { signin, error, isLoading } = useSignin();

  const [signinData, setSigninData] = useState({
    email: '',
    password: '',
    showPassword: false
  });
  const theme = useTheme();

  const handleChange = (name) => (event) => {
    setSigninData({ ...signinData, [name]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setSigninData({ ...signinData, showPassword: !signinData.showPassword });
  };

  const onClickSignup = () => {
    changeToSignupMode();
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = async () => {
    await signin(signinData.email, signinData.password);
  };

  const disableSignin = useMemo(
    () => !signinData.email || !signinData.password || isLoading,
    [signinData, isLoading]
  );

  return (
    <Paper elevation={6} sx={sxSignin.paper}>
      <Typography variant="h5" gutterBottom sx={{ color: 'white' }}>
        Welcome to MERN ToDo App
      </Typography>
      <Box sx={sxSignin.inputWrapper}>
        <TextField
          label="Email"
          type="email"
          value={signinData.email}
          sx={sxSignin.textField}
          onChange={handleChange('email')}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Password"
          type={signinData.showPassword ? 'text' : 'password'}
          value={signinData.password}
          onChange={handleChange('password')}
          sx={sxSignin.textField}
          margin="normal"
          fullWidth
          InputProps={{
            endAdornment: (
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}>
                {signinData.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            )
          }}
        />
      </Box>
      <Box sx={sxSignin.buttonsWrapper}>
        <Box>
          <Button
            sx={sxSignin.containedButton}
            variant="contained"
            onClick={onSubmit}
            disabled={disableSignin}>
            <Typography fontWeight={600} fontSize={16}>
              Sign In
            </Typography>
          </Button>
        </Box>
        <Box sx={{ display: 'flex', gap: theme.spacing(2), alignItems: 'center' }}>
          <Typography color="white" variant="body1">
            Not registered yet?
          </Typography>
          <Button variant="outlined" sx={sxSignin.outlinedButton} onClick={onClickSignup}>
            <Typography color="backgroundMern" fontWeight={600} fontSize={16}>
              Sign Up
            </Typography>
          </Button>
        </Box>
      </Box>
      {error && (
        <Alert severity="error" sx={{ margin: theme.spacing(0, 2) }}>
          {error}
        </Alert>
      )}
    </Paper>
  );
};
export default Signin;
