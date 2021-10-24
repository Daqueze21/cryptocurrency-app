import React from 'react';

import { Link } from 'react-router-dom';
import { Layout, Menu, Typography, Avatar } from 'antd';
import { HomeOutlined, TransactionOutlined, GlobalOutlined, FundOutlined } from '@ant-design/icons';
import styles from './Navbar.module.scss';

import icon from '../../images/cryptocurrency-coin-2453.svg';

const { Sider } = Layout;
const { Title } = Typography;
const { Item } = Menu;

const Navbar = () => {
	return (
		<Sider>
			<div className={styles.logo_wrapper}>
				<Avatar src={icon} size="large" />
				<Title level={3}>
					<Link to="/">CryptomarT</Link>
				</Title>
			</div>

			<Menu theme="dark" defaultSelectedKeys={['/']}>
				<Item key="/" icon={<HomeOutlined />}>
					<Link to="/">Home</Link>
				</Item>
				<Item key="2" icon={<GlobalOutlined />}>
					<Link to="/news">News</Link>
				</Item>
				<Item key="3" icon={<FundOutlined />}>
					<Link to="/cryptocurrencies">Cryptocurrencies</Link>
				</Item>
				<Item key="4" icon={<TransactionOutlined />}>
					<Link to="/exchanges">Exchanges</Link>
				</Item>
			</Menu>
		</Sider>
	);
};

export default Navbar;
