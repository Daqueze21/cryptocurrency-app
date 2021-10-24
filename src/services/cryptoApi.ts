// import axios, { AxiosError } from 'axios';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { ICoins } from '../models/ICoin';

const cryptoApiHeaders = {
	'x-rapidapi-host': process.env.REACT_APP_CRYPTO_RAPIDAPI_HOST,
	'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
};

const createRequest = (url: string, limit: string) => ({
	url,
	headers: cryptoApiHeaders,
	params: { limit: limit }
});

export const cryptoApi = createApi({
	reducerPath: 'cryptoApi',
	baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_CRYPTO_API_URL }),
	endpoints: (builder) => ({
		getCryptos: builder.query<any, string>({
			query: (limit) => createRequest(`/coins`, limit)
		})
	})
});

export const { useGetCryptosQuery } = cryptoApi;
