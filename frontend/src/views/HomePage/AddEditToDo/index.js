import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { sxSignin as sxAddToDo } from './style';
import tags from './tags';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setToDos } from '../../../redux/slices/toDosSlice';
import { ADD_MODE, EDIT_MODE } from '../../../enums/openModes';

const AddToDo = (props) => {
  const { closeDialog, openMode, selectedToDo, onSubmitEdit } = props;
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const [toDoData, setToDoData] = useState({
    title: '',
    dueDate: '',
    tags: []
  });

  useEffect(() => {
    if (openMode === ADD_MODE) {
      setToDoData({
        title: '',
        dueDate: '',
        tags: []
      });
    } else if (openMode === EDIT_MODE) {
      setToDoData({
        title: selectedToDo.title,
        dueDate: selectedToDo.dueDate,
        tags: selectedToDo.tags
      });
    }
  }, [selectedToDo, openMode]);

  const handleChange = (name) => (event) => {
    setToDoData({ ...toDoData, [name]: event.target.value });
  };

  const submitDisabled = useMemo(() => !toDoData.title || !toDoData.dueDate, [toDoData]);

  const dialogTitle = useMemo(() => {
    switch (openMode) {
      case ADD_MODE: {
        return 'Create New To Do Item';
      }
      case EDIT_MODE: {
        return `Edit - ${selectedToDo.title}`;
      }
      default: {
        return 'Undefined Title';
      }
    }
  }, [openMode, selectedToDo]);

  const onSubmit = useCallback(async () => {
    let apiHeaders = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`
    };
    let apiPath = '';
    let apiPayload = null;
    let axiosApi = null;

    switch (openMode) {
      case ADD_MODE: {
        apiPath = 'http://localhost:5001/api/todos/create';
        apiPayload = { ...toDoData };
        axiosApi = () => {
          return axios.post(apiPath, apiPayload, {
            headers: apiHeaders
          });
        };
        break;
      }
      case EDIT_MODE: {
        apiPath = `http://localhost:5001/api/todos/update/${selectedToDo._id}`;
        apiPayload = { ...selectedToDo, ...toDoData };
        axiosApi = () => {
          return axios.patch(apiPath, apiPayload, {
            headers: apiHeaders
          });
        };
        break;
      }
      default: {
        break;
      }
    }
    await axiosApi();
    const listResponse = await axios.get('http://localhost:5001/api/todos/list', {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    });
    dispatch(setToDos(listResponse.data));
    setToDoData({
      title: '',
      dueDate: '',
      tags: []
    });
    if (openMode === EDIT_MODE) {
      onSubmitEdit();
    }
  }, [openMode, user, toDoData, selectedToDo, dispatch, onSubmitEdit]);
  return (
    <Paper elevation={6} sx={sxAddToDo.paper}>
      <Typography variant="h5" gutterBottom sx={{ color: 'white' }}>
        {dialogTitle}
      </Typography>
      <Box sx={sxAddToDo.inputWrapper}>
        <TextField
          label="Title"
          type="text"
          value={toDoData.title}
          onChange={handleChange('title')}
          sx={sxAddToDo.textField}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Due Date"
          type="text"
          value={toDoData.dueDate}
          sx={sxAddToDo.textField}
          onChange={handleChange('dueDate')}
          margin="normal"
          fullWidth
        />
        <FormControl fullWidth sx={{ mt: 1 }}>
          <InputLabel id="tag-select"> Tags (Optional) </InputLabel>
          <Select
            multiple
            labelId="select-tags"
            type="text"
            label="Tags (Optional)"
            value={toDoData.tags}
            sx={sxAddToDo.select}
            onChange={handleChange('tags')}
            renderValue={(selected) => {
              if (!selected || selected.length === 0) {
                return <em>Select tags</em>;
              }
              return selected.join(', ');
            }}
            margin="normal"
            fullWidth>
            {tags.map((tag, index) => (
              <MenuItem key={index} value={tag}>
                {tag}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={sxAddToDo.buttonsWrapper}>
        <Button variant="outlined" sx={sxAddToDo.outlinedButton} onClick={closeDialog}>
          <Typography color="backgroundMern" fontWeight={600} fontSize={16}>
            Cancel
          </Typography>
        </Button>
        <Button
          sx={sxAddToDo.containedButton}
          variant="contained"
          onClick={onSubmit}
          disabled={submitDisabled}>
          <Typography fontWeight={600} fontSize={16}>
            Submit
          </Typography>
        </Button>
      </Box>
    </Paper>
  );
};
export default AddToDo;
