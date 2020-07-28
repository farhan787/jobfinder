import React, { Component } from 'react';
import { passwordMinLength, users } from '../../config';
import { Container, Col, Row } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signUp } from '../../actions';

const ALPHABET_SPACE_REGEX = /^[a-zA-Z ]*$/;

const styles = {
	homeLink: {
		textDecoration: 'none',
	},
	headerRow: {
		marginTop: '30px',
		marginBottom: '30px',
	},
};

class Signup extends Component {
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
		this.props.signUp(formValues, formValues.userType);
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
							<Field name='name' component={this.renderInput} label='Name' />

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

							<Field name='phone' component={this.renderInput} label='Phone' />

							<Field
								name='skills'
								component={this.renderInput}
								label='Skills'
							/>

							<Field
								name='userType'
								component={this.renderInput}
								label='candidate or recruiter??'
							/>

							<button className='ui button primary'>Signup</button>
						</form>

						<Link to='/login'>
							<small>Already have an account?</small>
						</Link>
					</Col>{' '}
				</Row>
			</Container>
		);
	}
}

const validate = (formValues) => {
	const errors = {};
	if (!formValues.name) {
		errors.name = 'You must enter a name';
	}
	if (formValues.name && !formValues.name.match(ALPHABET_SPACE_REGEX)) {
		errors.name = 'Name can only contain alphabets';
	}

	if (!formValues.email) {
		errors.email = 'You must enter an email';
	}

	if (!formValues.password) {
		errors.password = 'You must enter a password';
	}
	if (formValues.password && formValues.password.length < passwordMinLength) {
		errors.password = 'Password must be at least 6 characters long';
	}

	if (!formValues.phone) {
		errors.phone = 'You must enter a phone';
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

const formWrapped = reduxForm({
	form: 'signup',
	validate,
})(Signup);

export default connect(null, { signUp })(formWrapped);
