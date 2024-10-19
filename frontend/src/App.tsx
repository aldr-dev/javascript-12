import {Container} from '@mui/material';
import NavBar from './UI/NavBar/NavBar';
import {Route, Routes} from 'react-router-dom';
import PageNotFound from './UI/PageNotFound/PageNotFound';
import Register from './features/users/Register';
import Login from './features/users/Login';
import {useAppSelector} from './app/hooks';
import {selectUser} from './features/users/usersSlice';
import ProtectedRoute from './UI/ProtectedRoute/ProtectedRoute';
import GalleryForm from './features/galleries/components/GalleryForm';
import Home from './features/galleries/containers/Home';
import GalleryByAuthor from './features/galleries/containers/GalleryByAuthor';

const App = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <NavBar/>
      <Container maxWidth="lg" sx={{mb: 3}}>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/gallery-by-author/:id" element={<GalleryByAuthor/>}/>
          <Route path="/my-gallery/" element={
            <ProtectedRoute isAllowed={user && (user.role === 'user' || user.role === 'admin')}>
              <GalleryByAuthor/>
            </ProtectedRoute>
          }/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/my-gallery" element={''}/>
          <Route path="/add-new-photo" element={
            <ProtectedRoute isAllowed={user && (user.role === 'user' || user.role === 'admin')}>
              <GalleryForm/>
            </ProtectedRoute>
          }/>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </Container>
    </>
  );
};

export default App;