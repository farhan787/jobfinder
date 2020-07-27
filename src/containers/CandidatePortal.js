import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';

const jobs = [
	{
		title: 'Software Developer Intern',
		description:
			'Candidate should have a good understanding of Computer Science fundamentals',
		location: 'Remote',
	},
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
	applyJob: {
		paddingLeft: '20px',
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
				<Button
					variant='success'
					style={styles.applyJob}
					onClick={() => {
						alert('Applied to job');
					}}
				>
					Apply
				</Button>
			</div>
		);
	});
};

const CandidatePortal = () => {
	return (
		<Container>
			<Row>
				<Col xs={8}>
					<Link to='/'>
						<p>Job Finder</p>
					</Link>
				</Col>
				<Col xs={2}>
					<Link to='/candidate/jobs'>
						<p>See applied jobs</p>
					</Link>
				</Col>
				<Col xs={2}>
					<Link to='/'>
						<p>Log Out</p>
					</Link>
				</Col>
			</Row>

			<Container style={styles.jobsListContainer}>{renderJobs(jobs)}</Container>
		</Container>
	);
};

export default CandidatePortal;