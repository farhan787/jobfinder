import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import { users } from '../../config';
import history from '../../history';
import { deleteRecruiterJob, fetchPostedJobs, logOut } from '../../actions';
import Pagination from '../../components/Pagination';
import RenderPostedJobs from '../../components/Recruiters/RenderPostedJobs';

const styles = {
	row: { marginTop: '40px' },
	jobsListContainer: {
		marginTop: '50px',
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
};

let postedJobsLoaded = false;

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
		postedJobsLoaded = true;
	}

	paginate = (pageNumber) => {
		this.setState({ currentPage: pageNumber });
	};

	render() {
		if (!postedJobsLoaded) {
			return <Spinner animation='border' />;
		}

		if (!this.props.postedJobs.length) {
			return (
				<Container>
					<Helmet>
						<title>Recruiter Dashboard</title>
					</Helmet>

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
				<Helmet>
					<title>Recruiter Dashboard</title>
				</Helmet>

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
					<Row>
						<Col>
							<h1>Posted Jobs</h1>
						</Col>
					</Row>

					<Row style={styles.jobHeader}>
						<Col md={2}>Title</Col>
						<Col md={6}>Description</Col>
						<Col md={2}>Location</Col>
						<Col md={2}></Col>
					</Row>

					<RenderPostedJobs
						jobs={currentPostedJobs}
						recruiter={this.props.loggedInUser}
						deleteRecruiterJob={this.props.deleteRecruiterJob}
					/>
				</Container>

				<Pagination
					currentPage={this.state.currentPage}
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
