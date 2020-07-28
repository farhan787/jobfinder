import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { deleteAdminCandidate, fetchAdminCandidates } from '../actions';

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
						<Col>{candidate.name}</Col>
						<Col>{candidate.skills}</Col>
						<Col>{candidate.email}</Col>
					</Row>

					<Button
						variant='danger'
						style={styles.deleteJob}
						onClick={() => {
							this.props.deleteAdminCandidate(admin, candidate);
							alert('Deleting candidate');
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

export default connect(mapStateToProps, {
	deleteAdminCandidate,
	fetchAdminCandidates,
})(Candidates);
