import React, { Component } from 'react';
import { passwordMinLength, users } from '../../config';
import { Container, Col, Row } from 'react-bootstrap';
import history from '../../history';

import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { logIn } from '../../actions';

const styles = {
	adminLoginLink: { fontSize: '1.1rem' },
	loginButton: { marginBottom: '20px' },
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
	if (!formValues.email) {
		errors.email = 'You must enter an email';
	}
	if (!formValues.password) {
		errors.password = 'You must enter a password';
	}
	if (formValues.password && formValues.password.length < passwordMinLength) {
		errors.password = 'Password must be at least 6 characters long';
	}
	if (!formValues.userType) {
		errors.userType = 'You must enter a user type';
	}
	if (
		formValues.userType &&
		![users.candidate.type, users.recruiter.type].includes(formValues.userType)
	) {
		errors.userType = 'User type can be either candidate or recruiter';
	}
	return errors;
};

class Login extends Component {
	componentDidMount() {
		const user = this.props.loggedInUser;
		if (user) {
			if (user.userType === users.candidate.type) {
				history.push('/candidate/dashboard');
			} else if (user.userType === users.recruiter.type) {
				history.push('/recruiter/dashboard');
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
		if (formValues.userType === users.candidate.type) {
			formValues.role = users.candidate.role;
		} else if (formValues.userType === users.recruiter.type) {
			formValues.role = users.recruiter.role;
		}

		this.props
			.logIn(formValues, formValues.userType)
			.then((response) => {})
			.catch((err) => {
				alert('invalid email or password');
			});
	};

	render() {
		return (
			<Container>
				<Helmet>
					<title>Login</title>
				</Helmet>

				<Row style={styles.headerRow}>
					<Col>
						<Link to='/' style={styles.homeLink}>
							<h1>Job Finder</h1>
						</Link>
					</Col>
				</Row>

				<Row>
					<Col md={{ span: 6, offset: 3 }}>
						<form
							onSubmit={this.props.handleSubmit(this.onSubmit)}
							className='ui form error'
						>
							<Field
								name='email'
								component={this.renderInput}
								label='Email'
								type='email'
							/>

							<Field
								name='password'
								component={this.renderInput}
								label='Password'
								type='password'
							/>

							<Field
								name='userType'
								component={this.renderInput}
								label='candidate or recruiter??'
							/>

							<button className='ui button primary' style={styles.loginButton}>
								Login
							</button>
						</form>

						<Link to='/admin/login'>
							<small style={styles.adminLoginLink}>Admin Login?</small>
						</Link>
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
	form: 'login',
	validate,
})(Login);

const actionCreators = { logIn };

export default connect(mapStateToProps, actionCreators)(formWrapped);
