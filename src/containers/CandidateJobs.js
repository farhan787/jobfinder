import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const appliedJobs = [
	{
		title: 'Senior SDE',
		description: 'Experience in building complex large scale systems',
		location: 'London(UK)',
	},
	{
		title: 'SDE 1',
		description:
			'Strong problem solving and analysing skills, DSA, OOPS, DBMS, OS',
		location: 'Hyderabad(India)',
	},
];

const styles = {
	row: { marginTop: '40px' },
	jobsListContainer: {
		marginTop: '50px',
	},
	job: {
		border: '1px solid black',
		borderRadius: '6px',
		margin: '10px',
		padding: '15px',
	},
	link: {
		textDecoration: 'none',
		color: 'black',
	},
	jobContainer: {
		marginTop: '20px',
		padding: '20px',
	},
};

const renderJobs = (jobs) => {
	return jobs.map((job, index) => {
		return (
			<div key={index}>
				<Row style={styles.job}>
					<Col>{job.title}</Col>
					<Col>{job.description}</Col>
					<Col>{job.location}</Col>
				</Row>
			</div>
		);
	});
};

const CandidateJobs = () => {
	return (
		<Container>
			<Row>
				<Col xs={10}>
					<Link to='/'>
						<p>Job Finder</p>
					</Link>
				</Col>

				<Col xs={2}>
					<Link to='/'>
						<p>Log Out</p>
					</Link>
				</Col>
			</Row>

			<Container style={styles.jobsListContainer}>
				{renderJobs(appliedJobs)}
			</Container>
		</Container>
	);
};

export default CandidateJobs;
