import {createSlice} from '@reduxjs/toolkit';
import {Gallery, ValidationError} from '../../types';
import {
  deleteOneImage,
  fetchByImageAuthor,
  fetchGalleryData,
  fetchOneImage,
  uploadImageToGallery
} from './galleriesThunks';

interface GalleryState {
  galleriesData: Gallery[];
  oneImage: Gallery | null;
  imagesByAuthor: Gallery[];
  uploadImageLoading: boolean;
  fetchGalleryLoading: boolean;
  fetchOneImageLoading: boolean;
  fetchImagesByAuthorLoading: boolean;
  deleteOneImageLoading: boolean;
  previewImage: boolean;
  uploadError: ValidationError | null;
}

const initialState: GalleryState = {
  galleriesData: [],
  oneImage: null,
  imagesByAuthor: [],
  uploadImageLoading: false,
  fetchGalleryLoading: false,
  fetchOneImageLoading: false,
  fetchImagesByAuthorLoading: false,
  deleteOneImageLoading: false,
  previewImage: false,
  uploadError: null,
};

export const galleriesSlice = createSlice({
  name: 'galleries',
  initialState,
  reducers: {
    setPreview: (state, {payload}) => {
      state.previewImage = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(uploadImageToGallery.pending, (state) => {
      state.uploadImageLoading = true;
      state.uploadError = null;
    });
    builder.addCase(uploadImageToGallery.fulfilled, (state) => {
      state.uploadImageLoading = false;
    });
    builder.addCase(uploadImageToGallery.rejected, (state, {payload: error}) => {
      state.uploadImageLoading = false;
      state.uploadError = error || null;
    });

    builder.addCase(fetchGalleryData.pending, (state) => {
      state.fetchGalleryLoading = true;
    });
    builder.addCase(fetchGalleryData.fulfilled, (state, {payload: galleriesArray}) => {
      state.fetchGalleryLoading = false;
      state.galleriesData = galleriesArray;
    });
    builder.addCase(fetchGalleryData.rejected, (state) => {
      state.fetchGalleryLoading = false;
    });

    builder.addCase(fetchOneImage.pending, (state) => {
      state.fetchOneImageLoading = true;
    });
    builder.addCase(fetchOneImage.fulfilled, (state, {payload: oneImageData}) => {
      state.fetchOneImageLoading = false;
      state.oneImage = oneImageData;
    });
    builder.addCase(fetchOneImage.rejected, (state) => {
      state.fetchOneImageLoading = false;
    });

    builder.addCase(fetchByImageAuthor.pending, (state) => {
      state.fetchImagesByAuthorLoading = true;
    });
    builder.addCase(fetchByImageAuthor.fulfilled, (state, {payload: imageAuthorData}) => {
      state.fetchImagesByAuthorLoading = false;
      state.imagesByAuthor = imageAuthorData;
    });
    builder.addCase(fetchByImageAuthor.rejected, (state) => {
      state.fetchImagesByAuthorLoading = false;
    });

    builder.addCase(deleteOneImage.pending, (state) => {
      state.deleteOneImageLoading = true;
    });
    builder.addCase(deleteOneImage.fulfilled, (state) => {
      state.deleteOneImageLoading = false;
    });
    builder.addCase(deleteOneImage.rejected, (state) => {
      state.deleteOneImageLoading = false;
    });
  },
  selectors: {
    selectGalleriesData: (state) => state.galleriesData,
    selectOneImage: (state) => state.oneImage,
    selectImagesByAuthor: (state) => state.imagesByAuthor,
    selectUploadImageLoading: (state) => state.uploadImageLoading,
    selectFetchGalleryLoading: (state) => state.fetchGalleryLoading,
    selectFetchOneImageLoading: (state) => state.fetchOneImageLoading,
    selectFetchImagesByAuthorLoading: (state) => state.fetchImagesByAuthorLoading,
    selectDeleteOneImageLoading: (state) => state.deleteOneImageLoading,
    selectPreviewImage: (state) => state.previewImage,
    selectUploadError: (state) => state.uploadError,
  },
});

export const galleriesReducer = galleriesSlice.reducer;
export const {setPreview} = galleriesSlice.actions;
export const {
  selectGalleriesData,
  selectOneImage,
  selectImagesByAuthor,
  selectUploadImageLoading,
  selectFetchGalleryLoading,
  selectFetchOneImageLoading,
  selectFetchImagesByAuthorLoading,
  selectPreviewImage,
  selectUploadError,
} = galleriesSlice.selectors;