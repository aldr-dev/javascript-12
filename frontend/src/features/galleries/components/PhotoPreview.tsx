import {Box, CircularProgress, IconButton} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import CancelIcon from '@mui/icons-material/Cancel';
import {selectFetchOneImageLoading, selectOneImage, selectPreviewImage, setPreview} from '../galleriesSlice';
import {API_URL} from '../../../config';
import {useLocation} from 'react-router-dom';
import {useCallback, useEffect} from 'react';

const PhotoPreview = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const photo = useAppSelector(selectOneImage);
  const isLoading = useAppSelector(selectFetchOneImageLoading);
  const preview = useAppSelector(selectPreviewImage);

  let image;

  if (photo) {
    image = `${API_URL}/${photo.image}`;
  }

  const handleClose = useCallback(() => {
    dispatch(setPreview(false));
  }, [dispatch]);

  useEffect(() => {
    return () => {
      if (preview) {
        handleClose();
      }
    };
  }, [location, preview, handleClose]);

  return (
    preview && (
      <Box
        sx={{
          position: 'fixed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2,
        }}>
        {photo ? (
          <Box
            sx={{
              height: '700px',
              overflow: 'hidden',
              borderRadius: '12px',
              position: 'relative',
            }}>
            <img
              src={image}
              alt={photo.title}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <IconButton
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: 'white',
              }}>
              <CancelIcon fontSize="large"/>
            </IconButton>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {isLoading && <CircularProgress/>}
          </Box>
        )}
      </Box>
    )
  );
};

export default PhotoPreview;