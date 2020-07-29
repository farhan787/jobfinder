import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { applyToJob, fetchAvailableJobs } from '../../actions';
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
	applyJob: {
		paddingLeft: '20px',
	},
	homeLink: {
		textDecoration: 'none',
	},
	headerRow: {
		marginTop: '30px',
		marginBottom: '30px',
	},
};

class CandidateDashboard extends Component {
	componentDidMount() {
		const user = this.props.loggedInUser;
		if (user) {
			if (user.userType !== users.candidate.type) {
				history.push('/login');
			}
		}

		const candidate = this.props.loggedInUser;
		this.props.fetchAvailableJobs(candidate);
	}

	renderJobs = (jobs) => {
		const candidate = this.props.loggedInUser;

		return jobs.map((job, index) => {
			return (
				<div key={index}>
					<Row style={styles.job}>
						<Col md={2}>{job.title}</Col>
						<Col md={6}>{job.description}</Col>
						<Col md={2}>{job.location}</Col>
						<Col md={2}>
							<Button
								variant='success'
								style={styles.applyJob}
								onClick={() => {
									this.props.applyToJob(candidate, job);
									alert('Applied Successfully');
								}}
							>
								Apply
							</Button>
						</Col>
					</Row>
				</div>
			);
		});
	};

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
							<Link to='/candidate/jobs'>See Applied Jobs</Link>
						</Col>
						<Col>
							<Link to='/'>Logout</Link>
						</Col>
					</Row>
				</Row>

				<Container style={styles.jobsListContainer}>
					{this.renderJobs(this.props.availableJobs)}
				</Container>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loggedInUser: state.loggedInUser,
		availableJobs: state.availableJobs,
	};
};

const actionCreators = {
	applyToJob,
	fetchAvailableJobs,
};

export default connect(mapStateToProps, actionCreators)(CandidateDashboard);
