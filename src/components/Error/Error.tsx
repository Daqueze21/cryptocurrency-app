import React from 'react';
import { Row, Alert } from 'antd';

const Error = () => {
	return (
		<Row style={{ minHeight: '100%' }} justify="center" align="middle">
			<Alert
				message="something wrong with network"
				description="Further details about the context of this alert."
				type="info"
			/>
		</Row>
	);
};

export default Error;
