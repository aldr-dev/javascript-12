import {Link, Location, useLocation, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectFetchImagesByAuthorLoading, selectImagesByAuthor} from '../galleriesSlice';
import {useEffect} from 'react';
import {toast} from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import {fetchByImageAuthor} from '../galleriesThunks';
import {Box, Button, Typography} from '@mui/material';
import {Masonry} from '@mui/lab';
import GalleryList from '../components/GalleryList';
import {selectUser} from '../../users/usersSlice';

const GalleryByAuthor = () => {
  const {id} = useParams();
  const user = useAppSelector(selectUser);
  const location: Location = useLocation();
  const dispatch = useAppDispatch();
  const imagesByAuthorData = useAppSelector(selectImagesByAuthor);
  const fetchGalleryLoading = useAppSelector(selectFetchImagesByAuthorLoading);

  const displayName = imagesByAuthorData.length > 0 ? imagesByAuthorData[0].user.displayName : null;
  const isMyGallery = location.pathname.includes('my-gallery');

  useEffect(() => {
    const fetchByAuthor = async () => {
      const authorId = id || (isMyGallery && user ? user._id : null);
      if (authorId) {
        try {
          await dispatch(fetchByImageAuthor(authorId)).unwrap();
        } catch (error) {
          toast.error('Произошла непредвиденная ошибка. Повторите попытку позже.');
          console.error('Произошла непредвиденная ошибка. Повторите попытку позже. ' + error);
        }
      }
    };

    void fetchByAuthor();
  }, [dispatch, id, isMyGallery, user]);

  return (
    <>
      <Box display={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <Typography sx={{mb: 2}} variant="h5" fontWeight="600" color="#000">Галерея: {displayName || user?.displayName}</Typography>
        {isMyGallery && (
          <Button component={Link} to="/add-new-photo" sx={{mb: 1, backgroundColor: '#E60023', '&:hover': {backgroundColor: '#cb021d'}}} variant="contained">Добавить новое фото</Button>
        )}
      </Box>
      {fetchGalleryLoading ? (<CircularProgress sx={{color: '#000'}}/>) : (
        <>
          {imagesByAuthorData.length === 0 ? (
            <Typography variant="body2" color="#000">Изображения автора отсутствуют, но впереди вас ждет много
              интересного контента! Оставайтесь с нами!</Typography>) : (
            <Masonry columns={{xs: 1, sm: 2, md: 3, lg: 4}} spacing={1.1}>
              {imagesByAuthorData.map((gallery) => (
                <GalleryList key={gallery._id} gallery={gallery}/>
              ))}
            </Masonry>
          )}
        </>
      )}
    </>
  );
};

export default GalleryByAuthor;