import React, { Component } from 'react';
import { Container, Col, Row } from 'react-bootstrap';

import { Link } from 'react-router-dom';
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
	if (!formValues.description) {
		errors.description = 'You must enter a description';
	}
	if (!formValues.location) {
		errors.location = 'You must enter a location';
	}

	return errors;
};

class PostJob extends Component {
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
		this.props.postJob(formValues, recruiter);
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

							<button className='ui button primary'>Post Job</button>
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
