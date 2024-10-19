import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectFetchGalleryLoading, selectGalleriesData} from '../galleriesSlice';
import {toast} from 'react-toastify';
import {Typography} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import {fetchGalleryData} from '../galleriesThunks';
import {Masonry} from '@mui/lab';
import GalleryList from '../components/GalleryList';

const Home = () => {
  const dispatch = useAppDispatch();
  const galleriesData = useAppSelector(selectGalleriesData);
  const galleryFetchingLoader = useAppSelector(selectFetchGalleryLoading);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        await dispatch(fetchGalleryData()).unwrap();
      } catch (error) {
        toast.error('Произошла непредвиденная ошибка. Повторите попытку позже.');
        console.error('Произошла непредвиденная ошибка. Повторите попытку позже. ' + error);
      }
    };

    void fetchGalleries();
  }, [dispatch]);

  return (
    <>
      {galleryFetchingLoader ? (<CircularProgress sx={{color: '#000'}}/>) : (
        <>
          {galleriesData.length === 0 ? (
            <Typography variant="body2" color="#000">Изображения отсутствуют, но впереди вас ждет много интересного
              контента! Оставайтесь с нами!</Typography>) : (
            <Masonry columns={{xs: 1, sm: 2, md: 3, lg: 4}} spacing={1.1}>
              {galleriesData.map((gallery) => (
                <GalleryList key={gallery._id} gallery={gallery}/>
              ))}
            </Masonry>
          )}
        </>
      )}
    </>
  );
};

export default Home;