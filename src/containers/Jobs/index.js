import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { deleteAdminJob, fetchAdminJobs, logOut } from '../../actions';
import { users } from '../../config';
import history from '../../history';
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

class Jobs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage: 1,
			jobsPerPage: 5,
		};
	}

	componentDidMount() {
		const admin = this.props.loggedInUser;
		if (admin) {
			if (admin.userType !== users.admin.type) {
				history.push('/login');
			}
		}

		this.props.fetchAdminJobs(admin);
	}

	renderJobs = (jobs) => {
		const admin = this.props.loggedInUser;

		return jobs.map((job, index) => {
			return (
				<div key={index}>
					<Row style={styles.job}>
						<Col md={2}>{job.title}</Col>
						<Col md={6}>{job.description}</Col>
						<Col md={2}>{job.location}</Col>
						<Col md={2}>
							<Button
								variant='danger'
								onClick={() => {
									this.props.deleteAdminJob(admin, job);
									alert('Deleting job post');
								}}
							>
								Delete
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
					<h1 style={{ marginTop: '80px' }}>No Job posted yet:(</h1>
				</Container>
			);
		}

		const indexOfLastJob = this.state.currentPage * this.state.jobsPerPage;
		const indexOfFirstJob = indexOfLastJob - this.state.jobsPerPage;
		const currentJobs = this.props.jobs.slice(indexOfFirstJob, indexOfLastJob);

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
					{this.renderJobs(currentJobs)}
				</Container>

				<Pagination
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
		jobs: state.jobs,
	};
};

const actionCreators = { deleteAdminJob, fetchAdminJobs, logOut };

export default connect(mapStateToProps, actionCreators)(Jobs);
