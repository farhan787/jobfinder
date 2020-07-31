import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { applyToJob, fetchAvailableJobs, logOut } from '../../actions';
import { users } from '../../config';
import history from '../../history';
import Pagination from '../../components/Pagination';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';

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
	jobHeader: {
		borderRadius: '6px',
		margin: '10px',
		padding: '15px',
		fontFamily: 'sans-serif',
		backgroundColor: '#000',
		color: '#fff',
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

let availableJobsLoaded = false;

class CandidateDashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage: 1,
			jobsPerPage: 5,
		};
	}

	componentDidMount() {
		const user = this.props.loggedInUser;
		if (user) {
			if (user.userType !== users.candidate.type) {
				history.push('/login');
			}
		}

		const candidate = this.props.loggedInUser;
		this.props.fetchAvailableJobs(candidate);
		availableJobsLoaded = true;
	}

	handleJobApply = (candidate, job) => {
		this.props.applyToJob(candidate, job);
		Swal.fire({
			title: 'Applied to job successfully',
			showClass: {
				popup: 'animate__animated animate__fadeInDown',
			},
			hideClass: {
				popup: 'animate__animated animate__fadeOutUp',
			},
		});
	};

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
								onClick={() => {
									this.handleJobApply(candidate, job);
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

	paginate = (pageNumber) => {
		this.setState({ currentPage: pageNumber });
	};

	render() {
		if (!availableJobsLoaded) {
			return <Spinner animation='border' />;
		}

		if (!this.props.availableJobs.length) {
			return (
				<Container>
					<Helmet>
						<title>Candidate Dashboard</title>
					</Helmet>

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
								<Link onClick={() => this.props.logOut()} to='/'>
									Logout
								</Link>
							</Col>
						</Row>
					</Row>
					<h1 style={{ marginTop: '80px' }}>No Job available:(</h1>
				</Container>
			);
		}

		const indexOfLastJob = this.state.currentPage * this.state.jobsPerPage;
		const indexOfFirstJob = indexOfLastJob - this.state.jobsPerPage;
		const currentJobs = this.props.availableJobs.slice(
			indexOfFirstJob,
			indexOfLastJob
		);

		return (
			<Container>
				<Helmet>
					<title>Candidate Dashboard</title>
				</Helmet>

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
							<Link onClick={() => this.props.logOut()} to='/'>
								Logout
							</Link>
						</Col>
					</Row>
				</Row>

				<Container style={styles.jobsListContainer}>
					<Row>
						<Col>
							<h1>Available Jobs</h1>
						</Col>
					</Row>

					<Row style={styles.jobHeader}>
						<Col md={2}>Title</Col>
						<Col md={6}>Description</Col>
						<Col md={2}>Location</Col>
						<Col md={2}></Col>
					</Row>

					{this.renderJobs(currentJobs)}
				</Container>

				<Pagination
					currentPage={this.state.currentPage}
					itemsPerPage={this.state.jobsPerPage}
					totalItems={this.props.availableJobs.length}
					paginate={this.paginate}
				/>
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
	logOut,
};

export default connect(mapStateToProps, actionCreators)(CandidateDashboard);
