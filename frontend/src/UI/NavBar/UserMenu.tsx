import React, {useState} from 'react';
import {Avatar, Button, Grid, Menu, MenuItem, Typography} from '@mui/material';
import {User} from '../../types';
import {Link} from 'react-router-dom';
import PortraitIcon from '@mui/icons-material/Portrait';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutIcon from '@mui/icons-material/Logout';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {useAppDispatch} from '../../app/hooks';
import {logout} from '../../features/users/usersThunks';
import {API_URL} from '../../config';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Grid item>
      <Button sx={{display: 'flex', alignItems: 'center', '&:hover': {backgroundColor: 'transparent'}}}
              onClick={handleClick}>
        <Avatar alt="Avatar"
                src={user.avatar && (user.avatar.includes('images') || user.avatar.includes('fixtures') ? `${API_URL}/${user.avatar}` : user.avatar)}
                sx={{
                  width: 45,
                  height: 45,
                  border: '3px solid #eee',
                  cursor: 'pointer',
                  borderRadius: '50px',
                  marginRight: '10px'
                }}/>
        <Typography color="#000" fontWeight="bold" variant="body2">Привет, {user.displayName}</Typography>
        <KeyboardArrowDownIcon sx={{color: '#000'}}/>
      </Button>

      <Menu open={isOpen} anchorEl={anchorEl} onClose={handleClose} keepMounted>
        <MenuItem><PortraitIcon/>&nbsp;{user.username}</MenuItem>
        <hr/>
        <MenuItem to="/my-gallery" component={Link}><PhotoLibraryIcon/>&nbsp;Моя галерея</MenuItem>
        <MenuItem to="/add-new-photo" component={Link}><UploadFileIcon/>&nbsp;Загрузить новое фото</MenuItem>
        <MenuItem onClick={handleLogout}><LogoutIcon/>&nbsp;Выйти</MenuItem>
      </Menu>
    </Grid>
  );
};

export default UserMenu;