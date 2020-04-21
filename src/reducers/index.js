import {combineReducers, createStore, applyMiddleware} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import appStatus from './appStatus';
import user from './user';
import {AsyncStorage} from 'react-native';
import logger from 'redux-logger';

const reducers = combineReducers({
  appStatus,
  user,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer, applyMiddleware(logger));
const persistor = persistStore(store);

export {store, persistor};
