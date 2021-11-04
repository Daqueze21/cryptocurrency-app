import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';

import { useGetExchangesQuery } from '../../services/cryptoApi';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';
import { IExchange } from '../../models/IExchanges';

import styles from './Exchanges.module.scss';

const { Text } = Typography;
const { Panel } = Collapse;

export const Exchanges = () => {
	const { data, isLoading } = useGetExchangesQuery('');

	if (isLoading) return <Loader />;
	if (data) {
		const { exchanges } = data.data;
		return (
			<>
				<Row>
					<Col span={6}>Exchanges</Col>
					<Col span={6}>24h Trade Volume</Col>
					<Col span={6}>Markets</Col>
					<Col span={6}>Change</Col>
				</Row>
				<Row>
					{exchanges.map((exchange: IExchange) => (
						<Col span={24}>
							<Collapse>
								<Panel
									key={exchange.id}
									showArrow={false}
									header={
										<Row key={exchange.id}>
											<Col span={6}>
												<Text>
													<strong>{exchange.rank}.</strong>
												</Text>
												<Avatar className={styles.exchange_image} src={exchange.iconUrl} />
												<Text>
													<strong>{exchange.name}</strong>
												</Text>
											</Col>
											<Col span={6}>{millify(exchange.volume)}</Col>
											<Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
											<Col span={6}>{millify(exchange.marketShare)}%</Col>
										</Row>
									}
								>
									{HTMLReactParser(exchange.description || '')}
								</Panel>
							</Collapse>
						</Col>
					))}
				</Row>
			</>
		);
	}

	return <Error />;
};

export default Exchanges;
