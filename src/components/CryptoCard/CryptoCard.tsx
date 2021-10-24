import React, { FC } from 'react';
import millify from 'millify';

import { Card } from 'antd';
import { ICoin } from '../../models/ICoin';
import styles from './CryptoCard.module.scss';

interface CryptoCardProps {
	crypto: ICoin;
}

const CryptoCard: FC<CryptoCardProps> = ({ crypto }) => {
	const { rank, name, iconUrl, price, marketCap, change } = crypto;
	return (
		<Card
			title={`${rank}. ${name}`}
			extra={<img className={styles.crypto_img} src={iconUrl} />}
			hoverable
		>
			<p>Price: {millify(price)}</p>
			<p>Market Cap: {millify(marketCap)}</p>
			<p>Daily Change: {change}%</p>
		</Card>
	);
};

export default CryptoCard;
