export type ICoin = {
	id: number;
	name: string;
	description: string;
	iconUrl: string;
	marketCap: string;
	volume: string;
	price: string;
	totalSupply: string;
	change: number;
};

export type IGlobalStats = {
	total: number;
	totalMarkets: number;
	totalExchanges: number;
	totalMarketCap: number;
	total24hVolume: number;
	offset: number;
	limit: number;
	order: string;
	base: string;
};

export type ICoinsData = {
	stats: IGlobalStats;
	coins: ICoin[];
};

export interface ICoins {
	status: string;
	data: ICoinsData;
}
