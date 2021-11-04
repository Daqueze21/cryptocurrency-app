export interface IExchange {
	id: string;
	rank: number;
	iconUrl: string;
	volume: number;
	numberOfMarkets: number;
	marketShare: number;
	description: string;
	name: string;
}

export interface IExchangesData {
	exchanges: IExchange[];
}

export interface IExchanges {
	status: string;
	data: IExchangesData;
}
