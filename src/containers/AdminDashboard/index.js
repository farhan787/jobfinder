import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logOut } from '../../actions/';
import { users } from '../../config';
import { Helmet } from 'react-helmet';

import history from '../../history';

const styles = {
  row: { marginTop: '40px' },
  entitiesListContainer: {
    marginTop: '50px',
    textAlign: 'center',
  },
  entity: {
    border: '1px solid black',
    borderRadius: '6px',
    margin: '10px',
    padding: '15px',
  },
  link: {
    textDecoration: 'none',
    color: 'black',
  },
  entitiesList: {
    textDecoration: 'none',
    borderRadius: '8px',
    margin: '20px',
    padding: '15px',
    fontSize: '2.2rem',
    backgroundColor: '#ecf0f1',
    color: 'black',
    fontFamily: 'EB Garamond',
    textAlign: 'center',
    width: 'auto',
  },
  verticalCenter: {
    margin: '0',
    position: 'absolute',
    top: '50%',
    msTransform: 'translateY(-50%)',
    transform: 'translateY(-50%)',
  },
};

class AdminDashboard extends Component {
  componentDidMount() {
    const admin = this.props.loggedInUser;
    if (admin) {
      if (admin.userType !== users.admin.type) {
        history.push('/login');
      }
    }
  }

  render() {
    return (
      <Container>
        <Helmet>
          <title>Admin Dashboard</title>
        </Helmet>

        <Row style={styles.headerRow}>
          <Col>
            <Link to="/" style={styles.homeLink}>
              <h1>Job Finder</h1>
            </Link>
          </Col>
          <Row>
            <Col>
              <Link onClick={() => this.props.logOut()} to="/">
                Logout
              </Link>
            </Col>
          </Row>
        </Row>

        <Container
          style={(styles.entitiesListContainer, styles.verticalCenter)}
        >
          <Link to="/jobs">
            <Row style={styles.entitiesList}>
              <Col>Jobs</Col>
            </Row>
          </Link>

          <Link to="/candidates">
            <Row style={styles.entitiesList}>
              <Col>Candidates</Col>
            </Row>
          </Link>

          <Link to="/recruiters">
            <Row style={styles.entitiesList}>
              <Col>Recruiters</Col>
            </Row>
          </Link>
        </Container>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.loggedInUser,
  };
};

export default connect(mapStateToProps, { logOut })(AdminDashboard);
