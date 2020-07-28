import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { deleteAdminRecruiter, fetchAdminRecruiters } from '../actions';

const styles = {
	row: { marginTop: '40px' },
	recruitersListContainer: {
		marginTop: '50px',
	},
	recruiter: {
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
						<Col>{recruiter.name}</Col>
						<Col>{recruiter.email}</Col>
						<Col>{recruiter.phone}</Col>
					</Row>

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

export default connect(mapStateToProps, {
	deleteAdminRecruiter,
	fetchAdminRecruiters,
})(Recruiters);
