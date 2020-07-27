import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';

const recruiters = [
	{
		name: 'recruiter1',
		email: 'recruiter1@gmail.com',
		password: 'recruiter1',
		phone: '84758824',
		role: 2,
	},
	{
		name: 'recruiter2',
		email: 'recruiter2@gmail.com',
		password: 'recruiter2',
		phone: '73898358',
		role: 2,
	},
	{
		name: 'recruiter3',
		email: 'recruiter3@gmail.com',
		password: 'recruiter3',
		phone: '43624526',
		role: 2,
	},
];

const styles = {
	row: { marginTop: '40px' },
	recruitersListContainer: {
		marginTop: '50px',
	},
	recruiter: {
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

const renderRecruiters = (recruiters) => {
	return recruiters.map((recruiter) => {
		return (
			<div key={recruiter.email}>
				<Row style={styles.recruiter}>
					<Col>{recruiter.name}</Col>
					<Col>{recruiter.email}</Col>
					<Col>{recruiter.phone}</Col>
				</Row>

				<Button
					variant='danger'
					style={styles.deleteJob}
					onClick={() => {
						alert('Deleting recruiter');
					}}
				>
					Delete
				</Button>
			</div>
		);
	});
};

const Recruiters = () => {
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

			<Container style={styles.recruitersListContainer}>
				{renderRecruiters(recruiters)}
			</Container>
		</Container>
	);
};

export default Recruiters;
