import React from 'react';
// import { Link } from 'react-router-dom';
import millify from 'millify';

import { Typography, Row, Col, Statistic } from 'antd';
import { useGetCryptosQuery } from '../../services/cryptoApi';

const { Title } = Typography;

export const Homepage = () => {
	// const { status } = useAppSelector((state: RootState) => state.searchReducer);
	const { data, error, isLoading } = useGetCryptosQuery('10');
	if (isLoading) return <div className="loader">...Loading</div>;
	if (error) return <div className="error">something went wrong</div>;
	
	const { total, total24hVolume, totalExchanges, totalMarketCap, totalMarkets } = data?.data?.stats;

	return (
		<>
			<Title level={2}>Global Crypto Stats</Title>
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
			{/* <div style={{ padding: 24, minHeight: 360 }}>Homepage</div>; */}
		</>
	);
};

export default Homepage;
