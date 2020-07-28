import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchAppliedJobs } from '../../actions';

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
	jobContainer: {
		marginTop: '20px',
		padding: '20px',
	},
};

const renderJobs = (jobs) => {
	return jobs.map((job, index) => {
		return (
			<div key={index}>
				<Row style={styles.job}>
					<Col>{job.title}</Col>
					<Col>{job.description}</Col>
					<Col>{job.location}</Col>
				</Row>
			</div>
		);
	});
};

class CandidateJobs extends Component {
	componentDidMount() {
		const candidate = this.props.loggedInUser;
		this.props.fetchAppliedJobs(candidate);
	}

	render() {
		return (
			<Container>
				<Row>
					<Col xs={10}>
						<Link to='/'>
							<p>Job Finder</p>
						</Link>
					</Col>

					<Col xs={2}>
						<Link to='/'>
							<p>Log Out</p>
						</Link>
					</Col>
				</Row>

				<Container style={styles.jobsListContainer}>
					{renderJobs(this.props.appliedJobs)}
				</Container>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loggedInUser: state.loggedInUser,
		appliedJobs: state.appliedJobs,
	};
};

const actionCreators = { fetchAppliedJobs };

export default connect(mapStateToProps, actionCreators)(CandidateJobs);
