import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {isAxiosError} from 'axios';
import {Gallery, GalleryMutation, ValidationError} from '../../types';
import {RootState} from '../../app/store';

export const uploadImageToGallery = createAsyncThunk<void, GalleryMutation, { rejectValue: ValidationError }>(
  'galleries/uploadImageToGallery',
  async (galleryData, {rejectWithValue}) => {
    try {
      const formData = new FormData();
      formData.append('title', galleryData.title);

      if (galleryData.image) {
        formData.append('image', galleryData.image);
      }

      await axiosApi.post<GalleryMutation>('/galleries', formData);
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }

      throw error;
    }
  },
);

export const fetchGalleryData = createAsyncThunk<Gallery[], void, { state: RootState }>(
  'galleries/fetchGalleryData', async () => {
    const {data: imageData} = await axiosApi.get<Gallery[]>('/galleries');
    return imageData;
  });

export const fetchOneImage = createAsyncThunk<Gallery, string, { state: RootState }>(
  'galleries/fetchOneImage', async (id) => {
    const {data: image} = await axiosApi.get<Gallery>(`/galleries/${id}`);
    return image;
  });

export const fetchByImageAuthor = createAsyncThunk<Gallery[], string, { state: RootState }>(
  'galleries/fetchByImageAuthor', async (id) => {
    const {data: imagesAuthor} = await axiosApi.get<Gallery[]>(`/galleries?author=${id}`);
    return imagesAuthor;
  });

export const deleteOneImage = createAsyncThunk<void, string, { state: RootState }>(
  'galleries/deleteOneImage', async (id) => {
    await axiosApi.delete(`/galleries/${id}`);
  });