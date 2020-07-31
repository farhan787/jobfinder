import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchAdminCandidateJobs, logOut } from '../../actions';
import { Helmet } from 'react-helmet';

import { users } from '../../config';
import history from '../../history';
import Pagination from '../../components/Pagination';
import RenderCandidateJobs from '../../components/Admin/RenderCandidateJobs';

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

let jobsLoaded = false;

class AdminCandidateJobs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage: 1,
			jobsPerPage: 5,
		};
	}

	componentDidMount() {
		const admin = this.props.loggedInUser;
		const { candidate } = this.props.location.state;

		if (admin) {
			if (admin.userType !== users.admin.type) {
				history.push('/login');
			}
		}

		this.props.fetchAdminCandidateJobs(admin, candidate);
		jobsLoaded = true;
	}

	paginate = (pageNumber) => {
		this.setState({ currentPage: pageNumber });
	};

	render() {
		if (!jobsLoaded) {
			return <Spinner animation='border' />;
		}

		if (!this.props.jobs.length) {
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
					<h1 style={{ marginTop: '80px' }}>
						Candidate did not apply to any job!
					</h1>
				</Container>
			);
		}

		const indexOfLastJob = this.state.currentPage * this.state.jobsPerPage;
		const indexOfFirstJob = indexOfLastJob - this.state.jobsPerPage;
		const currentJobs = this.props.jobs.slice(indexOfFirstJob, indexOfLastJob);

		return (
			<Container>
				<Helmet>
					<title>Jobs</title>
				</Helmet>

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
					<Row>
						<Col>
							<h1>Candidate Jobs</h1>
						</Col>
					</Row>

					<Row style={styles.jobHeader}>
						<Col md={3}>Title</Col>
						<Col md={6}>Description</Col>
						<Col md={3}>Location</Col>
					</Row>

					<RenderCandidateJobs jobs={currentJobs} />
				</Container>

				<Pagination
					currentPage={this.state.currentPage}
					itemsPerPage={this.state.jobsPerPage}
					totalItems={this.props.jobs.length}
					paginate={this.paginate}
				/>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loggedInUser: state.loggedInUser,
		jobs: state.adminCandidateJobs,
	};
};

const actionCreators = { fetchAdminCandidateJobs, logOut };

export default connect(mapStateToProps, actionCreators)(AdminCandidateJobs);
