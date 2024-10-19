import {combineReducers, configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore} from 'redux-persist';
import {usersReducer} from '../features/users/usersSlice';
import {galleriesReducer} from '../features/galleries/galleriesSlice';

const userPersistConfig = {
  key: 'pinterest:users',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  users: persistReducer(userPersistConfig, usersReducer),
  galleries: galleriesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }
    });
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;