import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchAppliedJobs, logOut } from '../../actions';
import { users } from '../../config';
import history from '../../history';
import Pagination from '../../components/Pagination';
import { Helmet } from 'react-helmet';

const styles = {
  row: { marginTop: '40px' },
  jobsListContainer: {
    marginTop: '50px',
  },
  job: {
    borderRadius: '6px',
    margin: '10px',
    padding: '15px',
    fontFamily: 'sans-serif',
    backgroundColor: '#F0F0ED',
    fontSize: '1.2rem',
    textAlign: 'center',
    alignItem: 'center',
  },
  jobHeader: {
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
  homeLink: {
    textDecoration: 'none',
  },
  headerRow: {
    marginTop: '30px',
    marginBottom: '30px',
  },
};

const renderJobs = (jobs) => {
  return jobs.map((job, index) => {
    return (
      <div key={index}>
        <Row style={styles.job}>
          <Col md={3}>{job.title}</Col>
          <Col md={6}>{job.description}</Col>
          <Col md={3}>{job.location}</Col>
        </Row>
      </div>
    );
  });
};

let appliedJobsLoaded = false;

class CandidateJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      jobsPerPage: 5,
    };
  }

  componentDidMount() {
    const candidate = this.props.loggedInUser;
    if (candidate) {
      if (candidate.userType !== users.candidate.type) {
        history.push('/login');
      }
    }
    this.props.fetchAppliedJobs(candidate);
    appliedJobsLoaded = true;
  }

  paginate = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  render() {
    if (!appliedJobsLoaded) {
      return <Spinner animation="border" />;
    }

    if (!this.props.appliedJobs.length) {
      return (
        <Container>
          <Helmet>
            <title>Applied Jobs</title>
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
          <h1 style={{ marginTop: '80px' }}>
            You did not apply to any job yet!
          </h1>
        </Container>
      );
    }

    const indexOfLastJob = this.state.currentPage * this.state.jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - this.state.jobsPerPage;
    const currentJobs = this.props.appliedJobs.slice(
      indexOfFirstJob,
      indexOfLastJob
    );

    return (
      <Container>
        <Helmet>
          <title>Applied Jobs</title>
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

        <Container style={styles.jobsListContainer}>
          <Row>
            <Col>
              <h1>Applied Jobs</h1>
            </Col>
          </Row>

          <Row style={styles.jobHeader}>
            <Col md={3}>Title</Col>
            <Col md={6}>Description</Col>
            <Col md={3}>Location</Col>
          </Row>

          {renderJobs(currentJobs)}
        </Container>

        <Pagination
          currentPage={this.state.currentPage}
          itemsPerPage={this.state.jobsPerPage}
          totalItems={this.props.appliedJobs.length}
          paginate={this.paginate}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.loggedInUser,
    appliedJobs: state.appliedJobs,
  };
};

const actionCreators = { fetchAppliedJobs, logOut };

export default connect(mapStateToProps, actionCreators)(CandidateJobs);
