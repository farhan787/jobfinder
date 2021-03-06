import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import {
  deleteAdminRecruiter,
  fetchAdminRecruiters,
  logOut,
} from '../../actions';
import { users } from '../../config';
import history from '../../history';
import Pagination from '../../components/Pagination';
import RenderRecruiters from '../../components/Admin/RenderRecruiters';

const styles = {
  row: { marginTop: '40px' },
  recruitersListContainer: {
    marginTop: '50px',
  },
  recruiterHeader: {
    borderRadius: '6px',
    margin: '10px',
    padding: '15px',
    fontFamily: 'sans-serif',
    backgroundColor: '#000',
    color: '#fff',
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

let recruitersLoaded = false;

class Recruiters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      recruitersPerPage: 5,
    };
  }

  componentDidMount() {
    const admin = this.props.loggedInUser;
    if (admin) {
      if (admin.userType !== users.admin.type) {
        history.push('/login');
      }
    }

    this.props.fetchAdminRecruiters(admin);
    recruitersLoaded = true;
  }

  paginate = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  render() {
    if (!recruitersLoaded) {
      return <Spinner animation="border" />;
    }

    if (!this.props.recruiters.length) {
      return (
        <Container>
          <Helmet>
            <title>Recruiters</title>
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
          <h1 style={{ marginTop: '80px' }}>No Recruiter Signed up yet:(</h1>
        </Container>
      );
    }

    const indexOfLastRecruiter =
      this.state.currentPage * this.state.recruitersPerPage;
    const indexOfFirstRecruiter =
      indexOfLastRecruiter - this.state.recruitersPerPage;
    const currentRecruiters = this.props.recruiters.slice(
      indexOfFirstRecruiter,
      indexOfLastRecruiter
    );

    return (
      <Container>
        <Helmet>
          <title>Recruiters</title>
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

        <Container style={styles.recruitersListContainer}>
          <Row>
            <Col>
              <h1>Recruiters</h1>
            </Col>
          </Row>

          <Row style={styles.recruiterHeader}>
            <Col md={2}>Name</Col>
            <Col md={4}>Email</Col>
            <Col md={4}>Phone</Col>
            <Col md={2}></Col>
          </Row>

          <RenderRecruiters
            recruiters={currentRecruiters}
            admin={this.props.loggedInUser}
            deleteAdminRecruiter={this.props.deleteAdminRecruiter}
          />
        </Container>
        <Pagination
          currentPage={this.state.currentPage}
          itemsPerPage={this.state.recruitersPerPage}
          totalItems={this.props.recruiters.length}
          paginate={this.paginate}
        />
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
  logOut,
};

export default connect(mapStateToProps, actionCreators)(Recruiters);
