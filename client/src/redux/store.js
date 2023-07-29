import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './slices/todos.slice';
import userReducer from './slices/users.slice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducers = {
  todosReducer: persistReducer(persistConfig, todosReducer),
  userReducer: persistReducer(persistConfig, userReducer),
};

export const store = configureStore({
  reducer: {
    todosReducer: persistedReducers.todosReducer,
    userReducer: persistedReducers.userReducer,
  },
});

export const persistor = persistStore(store);
