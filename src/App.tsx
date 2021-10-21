import React from 'react';

import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';

import { Navbar } from './components';
import { Homepage, News, Exchanges, Cryptocurrencies, CryptoInfo } from './pages';
import 'antd/dist/antd.css';
import styles from './App.module.scss';

const { Footer, Content } = Layout;
const App = () => {
	return (
		<Layout>
			<Navbar />

			<Layout>
				<Content style={{ margin: '24px 16px 0' }}>
					<Switch>
						<Route exact path="/">
							<Homepage />
						</Route>
						<Route exact path="/news">
							<News />
						</Route>
						<Route exact path="/exchanges">
							<Exchanges />
						</Route>
						<Route exact path="/cryptocurrencies">
							<Cryptocurrencies />
						</Route>
						<Route exact path="/crypto/:coinId">
							<CryptoInfo />
						</Route>
					</Switch>
				</Content>

				<Footer style={{ textAlign: 'center' }}>CryptomarT ©2021 Created by Daqueze21</Footer>
			</Layout>
		</Layout>
	);
};

export default App;
