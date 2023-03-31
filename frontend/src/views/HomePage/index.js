import { Alert, Box, Button, Grid, Typography } from '@mui/material';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ToDoCard from '../../components/Generic/ToDoCard';
import { sxSignin } from '../LandingPage/SignIn/style';
import AddToDo from './AddEditToDo';
import { sxHomePage } from './style';
import { setToDos } from '../../redux/slices/toDosSlice';
import axios from 'axios';
import { ADD_MODE, EDIT_MODE } from '../../enums/openModes';

const HomePage = () => {
  const user = useSelector((state) => state.user.value);
  const toDos = useSelector((state) => state.toDos.value);
  const dispatch = useDispatch();
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [selectedToDo, setSelectedToDo] = useState(null);
  const [openMode, setOpenMode] = useState(ADD_MODE);

  // fetch toDos
  useEffect(() => {
    const fetchToDos = async () => {
      const response = await axios.get('http://localhost:5001/api/todos/list', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      dispatch(setToDos(response.data));
    };

    if (user) {
      fetchToDos();
    }
  }, [dispatch, user]);

  const onClickEdit = useCallback(
    async (toDoId) => {
      if (user) {
        const response = await axios.get(`http://localhost:5001/api/todos/get/${toDoId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        setSelectedToDo(response.data);
        setOpenMode(EDIT_MODE);
        setOpenAddDialog(true);
      }
    },
    [user]
  );

  const onSubmitEdit = useCallback(() => {
    setOpenAddDialog(false);
    setSelectedToDo(null);
    setOpenMode('');
  }, []);

  return (
    <Grid container spacing={4}>
      <Grid item xs={7}>
        <Box sx={sxHomePage.header}>
          <Box sx={sxHomePage.title}>
            <Typography variant="h5" fontWeight={600} color="backgroundDark" gutterBottom>
              To Do List
            </Typography>
            <Typography variant="h5" color="backgroundDark" gutterBottom>
              -
            </Typography>
            <Typography variant="h5" color="backgroundMernDark" gutterBottom>
              {`${user?.name} ${user?.surname}`}{' '}
            </Typography>
          </Box>

          <Box>
            <Button
              sx={sxSignin.containedButton}
              variant="contained"
              onClick={() => {
                setOpenAddDialog(true);
                setOpenMode(ADD_MODE);
              }}>
              <Typography fontWeight={600} fontSize={16}>
                Add To Do
              </Typography>
            </Button>
          </Box>
        </Box>
        {toDos &&
          toDos.map((aToDo) => (
            <Fragment key={aToDo._id}>
              <ToDoCard aTodo={{ ...aToDo }} onClickEdit={(toDoId) => onClickEdit(toDoId)} />
            </Fragment>
          ))}
        {(!toDos || toDos.length === 0) && <Alert severity="info">No To Do Items Exist</Alert>}
      </Grid>
      <Grid item xs={5}>
        {openAddDialog && (
          <AddToDo
            closeDialog={() => setOpenAddDialog(false)}
            selectedToDo={selectedToDo}
            openMode={openMode}
            onSubmitEdit={onSubmitEdit}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default HomePage;
