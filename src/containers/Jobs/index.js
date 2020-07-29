import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { deleteAdminJob, fetchAdminJobs } from '../../actions';

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

class Jobs extends Component {
	componentDidMount() {
		const admin = this.props.loggedInUser;
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
								style={styles.deleteJob}
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
							<Link to='/'>Logout</Link>
						</Col>
					</Row>
				</Row>

				<Container style={styles.jobsListContainer}>
					{this.renderJobs(this.props.jobs)}
				</Container>
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

const actionCreators = { deleteAdminJob, fetchAdminJobs };

export default connect(mapStateToProps, actionCreators)(Jobs);
