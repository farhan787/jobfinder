import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const styles = {
	row: { marginTop: '40px' },
	entitiesListContainer: {
		marginTop: '50px',
	},
	entity: {
		border: '1px solid black',
		borderRadius: '6px',
		margin: '10px',
		padding: '15px',
	},
	link: {
		textDecoration: 'none',
		color: 'black',
	},
};

const AdminPortal = () => {
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

			<Container style={styles.entitiesListContainer}>
				<Link to='/jobs' style={styles.link}>
					<Row style={styles.entity}>
						<Col>Jobs</Col>
					</Row>
				</Link>

				<Link to='/candidates' style={styles.link}>
					<Row style={styles.entity}>
						<Col>Candidates</Col>
					</Row>
				</Link>

				<Link to='/recruiters' style={styles.link}>
					<Row style={styles.entity}>
						<Col>Recruiters</Col>
					</Row>
				</Link>
			</Container>
		</Container>
	);
};

export default AdminPortal;
