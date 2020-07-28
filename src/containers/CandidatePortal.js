import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { applyToJob, fetchAvailableJobs } from '../actions';

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
	applyJob: {
		paddingLeft: '20px',
	},
};

class CandidatePortal extends Component {
	componentDidMount() {
		const candidate = this.props.loggedInUser;
		this.props.fetchAvailableJobs(candidate);
	}

	renderJobs = (jobs) => {
		const candidate = this.props.loggedInUser;

		return jobs.map((job, index) => {
			return (
				<div key={index}>
					<Row style={styles.job}>
						<Col>{job.title}</Col>
						<Col>{job.description}</Col>
						<Col>{job.location}</Col>
					</Row>
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
						<Link to='/candidate/jobs'>
							<p>See applied jobs</p>
						</Link>
					</Col>
					<Col xs={2}>
						<Link to='/'>
							<p>Log Out</p>
						</Link>
					</Col>
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

export default connect(mapStateToProps, { applyToJob, fetchAvailableJobs })(
	CandidatePortal
);
