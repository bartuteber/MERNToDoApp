import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';
import axios from 'axios';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const dispatch = useDispatch();

  const signup = async (email, password, confirmPassword, name, surname) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:5001/api/user/signup', {
        email,
        password,
        confirmPassword,
        name,
        surname
      });
      localStorage.setItem('user', JSON.stringify(response.data));
      dispatch(setUser(response.data));
      setIsLoading(false);
    } catch (error) {
      setError(error.response.data.error);
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
