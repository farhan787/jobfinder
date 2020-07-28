import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchJobCandidates } from '../actions';

const styles = {
	row: { marginTop: '40px' },
	candidatesListContainer: {
		marginTop: '50px',
	},
	candidate: {
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

const renderCandidates = (candidates) => {
	return candidates.map((candidate) => {
		return (
			<Row style={styles.candidate} key={candidate.email}>
				<Col>{candidate.name}</Col>
				<Col>{candidate.skills}</Col>
				<Col>{candidate.email}</Col>
			</Row>
		);
	});
};

class JobCandidates extends Component {
	componentDidMount() {
		const recruiter = this.props.loggedInUser;
		const { job } = this.props.location.state;

		this.props.fetchJobCandidates(recruiter, job);
	}

	render() {
		const { job } = this.props.location.state;

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

				<Container style={styles.jobContainer}>
					<Row>
						<Col xs={2}>{job.title}</Col>
						<Col xs={8}>{job.description}</Col>
						<Col xs={2}>{job.location}</Col>
					</Row>
				</Container>

				<Container style={styles.candidatesListContainer}>
					{renderCandidates(this.props.jobCandidates)}
				</Container>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loggedInUser: state.loggedInUser,
		jobCandidates: state.jobCandidates,
	};
};

export default connect(mapStateToProps, { fetchJobCandidates })(JobCandidates);
