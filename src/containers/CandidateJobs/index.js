import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchAppliedJobs, logOut } from '../../actions';
import { users } from '../../config';
import history from '../../history';

const styles = {
	row: { marginTop: '40px' },
	jobsListContainer: {
		marginTop: '50px',
	},
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
	homeLink: {
		textDecoration: 'none',
	},
	headerRow: {
		marginTop: '30px',
		marginBottom: '30px',
	},
};

const renderJobs = (jobs) => {
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

class CandidateJobs extends Component {
	componentDidMount() {
		const candidate = this.props.loggedInUser;
		if (candidate) {
			if (candidate.userType !== users.candidate.type) {
				history.push('/login');
			}
		}
		this.props.fetchAppliedJobs(candidate);
	}

	render() {
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
							<Link onClick={() => this.props.logOut()} to='/'>
								Logout
							</Link>
						</Col>
					</Row>
				</Row>

				<Container style={styles.jobsListContainer}>
					{renderJobs(this.props.appliedJobs)}
				</Container>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loggedInUser: state.loggedInUser,
		appliedJobs: state.appliedJobs,
	};
};

const actionCreators = { fetchAppliedJobs, logOut };

export default connect(mapStateToProps, actionCreators)(CandidateJobs);
