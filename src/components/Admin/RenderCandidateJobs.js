import React from 'react';
import { Col, Row } from 'react-bootstrap';

const styles = {
	job: {
		borderRadius: '6px',
		margin: '10px',
		padding: '15px',
		fontFamily: 'sans-serif',
		backgroundColor: '#F0F0ED',
		fontSize: '1.2rem',
		textAlign: 'center',
		alignItem: 'center',
	},
	link: {
		textDecoration: 'none',
		color: 'black',
	},
};

const RenderCandidateJobs = ({ jobs }) => {
	return jobs.map((job, index) => {
		return (
			<div key={index}>
				<Row style={styles.job}>
					<Col md={3}>{job.title}</Col>
					<Col md={6}>{job.description}</Col>
					<Col md={3}>{job.location}</Col>
				</Row>
			</div>
		);
	});
};

export default RenderCandidateJobs;
