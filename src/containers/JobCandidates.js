import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const candidates = [
	{
		name: 'candidate1',
		email: 'candidate1@gmail.com',
		password: 'candidate1',
		phone: '9384855245',
		skills: 'html, c++, js',
		role: 3,
	},
	{
		name: 'candidate2',
		email: 'candidate2@gmail.com',
		password: 'candidate2',
		phone: '9248285239',
		skills: 'python, c++, java',
		role: 3,
	},
	{
		name: 'candidate3',
		email: 'candidate3@gmail.com',
		password: 'candidate3',
		phone: '3464256245',
		skills: 'c#, devops, db, os',
		role: 3,
	},
	{
		name: 'candidate4',
		email: 'candidate4@gmail.com',
		password: 'candidate4',
		phone: '895398245',
		skills: 'dsa, system design, oops',
		role: 3,
	},
];
const job = {
	title: 'SDE 1',
	description:
		'Strong problem solving and analysing skills, DSA, OOPS, DBMS, OS',
	location: 'Hyderabad(India)',
};

const styles = {
	row: { marginTop: '40px' },
	candidatesListContainer: {
		marginTop: '50px',
	},
	candidate: {
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

const renderCandidates = (candidates) => {
	return candidates.map((candidate) => {
		return (
			<Row style={styles.candidate} key={candidate.email}>
				<Col>{candidate.name}</Col>
				<Col>{candidate.skills}</Col>
				<Col>{candidate.email}</Col>
			</Row>
		);
	});
};

const JobCandidates = () => {
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

			<Container style={styles.jobContainer}>
				<Row>
					<Col xs={2}>{job.title}</Col>
					<Col xs={8}>{job.description}</Col>
					<Col xs={2}>{job.location}</Col>
				</Row>
			</Container>

			<Container style={styles.candidatesListContainer}>
				{renderCandidates(candidates)}
			</Container>
		</Container>
	);
};

export default JobCandidates;
