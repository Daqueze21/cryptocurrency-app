import React, { FC } from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import styles from './Chart.module.scss';

const { Title } = Typography;

type CryptoHistoryData = {
	price: string;
	timestamp: number;
};

type ChartProps = {
	cryptoName: string;
	currentPrice: string;
	cryptoHistory: CryptoHistoryData[];
	change: number;
};

export const Chart: FC<ChartProps> = ({ cryptoName, currentPrice, cryptoHistory, change }) => {
	const cryptoPrice = cryptoHistory.map((historyItem) => +historyItem.price);
	const cryptoTimestamp = cryptoHistory.map((historyItem) =>
		new Date(historyItem.timestamp).toLocaleDateString()
	);

	const data = {
		labels: cryptoTimestamp,
		datasets: [
			{
				label: 'USD price',
				data: cryptoPrice,
				fill: false,
				backgroundColor: '#0071bd',
				borderColor: 'black'
			}
		]
	};

	const options = {
		scales: {
			y: {
				beginAtZero: true
			}
		}
	};

	return (
		<>
			<Row className={styles.chart_header}>
				<Title level={2}>{cryptoName} Price Chart </Title>
				<Col className={styles.container}>
					<Title level={5} className={styles.change}>
						Change: {change}%
					</Title>
					<Title level={5} className="current-price">
						Current {cryptoName} Price: $ {currentPrice}
					</Title>
				</Col>
			</Row>
			<Line data={data} options={options} />
		</>
	);
};
