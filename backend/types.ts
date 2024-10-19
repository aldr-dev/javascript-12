import mongoose, {Model} from 'mongoose';

export interface UserFields {
  username: string;
  password: string;
  token: string;
  role: string;
  avatar: string | null;
  displayName: string;
  googleID?: string;
}

export interface GalleryFields {
  user: mongoose.Types.ObjectId;
  title: string;
  image: string | null;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;

  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;