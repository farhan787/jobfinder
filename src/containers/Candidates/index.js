import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { deleteAdminCandidate, fetchAdminCandidates } from '../../actions';

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

class Candidates extends Component {
	componentDidMount() {
		const admin = this.props.loggedInUser;
		this.props.fetchAdminCandidates(admin);
	}

	renderCandidates = (candidates) => {
		const admin = this.props.loggedInUser;

		return candidates.map((candidate) => {
			return (
				<div key={candidate.email}>
					<Row style={styles.candidate}>
						<Col md={2}>{candidate.name}</Col>
						<Col md={4}>{candidate.skills}</Col>
						<Col md={4}>{candidate.email}</Col>
						<Col md={2}>
							<Button
								variant='danger'
								style={styles.deleteJob}
								onClick={() => {
									this.props.deleteAdminJob(admin, candidate);
									alert('Deleting candidate');
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

				<Container style={styles.candidatesListContainer}>
					{this.renderCandidates(this.props.candidates)}
				</Container>
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
};

export default connect(mapStateToProps, actionCreators)(Candidates);
