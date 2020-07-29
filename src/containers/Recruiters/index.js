import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { deleteAdminRecruiter, fetchAdminRecruiters } from '../../actions';

const styles = {
	row: { marginTop: '40px' },
	recruitersListContainer: {
		marginTop: '50px',
	},
	recruiter: {
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

class Recruiters extends Component {
	componentDidMount() {
		const admin = this.props.loggedInUser;
		this.props.fetchAdminRecruiters(admin);
	}

	renderRecruiters = (recruiters) => {
		const admin = this.props.loggedInUser;

		return recruiters.map((recruiter) => {
			return (
				<div key={recruiter.email}>
					<Row style={styles.recruiter}>
						<Col md={2}>{recruiter.name}</Col>
						<Col md={4}>{recruiter.email}</Col>
						<Col md={4}>{recruiter.phone}</Col>
						<Col md={2}>
							<Button
								variant='danger'
								style={styles.deleteJob}
								onClick={() => {
									this.props.deleteAdminRecruiter(admin, recruiter);
									alert('Deleting recruiter');
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

				<Container style={styles.recruitersListContainer}>
					{this.renderRecruiters(this.props.recruiters)}
				</Container>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loggedInUser: state.loggedInUser,
		recruiters: state.recruiters,
	};
};

const actionCreators = {
	deleteAdminRecruiter,
	fetchAdminRecruiters,
};

export default connect(mapStateToProps, actionCreators)(Recruiters);
