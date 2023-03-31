import { useDispatch } from 'react-redux';
import { resetUser } from '../redux/slices/userSlice';

export const useSignout = () => {
  const dispatch = useDispatch();
  const signout = () => {
    localStorage.removeItem('user');
    dispatch(resetUser());
  };

  return { signout };
};
