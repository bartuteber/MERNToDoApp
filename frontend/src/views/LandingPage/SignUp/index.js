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
import { sxSignin as sxSignup } from '../SignIn/style';
import { useSignup } from '../../../hooks/useSignup';

const Signup = (props) => {
  const { changeToSigninMode } = props;
  const [signUpData, setSignUpData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false
  });

  const { signup, error, isLoading } = useSignup();

  const theme = useTheme();

  const handleChange = (name) => (event) => {
    setSignUpData({ ...signUpData, [name]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setSignUpData({ ...signUpData, showPassword: !signUpData.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onClickSignin = () => {
    changeToSigninMode();
  };

  const signUpDisabled = useMemo(
    () =>
      !signUpData.email ||
      !signUpData.password ||
      !signUpData.confirmPassword ||
      !signUpData.name ||
      !signUpData.surname ||
      isLoading,
    [signUpData, isLoading]
  );

  const onSubmit = async () => {
    await signup(
      signUpData.email,
      signUpData.password,
      signUpData.confirmPassword,
      signUpData.name,
      signUpData.surname
    );
  };
  return (
    <Paper elevation={6} sx={sxSignup.paper}>
      <Typography variant="h5" gutterBottom sx={{ color: 'white' }}>
        Welcome to MERN ToDo App
      </Typography>
      <Box sx={sxSignup.inputWrapper}>
        <TextField
          label="Name"
          type="text"
          value={signUpData.name}
          onChange={handleChange('name')}
          sx={sxSignup.textField}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Surname"
          type="text"
          value={signUpData.surname}
          sx={sxSignup.textField}
          onChange={handleChange('surname')}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Email"
          type="email"
          sx={sxSignup.textField}
          value={signUpData.email}
          onChange={handleChange('email')}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Password"
          type={signUpData.showPassword ? 'text' : 'password'}
          sx={sxSignup.textField}
          value={signUpData.password}
          onChange={handleChange('password')}
          margin="normal"
          fullWidth
          InputProps={{
            endAdornment: (
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}>
                {signUpData.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            )
          }}
        />
        <TextField
          label="Confirm Password"
          type={signUpData.showPassword ? 'text' : 'password'}
          value={signUpData.confirmPassword}
          onChange={handleChange('confirmPassword')}
          sx={sxSignup.textField}
          margin="normal"
          fullWidth
          InputProps={{
            endAdornment: (
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}>
                {signUpData.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            )
          }}
        />
      </Box>
      <Box sx={sxSignup.buttonsWrapper}>
        <Button
          sx={sxSignup.containedButton}
          disabled={signUpDisabled}
          variant="contained"
          onClick={onSubmit}>
          <Typography fontWeight={600} fontSize={16}>
            Sign Up
          </Typography>
        </Button>
        <Box sx={{ display: 'flex', gap: theme.spacing(2), alignItems: 'center' }}>
          <Typography color="white" variant="body1">
            Already have an account?
          </Typography>
          <Button variant="outlined" sx={sxSignup.outlinedButton} onClick={onClickSignin}>
            <Typography color="backgroundMern" fontWeight={600} fontSize={16}>
              Sign in
            </Typography>
          </Button>
        </Box>
      </Box>
      {error && (
        <Alert sx={{ margin: theme.spacing(0, 2) }} severity="error">
          {error}
        </Alert>
      )}
    </Paper>
  );
};
export default Signup;
