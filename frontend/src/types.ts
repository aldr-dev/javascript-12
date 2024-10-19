export interface User {
  _id: string;
  username: string;
  token: string;
  role: string;
  displayName: string;
  avatar: string;
}

export interface RegisterMutation {
  username: string;
  displayName: string;
  password: string;
  avatar: File | null;
}

export interface GalleryMutation {
  title: string;
  image: File | null;
}

export interface Gallery {
  _id: string;
  user: {
    _id: string;
    displayName: string;
  };
  title: string;
  image: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}