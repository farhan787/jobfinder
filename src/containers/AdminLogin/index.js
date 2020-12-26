import React, { Component } from 'react';
import { captchaSiteKey, passwordMinLength, users } from '../../config';
import { Container, Col, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import history from '../../history';

import Recaptcha from 'react-google-invisible-recaptcha';
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
  return errors;
};

class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = { loginButtonDisabled: false };
  }

  componentDidMount() {
    const user = this.props.loggedInUser;
    if (user) {
      if (user.userType === users.candidate.type) {
        history.push('/candidate/dashboard');
      } else if (user.userType === users.recruiter.type) {
        history.push('/recruiter/dashboard');
      } else if (user.userType === users.admin.type) {
        history.push('/admin/dashboard');
      }
    }
  }

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="ui header">{error}</div>
        </div>
      );
    }
  }

  Captcha = (props) => {
    return (
      <div>
        <Recaptcha sitekey={captchaSiteKey} onChange={props.input.onChange} />
      </div>
    );
  };

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
    formValues.role = users.admin.role;
    this.setState({ loginButtonDisabled: true });
    this.props
      .logIn(formValues, users.admin.type)
      .then((response) => {})
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.error.message,
        });
        this.setState({ loginButtonDisabled: false });
      });
  };

  render() {
    return (
      <Container>
        <Helmet>
          <title>Admin Login</title>
        </Helmet>

        <Row style={styles.headerRow}>
          <Col>
            <Link to="/" style={styles.homeLink}>
              <h1>Job Finder</h1>
            </Link>
          </Col>
        </Row>

        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <form
              onSubmit={this.props.handleSubmit(this.onSubmit)}
              className="ui form error"
            >
              <Field
                name="email"
                component={this.renderInput}
                label="Email"
                type="email"
              />

              <Field
                name="password"
                component={this.renderInput}
                label="Password"
                type="password"
              />

              <Field name="captcharesponse" component={this.Captcha} />

              <button
                className="ui button primary"
                style={styles.loginButton}
                disabled={this.state.loginButtonDisabled}
              >
                Login
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
  form: 'adminLogin',
  validate,
})(AdminLogin);

const actionCreators = { logIn };

export default connect(mapStateToProps, actionCreators)(formWrapped);
