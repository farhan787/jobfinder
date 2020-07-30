import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Col, Row, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
	deleteAdminCandidate,
	fetchAdminCandidates,
	logOut,
} from '../../actions';
import { users } from '../../config';
import history from '../../history';
import RenderCandidates from '../../components/Candidates/RenderCandidates';
import Pagination from '../../components/Pagination';

const styles = {
	row: { marginTop: '40px' },
	candidatesListContainer: {
		marginTop: '50px',
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

let candidatesLoaded = false;

class Candidates extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage: 1,
			candidatesPerPage: 5,
		};
	}

	componentDidMount() {
		const admin = this.props.loggedInUser;
		if (admin) {
			if (admin.userType !== users.admin.type) {
				history.push('/login');
			}
		}

		this.props.fetchAdminCandidates(admin);
		candidatesLoaded = true;
	}

	paginate = (pageNumber) => {
		this.setState({ currentPage: pageNumber });
	};

	render() {
		if (!this.props.candidates.length) {
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
					<h1 style={{ marginTop: '80px' }}>No Candidate Signed up yet:(</h1>
				</Container>
			);
		}

		if (!candidatesLoaded) {
			return <Spinner animation='border' />;
		}

		const indexOfLastCandidate =
			this.state.currentPage * this.state.candidatesPerPage;
		const indexOfFirstCandidate =
			indexOfLastCandidate - this.state.candidatesPerPage;
		const currentCandidates = this.props.candidates.slice(
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
							<Link onClick={() => this.props.logOut()} to='/'>
								Logout
							</Link>
						</Col>
					</Row>
				</Row>

				<Container style={styles.candidatesListContainer}>
					<RenderCandidates
						candidates={currentCandidates}
						admin={this.props.loggedInUser}
						deleteAdminCandidate={this.props.deleteAdminCandidate}
					/>
				</Container>

				<Pagination
					itemsPerPage={this.state.candidatesPerPage}
					totalItems={this.props.candidates.length}
					paginate={this.paginate}
				/>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loggedInUser: state.loggedInUser,
		candidates: state.candidates,
	};
};

const actionCreators = {
	deleteAdminCandidate,
	fetchAdminCandidates,
	logOut,
};

export default connect(mapStateToProps, actionCreators)(Candidates);
