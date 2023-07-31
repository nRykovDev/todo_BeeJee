import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './slices/todos.slice';
import userReducer from './slices/users.slice';
import pageReducer from './slices/pageStates.slice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import hardSet from 'redux-persist/es/stateReconciler/hardSet';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducers = {
  todosReducer: persistReducer(persistConfig, todosReducer),
  userReducer: persistReducer(persistConfig, userReducer),
  pageReducer: persistReducer(persistConfig, pageReducer),
  stateReconciler: hardSet,
};

export const store = configureStore({
  reducer: {
    todosReducer: persistedReducers.todosReducer,
    userReducer: persistedReducers.userReducer,
    pageReducer: persistedReducers.pageReducer,
  },
  middleware: [thunk],
});

export const persistor = persistStore(store);
