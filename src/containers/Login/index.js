import React, { Component } from 'react';
import { passwordMinLength, users } from '../../config';
import { Container, Col, Row } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { logIn } from '../../actions';

const styles = {
	homeLink: {
		textDecoration: 'none',
	},
	headerRow: {
		marginTop: '30px',
		marginBottom: '30px',
	},
};

class Login extends Component {
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
		} else if (formValues.userType === users.admin.type) {
			formValues.role = users.admin.role;
		}
		this.props.logIn(formValues, formValues.userType);
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
				</Row>

				<Row>
					<Col>
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
								label='admin or candidate or recruiter??'
							/>

							<button className='ui button primary'>Login</button>
						</form>
					</Col>{' '}
				</Row>
			</Container>
		);
	}
}

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
		![users.admin.type, users.candidate.type, users.recruiter.type].includes(
			formValues.userType
		)
	) {
		errors.userType = 'User type can be either admin or candidate or recruiter';
	}
	return errors;
};

const formWrapped = reduxForm({
	form: 'login',
	validate,
})(Login);

export default connect(null, { logIn })(formWrapped);
