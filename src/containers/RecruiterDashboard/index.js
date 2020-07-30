import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { users } from '../../config';
import history from '../../history';
import { deleteRecruiterJob, fetchPostedJobs, logOut } from '../../actions';
import Pagination from '../../components/Pagination';

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
};

class RecruiterDashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage: 1,
			postedJobsPerPage: 5,
		};
	}

	componentDidMount() {
		const recruiter = this.props.loggedInUser;
		if (recruiter) {
			if (recruiter.userType !== users.recruiter.type) {
				history.push('/login');
			}
		}

		this.props.fetchPostedJobs(recruiter);
	}

	paginate = (pageNumber) => {
		this.setState({ currentPage: pageNumber });
	};

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
		if (!this.props.postedJobs.length) {
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
								<Link onClick={() => this.props.logOut()} to='/'>
									Logout
								</Link>
							</Col>
						</Row>
					</Row>
					<h1 style={{ marginTop: '80px' }}>You did not post any job yet!</h1>
				</Container>
			);
		}

		const indexOfLastPostedJob =
			this.state.currentPage * this.state.postedJobsPerPage;
		const indexOfFirstPostedJob =
			indexOfLastPostedJob - this.state.postedJobsPerPage;
		const currentPostedJobs = this.props.postedJobs.slice(
			indexOfFirstPostedJob,
			indexOfLastPostedJob
		);

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
							<Link onClick={() => this.props.logOut()} to='/'>
								Logout
							</Link>
						</Col>
					</Row>
				</Row>

				<Container style={styles.jobsListContainer}>
					{this.renderJobs(currentPostedJobs)}
				</Container>

				<Pagination
					itemsPerPage={this.state.postedJobsPerPage}
					totalItems={this.props.postedJobs.length}
					paginate={this.paginate}
				/>
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
