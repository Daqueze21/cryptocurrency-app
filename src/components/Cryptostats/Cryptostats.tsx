import React, { FC } from 'react';

import { Col, Typography } from 'antd';
import styles from './Cryptostats.module.scss';

const { Text } = Typography;

interface CryprostatsProps {
	icon: JSX.Element;
	title: string;
	value: string | number | JSX.Element;
}

export const Cryptostats: FC<CryprostatsProps> = ({ icon, title, value }) => {
	return (
		<Col className={styles.crypto_stats}>
			<Col className={styles.crypto_stats_name}>
				<Text>{icon}</Text>
				<Text>{title}</Text>
			</Col>
			<Text className={styles.crypto_stats_value}>{value}</Text>
		</Col>
	);
};
