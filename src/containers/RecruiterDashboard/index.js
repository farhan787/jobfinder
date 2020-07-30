import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
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
					<RenderPostedJobs
						jobs={currentPostedJobs}
						recruiter={this.props.loggedInUser}
						deleteRecruiterJob={this.props.deleteRecruiterJob}
					/>
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
