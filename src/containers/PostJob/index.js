import React, { Component } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { users } from '../../config';
import history from '../../history';

import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { postJob, logOut } from '../../actions';

const styles = {
	homeLink: {
		textDecoration: 'none',
	},
	headerRow: {
		marginTop: '30px',
		marginBottom: '30px',
	},
};

const validate = (formValues) => {
	const errors = {};
	if (!formValues.title) {
		errors.title = 'You must enter a title';
	}
	if (formValues.title) {
		if (formValues.title.length < 3) {
			errors.title = 'Title should be minimun of length 3';
		}
		if (formValues.title.length > 50) {
			errors.title = 'Title should be maximum of length 50';
		}
	}

	if (!formValues.description) {
		errors.description = 'You must enter a description';
	}
	if (formValues.description) {
		if (formValues.description.length < 3) {
			errors.description = 'Description should be minimun of length 3';
		}
		if (formValues.description.length > 150) {
			errors.description = 'Description should be maximum of length 150';
		}
	}

	if (!formValues.location) {
		errors.location = 'You must enter a location';
	}
	if (formValues.location) {
		if (formValues.location.length < 3) {
			errors.location = 'Location should be minimun of length 3';
		}
		if (formValues.location.length > 50) {
			errors.location = 'Location should be maximum of length 50';
		}
	}

	return errors;
};

class PostJob extends Component {
	constructor(props) {
		super(props);
		this.state = { postButtonDisabled: false };
	}

	componentDidMount() {
		const user = this.props.loggedInUser;
		if (user) {
			if (user.userType !== users.recruiter.type) {
				history.push('/login');
			}
		}
	}

	renderError({ error, touched }) {
		if (touched && error) {
			return (
				<div className='ui error message'>
					<div className='ui header'>{error}</div>
				</div>
			);
		}
	}

	renderInput = ({ input, label, meta, type = 'text' }) => {
		const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<input {...input} type={type} />
				{this.renderError(meta)}
			</div>
		);
	};

	onSubmit = (formValues) => {
		const recruiter = this.props.loggedInUser;
		this.setState({ postButtonDisabled: true });

		this.props
			.postJob(formValues, recruiter)
			.then((response) => {})
			.catch((err) => {
				alert('Something went wrong, try some time later!');
			});
	};

	render() {
		return (
			<Container>
				<Helmet>
					<title>Post a Job</title>
				</Helmet>

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

				<Row>
					<Col md={{ span: 6, offset: 3 }}>
						<form
							onSubmit={this.props.handleSubmit(this.onSubmit)}
							className='ui form error'
						>
							<Field name='title' component={this.renderInput} label='Title' />

							<Field
								name='description'
								component={this.renderInput}
								label='Description'
							/>

							<Field
								name='location'
								component={this.renderInput}
								label='Location'
							/>

							<button
								className='ui button primary'
								disabled={this.state.postButtonDisabled}
							>
								Post Job
							</button>
						</form>
					</Col>{' '}
				</Row>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loggedInUser: state.loggedInUser,
	};
};

const formWrapped = reduxForm({
	form: 'postJob',
	validate,
})(PostJob);

const actionCreators = { logOut, postJob };

export default connect(mapStateToProps, actionCreators)(formWrapped);
