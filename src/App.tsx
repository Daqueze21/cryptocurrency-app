import React from 'react';

import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';

import { Navbar } from './components';
import { Homepage, News, Exchanges, Cryptocurrencies, CryptoInfo } from './pages';
import 'antd/dist/antd.css';

const { Footer, Content } = Layout;
const App = () => {
	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Navbar />

			<Layout>
				<Content style={{ margin: '24px 16px 0' }}>
					<Switch>
						<Route exact path="/">
							<Homepage />
						</Route>
						<Route exact path="/news">
							<News simplified={false} />
						</Route>
						<Route exact path="/exchanges">
							<Exchanges />
						</Route>
						<Route exact path="/cryptocurrencies">
							<Cryptocurrencies simplified={false} />
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
