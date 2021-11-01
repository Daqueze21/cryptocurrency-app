export interface ICoin {
	approvedSupply: true;
	change: number;
	circulatingSupply: number;
	color: string;
	confirmedSupply: true;
	description: string;
	firstSeen: number;
	history: string[];
	iconUrl: string;
	id: number;
	listedAt: number;
	marketCap: number;
	name: string;
	numberOfExchanges: number;
	numberOfMarkets: number;
	penalty: false;
	price: string;
	rank: number;
	slug: string;
	symbol: string;
	totalSupply: number;
	type: string;
	uuid: string;
	volume: number;
	links: ILinks[];
	allTimeHigh: IAllTimeHigh;
}

export interface IAllTimeHigh {
	price: string;
}

export interface ILinks {
	name: string;
	type: string;
	url: string;
}

export interface IBase {
	symbol: string;
	sign: string;
}

export interface ICryptoInfoData {
	base: IBase;
	coin: ICoin;
}
export interface ICryptoInfo {
	status: string;
	data: ICryptoInfoData;
}
