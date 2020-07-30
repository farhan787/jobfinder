import React from 'react';
import { Helmet } from 'react-helmet';

const NotFound = () => {
	return (
		<div>
			<Helmet>
				<title>Not Found</title>
			</Helmet>

			<h1>Not Found!! Invalid Route.</h1>
		</div>
	);
};

export default NotFound;
