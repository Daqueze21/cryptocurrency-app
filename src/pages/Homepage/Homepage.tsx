import React from 'react';
import { Link } from 'react-router-dom';
import millify from 'millify';

import { Typography, Row, Col, Statistic, Divider } from 'antd';
import { useGetCryptosQuery } from '../../services/cryptoApi';
import styles from './Homepage.module.scss';
import Cryptocurrencies from '../Cryptocurrencies/Cryptocurrencies';
import News from '../News/News';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';

const { Title } = Typography;

export const Homepage = () => {
	// const { status } = useAppSelector((state: RootState) => state.searchReducer);
	const { data, error, isLoading } = useGetCryptosQuery('10');
	if (isLoading) return <Loader />;

	if (error) {
		return <Error />;
	}

	const { total, total24hVolume, totalExchanges, totalMarketCap, totalMarkets } = data?.data?.stats;

	return (
		<>
			<Title level={2}>Global Crypto Stats</Title>
			<Divider />
			<Row>
				<Col span={12}>
					<Statistic title="Total Cryptocurrencies:" value={total} />
				</Col>
				<Col span={12}>
					<Statistic title="Total Exchanges:" value={millify(totalExchanges)} />
				</Col>
				<Col span={12}>
					<Statistic title="Total Market Cap:" value={millify(totalMarketCap)} />
				</Col>
				<Col span={12}>
					<Statistic title="24h Volume" value={millify(total24hVolume)} />
				</Col>
				<Col span={12}>
					<Statistic title="Total Markets" value={millify(totalMarkets)} />
				</Col>
			</Row>

			<Divider />

			<div className={styles.home_section_wrapper}>
				<Title level={2} className={styles.home_section_title}>
					Latest News
				</Title>
				<Title level={3} className={styles.home_section_more}>
					<Link to="/news">Show more</Link>
				</Title>
			</div>

			<News simplified />

			<Divider />

			<div className={styles.home_section_wrapper}>
				<Title level={2} className={styles.home_section_title}>
					Top 10 Cryptos
				</Title>
				<Title level={3} className={styles.home_section_more}>
					<Link to="/cryptocurrencies">Show more</Link>
				</Title>
			</div>

			<Cryptocurrencies simplified />

			<Divider />
		</>
	);
};

export default Homepage;
