import { combineReducers, configureStore, Middleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import userSlice from './reducer/userSlice';

const persistConfig = {
    key: 'root',
    storage,
  };
  
const rootReducer = combineReducers({ 
    user: userSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof store.getState>;

const middleware: Middleware[] = [thunk];

export const store = configureStore({
    reducer: persistedReducer,
    middleware,
});
  
export const persistor = persistStore(store);