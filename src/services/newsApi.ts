// import axios, { AxiosError } from 'axios';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { INews } from '../models/INews';
const newsApiHeaders = {
	'x-bingapis-sdk': 'true',
	'x-rapidapi-host': process.env.REACT_APP_NEWS_RAPIDAPI_HOST,
	'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
};

const createRequest = (url: string) => ({ url, headers: newsApiHeaders });

export const newsApi = createApi({
	reducerPath: 'newsApi',
	baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_NEWS_API_URL }),
	endpoints: (builder) => ({
		getNews: builder.query<INews, any>({
			query: ({ newsCategory, count }) =>
				createRequest(
					`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
				)
		})
	})
});

export const { useGetNewsQuery } = newsApi;
