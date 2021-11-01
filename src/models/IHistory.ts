export interface ICryptoHistory {
	price: string;
	timestamp: number;
}

export interface IHistoryData {
	change: number;
	history: ICryptoHistory[];
}

export interface IHistory {
	status: string;
	data: IHistoryData;
}
