type Thumbnail = {
	contentUrl: string;
};

interface IImage {
	thumbnail: Thumbnail;
}

interface IProvider {
	image: IImage;
	name: string;
}

export interface INewsData {
	datePublished: string;
	description: string;
	provider: IProvider[];
	url: string;
	name: string;
	image: IImage;
}

export interface INews {
	value: INewsData[];
}
