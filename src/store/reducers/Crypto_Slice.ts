import { createSlice } from '@reduxjs/toolkit';
// import axios, { AxiosError } from 'axios';
// import { AppThunk } from '../index';

export type TSearchState = {
	status: string;
};

const initialState: TSearchState = {
	status: 'Pending'
};

// reducer
const searchSlice = createSlice({
	name: 'Search',
	initialState,
	reducers: {}
});

export default searchSlice.reducer;
