import React from 'react';
import {Gallery} from '../../../types';
import {Button, ImageListItem, ImageListItemBar} from '@mui/material';
import {Link, Location, useLocation} from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {API_URL} from '../../../config';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {deleteOneImage, fetchByImageAuthor, fetchGalleryData, fetchOneImage} from '../galleriesThunks';
import {selectUser} from '../../users/usersSlice';
import {selectPreviewImage, setPreview} from '../galleriesSlice';
import PhotoPreview from './PhotoPreview';

interface Props {
  gallery: Gallery;
}

const GalleryList: React.FC<Props> = ({gallery}) => {
  const dispatch = useAppDispatch();
  const location: Location = useLocation();
  const user = useAppSelector(selectUser);
  const showPreview = useAppSelector(selectPreviewImage);

  const handleDeleteGallery = async () => {
    const confirmDelete = confirm('Вы действительно хотите удалить данное изображение?');
    if (confirmDelete) {
      await dispatch(deleteOneImage(gallery._id));
      await dispatch(fetchGalleryData());
      await dispatch(fetchByImageAuthor(gallery.user._id));
    }
  };

  const fetchPreview = async () => {
    await dispatch(fetchOneImage(gallery._id));
    dispatch(setPreview(true));
  };

  const isAuthor = gallery.user._id === user?._id;
  const isAdmin = user?.role === 'admin';
  const shouldShowSubtitle = location.pathname.includes('gallery-by-author') || location.pathname.includes('my-gallery');
  const isMyGallery = location.pathname.includes('my-gallery') || location.pathname.includes('gallery-by-author');

  return (
    <>
      <ImageListItem>
        <img
          onClick={fetchPreview}
          src={`${API_URL}/${gallery.image}?auto=format&fit=crop&w=248&dpr=2`}
          alt={gallery.title}
          loading="lazy"
          style={{width: '100%', height: 'auto', borderRadius: '8px', cursor: 'pointer', position: 'relative'}}
        />
        {(user && ((isAuthor && isMyGallery) || isAdmin)) && (
          <Button onClick={handleDeleteGallery} sx={{position: 'absolute', top: '3px', right: '1px'}}>
            <DeleteOutlineIcon fontSize="medium" sx={{color: '#fff'}}/>
          </Button>
        )}
        <Link to={`/gallery-by-author/${gallery.user._id}`}>
          <ImageListItemBar
            sx={{
              borderRadius: '0 0 8px 8px',
              '&:hover .MuiImageListItemBar-subtitle': {
                textDecoration: 'underline',
                color: '#1976D2',
              },
            }}
            title={gallery.title}
            subtitle={!shouldShowSubtitle ? `Автор: ${gallery.user.displayName}` : null}
          />
        </Link>
      </ImageListItem>
      {showPreview && <PhotoPreview/>}
    </>
  );
};

export default GalleryList;