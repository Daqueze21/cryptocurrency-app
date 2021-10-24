export interface ICoin {
	id: number;
	name: string;
	description: string;
	iconUrl: string;
	marketCap: number;
	price: number;
	totalSupply: number;
	change: number;
	rank: number;
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
	coins: ICoin[];
}

export interface ICoins {
	status: string;
	data: ICoinsData;
}
