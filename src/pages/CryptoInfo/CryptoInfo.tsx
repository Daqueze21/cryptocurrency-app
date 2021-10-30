import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select, Spin, Alert, Divider } from 'antd';
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
import { useGetCryptoInfoQuery } from '../../services/cryptoApi';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';
import styles from './CryptoInfo.module.scss';

const { Title, Text } = Typography;
const { Option } = Select;

type CoinParams = {
	coinId: string;
};

export const CryptoInfo = () => {
	const { coinId } = useParams<CoinParams>();
	const { data, error, isLoading } = useGetCryptoInfoQuery(coinId);

	const cryptoInfo = data?.data?.coin;
	console.log('data', cryptoInfo);
	if (isLoading) return <Loader />;
	if (data) {
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
							<Col className={styles.crypto_stats}>
								<Col className={styles.crypto_stats_name}>
									<Text>{icon}</Text>
									<Text>{title}</Text>
								</Col>
								<Text className={styles.crypto_stats_value}>{value}</Text>
							</Col>
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
							<Col className={styles.crypto_stats}>
								<Col className={styles.crypto_stats_name}>
									<Text>{icon}</Text>
									<Text>{title}</Text>
								</Col>
								<Text className={styles.crypto_stats_value}>{value}</Text>
							</Col>
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
