import React from 'react';
import { Row, Spin } from 'antd';

const Loader = () => {
	return (
		<Row style={{ minHeight: '100%' }} justify="center" align="middle">
			<Spin tip="Loading..."></Spin>
		</Row>
	);
};

export default Loader;
