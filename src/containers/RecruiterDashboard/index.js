import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { deleteRecruiterJob, fetchPostedJobs, logOut } from '../../actions';

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
	deleteJob: {
		paddingLeft: '20px',
	},
};

class RecruiterDashboard extends Component {
	componentDidMount() {
		const recruiter = this.props.loggedInUser;
		this.props.fetchPostedJobs(recruiter);
	}

	renderJobs = (jobs) => {
		const recruiter = this.props.loggedInUser;

		return jobs.map((job, index) => {
			return (
				<div key={index}>
					<Link
						to={{
							pathname: '/job/candidates',
							state: {
								job,
							},
						}}
						style={styles.link}
					>
						<Row style={styles.job}>
							<Col md={2}>{job.title}</Col>
							<Col md={6}>{job.description}</Col>
							<Col md={2}>{job.location}</Col>
							<Col md={2}>
								<Button
									variant='danger'
									style={styles.deleteJob}
									onClick={() => {
										this.props.deleteRecruiterJob(recruiter, job);
										alert('Deleting job post');
									}}
								>
									Delete
								</Button>
							</Col>
						</Row>
					</Link>
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
							<Link to='/post/job'>Post a Job</Link>
						</Col>
						<Col>
							<Link to='/'>Logout</Link>
						</Col>
					</Row>
				</Row>

				<Container style={styles.jobsListContainer}>
					{this.renderJobs(this.props.postedJobs)}
				</Container>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loggedInUser: state.loggedInUser,
		postedJobs: state.postedJobs,
	};
};

const actionCreators = {
	deleteRecruiterJob,
	fetchPostedJobs,
	logOut,
};

export default connect(mapStateToProps, actionCreators)(RecruiterDashboard);