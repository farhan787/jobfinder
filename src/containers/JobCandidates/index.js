import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchJobCandidates, logOut } from '../../actions';
import { users } from '../../config';
import history from '../../history';
import Pagination from '../../components/Pagination';

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
	constructor(props) {
		super(props);
		this.state = {
			currentPage: 1,
			candidatesPerPage: 5,
		};
	}

	componentDidMount() {
		const recruiter = this.props.loggedInUser;
		if (!recruiter) {
			history.push('/login');
		}

		if (recruiter) {
			if (recruiter.userType !== users.recruiter.type) {
				history.push('/login');
			}
		}

		if (this.props.location.state) {
			const { job } = this.props.location.state;
			this.props.fetchJobCandidates(recruiter, job);
		}
	}

	paginate = (pageNumber) => {
		this.setState({ currentPage: pageNumber });
	};

	render() {
		const indexOfLastCandidate =
			this.state.currentPage * this.state.candidatesPerPage;
		const indexOfFirstCandidate =
			indexOfLastCandidate - this.state.candidatesPerPage;
		const currentCandidates = this.props.jobCandidates.slice(
			indexOfFirstCandidate,
			indexOfLastCandidate
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

				<Container style={styles.candidatesListContainer}>
					{renderCandidates(currentCandidates)}
				</Container>

				<Pagination
					itemsPerPage={this.state.candidatesPerPage}
					totalItems={this.props.jobCandidates.length}
					paginate={this.paginate}
				/>
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

const actionCreators = { fetchJobCandidates, logOut };

export default connect(mapStateToProps, actionCreators)(JobCandidates);
