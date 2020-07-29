import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logOut } from '../../actions/';

const styles = {
	row: { marginTop: '40px' },
	entitiesListContainer: {
		marginTop: '50px',
		textAlign: 'center',
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
	entitiesList: {
		textDecoration: 'none',
		borderRadius: '8px',
		margin: '20px',
		padding: '15px',
		fontSize: '1.7rem',
		backgroundColor: '#ecf0f1',
		color: 'black',
		fontFamily: 'EB Garamond',
		textAlign: 'center',
		width: '200',
	},
	verticalCenter: {
		margin: '0',
		position: 'absolute',
		top: '50%',
		msTransform: 'translateY(-50%)',
		transform: 'translateY(-50%)',
	},
};

const AdminDashboard = (props) => {
	return (
		<Container>
			<Row style={styles.headerRow}>
				<Col>
					<Link to='/' style={styles.homeLink}>
						<h1>Job Finder</h1>
					</Link>
				</Col>
				<Row>
					<Col>
						<Link onClick={() => props.logOut()} to='/'>
							Logout
						</Link>
					</Col>
				</Row>
			</Row>

			<Container style={(styles.entitiesListContainer, styles.verticalCenter)}>
				<Link to='/jobs'>
					<Row style={styles.entitiesList}>
						<Col>Jobs</Col>
					</Row>
				</Link>

				<Link to='/candidates'>
					<Row style={styles.entitiesList}>
						<Col>Candidates</Col>
					</Row>
				</Link>

				<Link to='/recruiters'>
					<Row style={styles.entitiesList}>
						<Col>Recruiters</Col>
					</Row>
				</Link>
			</Container>
		</Container>
	);
};

const mapStateToProps = (state) => {
	return {
		loggedInUser: state.loggedInUser,
	};
};

export default connect(mapStateToProps, { logOut })(AdminDashboard);
