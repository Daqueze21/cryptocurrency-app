import { ICoin, IBase } from './ICoin';

export interface IAllTimeHigh {
	price: string;
	timestamp: number;
}

export interface ILinks {
	name: string;
	type: string;
	url: string;
}

export interface IGlobalStats {
	total: number;
	totalMarkets: number;
	totalExchanges: number;
	totalMarketCap: number;
	total24hVolume: number;
	offset: number;
	limit: number;
	order: string;
	base: string;
}

export interface ICoinsData {
	stats: IGlobalStats;
	base: IBase;
	coins: ICoin[];
}

export interface ICoins {
	status: string;
	data: ICoinsData;
}
