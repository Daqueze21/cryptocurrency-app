import { combineReducers, configureStore, Action } from '@reduxjs/toolkit';
// import { ThunkAction } from 'redux-thunk';
// import rootReducer, { RootState } from './reducers/store';

import searchReducer from './reducers/Crypto_Slice';
import { cryptoApi } from '../services/cryptoApi';

const rootReducer = combineReducers({
	searchReducer,
	[cryptoApi.reducerPath]: cryptoApi.reducer
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
