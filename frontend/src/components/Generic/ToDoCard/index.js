import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Chip,
  Tooltip,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { sxToDoCard } from './style';
import { Delete as IconDelete, Check as IconCheck, Edit as IconEdit } from '@mui/icons-material';
import { useCallback } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setToDos } from '../../../redux/slices/toDosSlice';
import ICON_MERN from '../../../assets/images/mern.png';

const ToDoCard = (props) => {
  const { aTodo, onClickEdit } = props;
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const onDelete = useCallback(async () => {
    await axios.delete(`http://localhost:5001/api/todos/delete/${aTodo._id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    });
    const listResponse = await axios.get('http://localhost:5001/api/todos/list', {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    });
    dispatch(setToDos(listResponse.data));
  }, [aTodo, dispatch, user]);

  const onCheckItemDone = useCallback(
    async (checked) => {
      await axios.patch(
        `http://localhost:5001/api/todos/update/${aTodo._id}`,
        { ...aTodo, isDone: checked },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`
          }
        }
      );
      const listResponse = await axios.get('http://localhost:5001/api/todos/list', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      dispatch(setToDos(listResponse.data));
    },
    [aTodo, user, dispatch]
  );

  return (
    <Card sx={sxToDoCard.card}>
      <CardMedia
        component="img"
        sx={{ width: 110, padding: '16px' }}
        src={aTodo.image ?? ICON_MERN}
        alt="Paella dish"
      />
      <CardContent sx={sxToDoCard.cardContent}>
        <Box
          width="100%"
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center">
          <Box>
            <Box dislay="flex" flexDirection="row" gap={0}>
              <Typography sx={sxToDoCard.name}>
                {aTodo.title}
                {aTodo.isDone && <IconCheck color="success" />}
              </Typography>
            </Box>

            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {`Due Date: ${aTodo.dueDate}`}
            </Typography>
            <Box display="flex" gap={2}>
              {aTodo.tags &&
                aTodo.tags.map((tag) => (
                  <Chip
                    label={tag}
                    key={tag}
                    sx={{ position: 'relative', top: '12px', mb: '4px' }}
                    color="primary"
                    variant="outlined"
                  />
                ))}
            </Box>
          </Box>
        </Box>
        <Box sx={sxToDoCard.cardButtons}>
          <Tooltip title="Edit To Do">
            <IconButton
              size="small"
              sx={sxToDoCard.editButton}
              onClick={() => onClickEdit(aTodo._id)}>
              <IconEdit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete To Do">
            <IconButton size="small" sx={sxToDoCard.deleteButton} onClick={onDelete}>
              <IconDelete />
            </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ position: 'absolute', bottom: 10, right: 24 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={aTodo.isDone ?? false}
                onChange={(e) => onCheckItemDone(e.target.checked)}
              />
            }
            label="Set as done"
            labelPlacement="start"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ToDoCard;
