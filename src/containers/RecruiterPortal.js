import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { deleteRecruiterJob, fetchPostedJobs, logOut } from '../actions';

const styles = {
	row: { marginTop: '40px' },
	jobsListContainer: {
		marginTop: '50px',
	},
	job: {
		border: '1px solid black',
		borderRadius: '6px',
		margin: '10px',
		padding: '15px',
	},
	link: {
		textDecoration: 'none',
		color: 'black',
	},
	deleteJob: {
		paddingLeft: '20px',
	},
};

class RecruiterPortal extends Component {
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
							<Col>{job.title}</Col>
							<Col>{job.description}</Col>
							<Col>{job.location}</Col>
						</Row>
					</Link>
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
				</div>
			);
		});
	};

	render() {
		return (
			<Container>
				<Row>
					<Col xs={8}>
						<Link to='/'>
							<p>Job Finder</p>
						</Link>
					</Col>
					<Col xs={2}>
						<Link to='/post/job'>
							<p>Post a Job</p>
						</Link>
					</Col>
					<Col xs={2}>
						<Link to='/'>
							<p>Log Out</p>
						</Link>
					</Col>
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

export default connect(mapStateToProps, {
	deleteRecruiterJob,
	fetchPostedJobs,
	logOut,
})(RecruiterPortal);
