import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select, Divider } from 'antd';
import {
	TransactionOutlined,
	DollarCircleOutlined,
	FundOutlined,
	ExclamationCircleOutlined,
	StopOutlined,
	TrophyOutlined,
	CheckOutlined,
	NumberOutlined,
	ThunderboltOutlined,
	MoneyCollectOutlined,
	PayCircleOutlined
} from '@ant-design/icons';
import { useGetCryptoHistoryQuery, useGetCryptoInfoQuery } from '../../services/cryptoApi';
import { Chart } from '../../components/Chart/Chart';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';

import styles from './CryptoInfo.module.scss';
import { Cryptostats } from '../../components/Cryptostats/Cryptostats';
const { Title } = Typography;
const { Option } = Select;

type CoinParams = {
	coinId: string;
};

export const CryptoInfo = () => {
	const { coinId } = useParams<CoinParams>();
	const [timeperiod, setTimeperiod] = useState('7d');
	const { data, isLoading } = useGetCryptoInfoQuery(coinId);
	const { data: cryptoHistory } = useGetCryptoHistoryQuery({ coinId, timeperiod });

	const cryptoHistoryData = cryptoHistory?.data;

	if (isLoading) return <Loader />;
	if (data && cryptoHistory) {
		const {
			rank,
			name,
			slug,
			description,
			links,
			price,
			volume,
			marketCap,
			allTimeHigh,
			numberOfMarkets,
			numberOfExchanges,
			approvedSupply,
			totalSupply,
			circulatingSupply,
			iconUrl
		} = data.data.coin;
		console.log('history', cryptoHistoryData);
		const { history, change } = cryptoHistory?.data;
		const time = ['24h', '7d', '30d', '1y', '5y'];
		const stats = [
			{
				title: 'Price to USD',
				value: `$ ${price && millify(+price)}`,
				icon: <DollarCircleOutlined />
			},
			{ title: 'Rank', value: rank, icon: <NumberOutlined /> },
			{
				title: '24h Volume',
				value: `$ ${volume && millify(volume)}`,
				icon: <ThunderboltOutlined />
			},
			{
				title: 'Market Cap',
				value: `$ ${marketCap && millify(marketCap)}`,
				icon: <DollarCircleOutlined />
			},
			{
				title: 'All-time-high(daily avg.)',
				value: `$ ${millify(+allTimeHigh.price)}`,
				icon: <TrophyOutlined />
			}
		];

		const otherStats = [
			{ title: 'Number Of Markets', value: numberOfMarkets, icon: <FundOutlined /> },
			{
				title: 'Number Of Exchanges',
				value: numberOfExchanges,
				icon: <TransactionOutlined />
			},
			{
				title: 'Aprroved Supply',
				value: approvedSupply ? <CheckOutlined /> : <StopOutlined />,
				icon: <ExclamationCircleOutlined />
			},
			{
				title: 'Total Supply',
				value: `$ ${millify(totalSupply)}`,
				icon: <PayCircleOutlined />
			},
			{
				title: 'Circulating Supply',
				value: `$ ${millify(circulatingSupply)}`,
				icon: <MoneyCollectOutlined />
			}
		];

		return (
			<Col className={styles.cryptoInfo_wrapper}>
				<Row className={styles.cryptoInfo_header_wrapper}>
					<Col>
						<Title level={2} className={styles.crypto_name}>
							{name} ({slug}) Price
						</Title>
						<p>
							{name} live price in US Dollar (USD). View value statistics, market cap and supply.
						</p>
					</Col>
					<Col className={styles.cryptoInfo_header_img}>
						<img className={styles.crypto_img} src={iconUrl} />
					</Col>
				</Row>

				<Divider />
				<Select
					defaultValue="7d"
					className={styles.select_timeperiod}
					placeholder="Select Timeperiod"
					onChange={(value) => setTimeperiod(value)}
				>
					{time.map((date) => (
						<Option key={date} value={date}>
							{date}
						</Option>
					))}
				</Select>
				<Chart
					cryptoHistory={history}
					change={change}
					currentPrice={millify(+price)}
					cryptoName={name}
				/>
				<Divider />

				<Col className={styles.cryptoInfo_stats_wrapper}>
					<Col className={styles.crypto_statistics}>
						<Col className={styles.crypto_statistics_header}>
							<Title level={3} className={styles.cryptoInfo_header}>
								{name} Value Statistics
							</Title>
							<p>
								An overview showing the statistics of {name}, such as the base and quote currency,
								the rank, and trading volume.
							</p>
						</Col>
						{stats.map(({ icon, title, value }) => (
							<Cryptostats icon={icon} title={title} value={value} />
						))}
					</Col>

					<Col className={styles.crypto_statistics}>
						<Col className={styles.crypto_statistics_header}>
							<Title level={3} className={styles.cryptoInfo_header}>
								Other Stats Info
							</Title>
							<p>
								An overview showing the statistics of {name}, such as the base and quote currency,
								the rank, and trading volume.
							</p>
						</Col>
						{otherStats.map(({ icon, title, value }) => (
							<Cryptostats icon={icon} title={title} value={value} />
						))}
					</Col>
				</Col>

				<Divider />

				<Col className={styles.crypto_desc_link}>
					<Row className={styles.crypto_desc}>
						<Title level={3} className={styles.crypto_details_header}>
							What is {name}?
						</Title>
						{HTMLReactParser(description)}
					</Row>
					<Col className={styles.crypto_links}>
						<Title level={3} className={styles.crypto_details_header}>
							{name} Links
						</Title>
						{links?.map((link) => (
							<Row className={styles.crypto_link} key={link.name}>
								<Title level={5} className={styles.link_name}>
									{link.type}
								</Title>
								<a href={link.url} target="_blank" rel="noreferrer">
									{link.name}
								</a>
							</Row>
						))}
					</Col>
				</Col>
				<Divider />
			</Col>
		);
	}

	return <Error />;
};

export default CryptoInfo;
