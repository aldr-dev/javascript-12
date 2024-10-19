import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {useNavigate} from 'react-router-dom';
import {selectUser} from '../../users/usersSlice';
import {selectUploadError, selectUploadImageLoading} from '../galleriesSlice';
import {GalleryMutation} from '../../../types';
import {uploadImageToGallery} from '../galleriesThunks';
import {Avatar, Box, Grid, TextField, Typography} from '@mui/material';
import FileInput from '../../../UI/FileInput/FileInput';
import {LoadingButton} from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import ImageIcon from '@mui/icons-material/Image';
import {toast} from 'react-toastify';

const GalleryForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const error = useAppSelector(selectUploadError);
  const loading = useAppSelector(selectUploadImageLoading);

  const [resetFileName, setResetFileName] = useState(false);
  const [state, setState] = useState<GalleryMutation>({
    title: '',
    image: null,
  });

  const getFieldError = (fieldName: string) => {
    return error?.errors[fieldName]?.message;
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleResetFileName = (status: boolean) => {
    setResetFileName(status);
  };

  const onChangeFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = event.target;
    const value = files && files[0] ? files[0] : null;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (user) {
        if (state.title.trim().length !== 0 && state.image !== null) {
          await dispatch(uploadImageToGallery(state)).unwrap();
          setResetFileName(true);
          setState({
            title: '',
            image: null,
          });
          navigate('/');
          toast.success('Изображение было успешно загружено!');
        }
      }
    } catch (error) {
      console.error('Произошла ошибка при попытке создания записи. Пожалуйста, попробуйте позже. ' + error);
    }
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: '#fff',
          padding: '32px',
          borderRadius: '12px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
        }}>
        <Box sx={{display: 'flex', alignItems: 'center', gap: 1.3, mb: 3}}>
          <Avatar sx={{bgcolor: '#E60023', width: 56, height: 56}}>
            <ImageIcon fontSize="large"/>
          </Avatar>
          <Typography component="h1" color="#000" fontWeight="600" variant="h5">
            Загрузить новую фотографию
          </Typography>
        </Box>
        <Box component="form" onSubmit={submitFormHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={inputChangeHandler}
                label="Заголовок"
                id="title"
                name="title"
                required
                value={state.title}
                error={Boolean(getFieldError('title'))}
                helperText={getFieldError('title')}
              />
            </Grid>
            <Grid item>
              <FileInput
                onChange={onChangeFileInput}
                label="Изображение"
                name="image"
                resetFileName={resetFileName}
                handleResetFileName={handleResetFileName}
              />
            </Grid>
          </Grid>
          <LoadingButton
            sx={{
              mt: 2,
              color: '#fff',
              background: '#E60023',
              '&:hover': {
                background: '#cb021d',
              },
              '&.Mui-disabled': {
                background: '#b2b2b2',
                color: '#757575',
              }
            }}
            color="primary"
            type="submit"
            disabled={state.title.trim().length === 0 || state.image === null}
            loading={loading}
            loadingPosition="start"
            startIcon={<SendIcon/>}
            variant="contained">
            <span>Отправить</span>
          </LoadingButton>
        </Box>
      </Box>
    </>
  );
};

export default GalleryForm;