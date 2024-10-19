import mongoose, {Schema, Types} from 'mongoose';
import User from './User';
import {GalleryFields} from '../types';

const GallerySchema = new mongoose.Schema<GalleryFields>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'Пользователь не найден!',
    }
  },
  title: {
    type: String,
    required: [true, 'Поле title обязательно!'],
  },
  image: {
    type: String,
    required: [true, 'Поле image обязательно!'],
  },
});

const Gallery = mongoose.model('Gallery', GallerySchema);
export default Gallery;