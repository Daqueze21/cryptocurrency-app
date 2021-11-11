// import axios, { AxiosError } from 'axios';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICryptoInfo } from '../models/ICoin';
import { IHistory } from '../models/IHistory';
import { ICoins } from '../models/ICoins';
import { IExchanges } from '../models/IExchanges';

// const cryptoApiHeaders = {
// 	'x-rapidapi-host': process.env.REACT_APP_CRYPTO_RAPIDAPI_HOST,
// 	'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
// };
const cryptoApiHeaders = {
	'x-access-token': process.env.REACT_APP_CRYPTO_API_KEY
};

const createRequest = (url: string) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
	reducerPath: 'cryptoApi',
	baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_CRYPTO_API_NEW_URL }),
	endpoints: (builder) => ({
		getCryptos: builder.query<any, string>({
			query: (limit) => createRequest(`/coins?limit=${limit}`)
		}),
		getCryptoInfo: builder.query<ICryptoInfo, string>({
			query: (coinId) => createRequest(`/coin/${coinId}`)
		}),
		getCryptoHistory: builder.query<IHistory, any>({
			query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history/${timeperiod}`)
		}),
		getExchanges: builder.query<IExchanges, any>({
			query: () => createRequest('/exchanges')
		})
	})
});

export const {
	useGetCryptosQuery,
	useGetCryptoInfoQuery,
	useGetCryptoHistoryQuery,
	useGetExchangesQuery
} = cryptoApi;
