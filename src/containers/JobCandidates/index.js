import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchJobCandidates } from '../../actions';

const styles = {
	row: { marginTop: '40px' },
	candidatesListContainer: {
		marginTop: '50px',
	},
	candidate: {
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
	jobContainer: {
		marginTop: '20px',
		padding: '20px',
	},
};

const renderCandidates = (candidates) => {
	return candidates.map((candidate) => {
		return (
			<Row style={styles.candidate} key={candidate.email}>
				<Col md={2}>{candidate.name}</Col>
				<Col md={6}>{candidate.skills}</Col>
				<Col md={4}>{candidate.email}</Col>
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
							<Link to='/'>Logout</Link>
						</Col>
					</Row>
				</Row>

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

const actionCreators = { fetchJobCandidates };

export default connect(mapStateToProps, actionCreators)(JobCandidates);
