import React, { FC, useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetNewsQuery } from '../../services/newsApi';
import { useGetCryptosQuery } from '../../services/cryptoApi';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';
import styles from './News.module.scss';
import { ICoin } from '../../models/ICoin';
import { INewsData } from '../../models/INews';

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

interface NewsProps {
	simplified: boolean;
}

export const News: FC<NewsProps> = ({ simplified }) => {
	const [newsCategory, setNewsCategory] = useState<string>('Cryptocurrency');
	const { data: news, isLoading } = useGetNewsQuery({ newsCategory, count: simplified ? 6 : 12 });
	const { data } = useGetCryptosQuery('80');

	if (isLoading) return <Loader />;
	if (news && data) {
		const { value } = news;
		const { coins } = data?.data;

		return (
			<Row gutter={[24, 24]}>
				{!simplified && (
					<Col span={24}>
						<Select
							showSearch
							defaultValue="Cryptocurency"
							className={styles.news_select}
							placeholder="Select a Crypto"
							optionFilterProp="children"
							onChange={(selectedValue) => setNewsCategory(selectedValue)}
						>
							<Option value="Cryptocurency">Cryptocurrency</Option>
							{coins.map((crypto: ICoin) => (
								<Option key={crypto.id} value={crypto.name}>
									{crypto.name}
								</Option>
							))}
						</Select>
					</Col>
				)}
				{value.map((newsValue: INewsData, i: number) => (
					<Col xs={24} sm={12} lg={8} key={i}>
						<Card hoverable className={styles.news_card}>
							<a href={newsValue.url} target="_blank" rel="noreferrer">
								<div className={styles.news_image_container}>
									<Title className={styles.news_title} level={4}>
										{newsValue.name}
									</Title>
									<img src={newsValue?.image?.thumbnail?.contentUrl || demoImage} alt="News img" />
								</div>
								<p className={styles.news_description}>{newsValue.description}</p>
								<div className={styles.provider_container}>
									<div>
										<Avatar
											src={newsValue?.provider[0]?.image?.thumbnail?.contentUrl || demoImage}
											alt="provider avatar"
										/>
										<Text className={styles.provider_name}>{newsValue.provider[0]?.name}</Text>
									</div>
									<Text>{moment(newsValue.datePublished).startOf('second').fromNow()}</Text>
								</div>
							</a>
						</Card>
					</Col>
				))}
			</Row>
		);
	}

	return <Error />;
};

export default News;
