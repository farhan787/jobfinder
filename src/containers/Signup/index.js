import React, { Component } from 'react';
import { passwordMinLength, users } from '../../config';
import { Container, Col, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signUp } from '../../actions';

const ALPHABET_SPACE_REGEX = /^[a-zA-Z ]*$/;
const PHONE_REGEX = /^[0-9]+$/;

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
	if (!formValues.name) {
		errors.name = 'You must enter a name';
	}
	if (formValues.name && !formValues.name.match(ALPHABET_SPACE_REGEX)) {
		errors.name = 'Name can only contain alphabets';
	}
	if (formValues.name && formValues.name.length < 3) {
		errors.name = 'Name should be minimun of length 3';
	}
	if (formValues.name && formValues.name.length > 50) {
		errors.name = 'Name should be maximum of length 50';
	}

	if (formValues.skills) {
		if (formValues.skills.length < 3) {
			errors.skills = 'Skills should be minimunm of length 3';
		}
		if (formValues.skills.length > 50) {
			errors.skills = 'Skills should be maximum of length 50';
		}
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
	if (formValues.phone) {
		if (formValues.phone.length != 10) {
			errors.phone = 'Phone number length must be 10';
		}
		if (!formValues.phone.match(PHONE_REGEX)) {
			errors.phone = 'Phone number must only contain numerical digits';
		}
	}

	if (!formValues.userType) {
		errors.userType = 'You must enter a user type';
	}

	return errors;
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

	renderInput = ({ input, label, meta, type = 'text', placeholder = '' }) => {
		const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<input {...input} type={type} placeholder={placeholder} />
				{this.renderError(meta)}
			</div>
		);
	};

	renderUserType = ({ label, meta }) => {
		const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<Field name='userType' component='select'>
					<option></option>
					<option value='candidate'>Candidate</option>
					<option value='recruiter'>Recruiter</option>
				</Field>
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
			.signUp(formValues, formValues.userType)
			.then((response) => {})
			.catch((err) => {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: err.response.data.error.message,
				});
			});
	};

	render() {
		return (
			<Container>
				<Helmet>
					<title>Signup</title>
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
								name='userType'
								component={this.renderUserType}
								label='Signup for'
							/>

							<Field
								name='skills'
								component={this.renderInput}
								label='Skills'
								placeholder='Only if you are a candidate'
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

const formWrapped = reduxForm({
	form: 'signup',
	validate,
})(Signup);

const actionCreators = { signUp };

export default connect(null, actionCreators)(formWrapped);
