import React from 'react';
import { Row, Alert } from 'antd';

const Error = () => {
	return (
		<Row style={{ minHeight: '100%' }} justify="center" align="middle">
			<Alert
				message="Service Temporarily Unavailable"
				description="Please, try again later"
				type="info"
			/>
		</Row>
	);
};

export default Error;
