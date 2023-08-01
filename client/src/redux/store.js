import { combineReducers, configureStore } from '@reduxjs/toolkit';
import todosReducer from './slices/todos.slice';
import userReducer from './slices/users.slice';
import pageReducer from './slices/pageStates.slice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import hardSet from 'redux-persist/es/stateReconciler/hardSet';

const rootReducer = combineReducers({
  todosReducer,
  userReducer,
  pageReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    persistedReducer,
  },
  middleware: [thunk],
});

export const persistor = persistStore(store);
