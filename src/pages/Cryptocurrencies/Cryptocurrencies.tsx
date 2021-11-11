import React, { FC, useEffect, useState } from 'react';

import { useGetCryptosQuery } from '../../services/cryptoApi';
import { Link } from 'react-router-dom';

import { Row, Col, Input, Spin, Alert } from 'antd';

import { ICoin } from '../../models/ICoin';
import styles from './Cryptocurrencies.module.scss';
import CryptoCard from '../../components/CryptoCard/CryptoCard';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';

interface CryptocurrenciesProps {
	simplified: boolean;
}

export const Cryptocurrencies: FC<CryptocurrenciesProps> = ({ simplified }) => {
	const count = simplified ? '10' : '80';
	const { data, error, isLoading } = useGetCryptosQuery(count);
	const [cryptosList, setCryptosList] = useState<ICoin[] | undefined>([]);
	const [searchCrypto, setSearchCrypto] = useState('');
	console.log(error);

	// const { total, total24hVolume, totalExchanges, totalMarketCap, totalMarkets } = data?.data?.stats;

	useEffect(() => {
		setCryptosList(data?.data?.coins);

		const filteredData = data?.data?.coins.filter((crypto: ICoin) =>
			crypto.name.toLowerCase().includes(searchCrypto)
		);
		setCryptosList(filteredData);
	}, [data, searchCrypto]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchCrypto(e.target.value.toLowerCase());
	};

	if (isLoading) return <Loader />;

	if (data) {
		console.log(data);
		return (
			<>
				{!simplified && (
					<div className={styles.search_crypto}>
						<Input placeholder="Search Cryptocurrency" onChange={handleChange} />
					</div>
				)}
				{isLoading ? (
					<>
						<Row style={{ minHeight: '100vh' }} justify="center" align="middle">
							<Spin tip="Loading..."></Spin>
						</Row>
					</>
				) : error ? (
					<>
						<Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
							<Alert
								message="something wrong with network"
								description="Further details about the context of this alert."
								type="info"
							/>
						</Row>
					</>
				) : (
					<Row gutter={[32, 32]} className={styles.Cryptocurrencies_wrapper}>
						{cryptosList?.map((crypto: ICoin) => (
							<Col xs={24} sm={12} lg={6} key={crypto.id}>
								<Link key={crypto.id} to={`/crypto/${crypto.id}`}>
									<CryptoCard crypto={crypto} />
								</Link>
							</Col>
						))}
					</Row>
				)}
			</>
		);
	}
	return <Error />;
};

export default Cryptocurrencies;
