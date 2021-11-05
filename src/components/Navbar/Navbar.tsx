import React, { useEffect, useState } from 'react';

import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu, Typography, Avatar, Dropdown } from 'antd';
import {
	HomeOutlined,
	TransactionOutlined,
	GlobalOutlined,
	FundOutlined,
	MenuOutlined
} from '@ant-design/icons';
import styles from './Navbar.module.scss';

import icon from '../../images/cryptocurrency-coin-2453.svg';

const { Header, Sider } = Layout;
const { Title } = Typography;
const { Item } = Menu;

const Navbar = () => {
	const [activeMenu, setActiveMenu] = useState<boolean>(true);
	const [screenSize, setScreenSize] = useState<number>(window.innerWidth);
	const [visible, setVisible] = useState<boolean>(false);
	const location = useLocation();

	useEffect(() => {
		const handleResize = () => setScreenSize(window.innerWidth);

		window.addEventListener('resize', handleResize);

		handleResize();

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		if (screenSize <= 800) {
			setActiveMenu(false);
		} else {
			setActiveMenu(true);
		}
	}, [screenSize]);

	const handleVisibleChange = () => {
		setVisible(!visible);
	};

	const menu = (
		<Menu theme="dark" defaultSelectedKeys={[location.pathname]}>
			<Item key="/" icon={<HomeOutlined />}>
				<Link to="/">Home</Link>
			</Item>
			<Item key="/news" icon={<GlobalOutlined />}>
				<Link to="/news">News</Link>
			</Item>
			<Item key="/cryptocurrencies" icon={<FundOutlined />}>
				<Link to="/cryptocurrencies">Cryptocurrencies</Link>
			</Item>
			<Item key="/exchanges" icon={<TransactionOutlined />}>
				<Link to="/exchanges">Exchanges</Link>
			</Item>
		</Menu>
	);
	return activeMenu ? (
		<Sider breakpoint={'lg'} collapsedWidth={0} trigger={null}>
			<div className={styles.logo_wrapper}>
				<Avatar src={icon} size="large" />
				<Title level={3}>
					<Link to="/">CryptomarT</Link>
				</Title>
			</div>

			{menu}
		</Sider>
	) : (
		<Header className={styles.header}>
			<div className={styles.logo_wrapper}>
				<Avatar src={icon} size="large" />
				<Title level={3}>
					<Link to="/">CryptomarT</Link>
				</Title>
			</div>

			<Dropdown overlay={menu} onVisibleChange={handleVisibleChange} visible={visible}>
				<a onClick={(e) => e.preventDefault()}>
					<MenuOutlined />
				</a>
			</Dropdown>
		</Header>
	);
};

export default Navbar;
