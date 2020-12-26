import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import history from '../../history';

const styles = {
  candidate: {
    borderRadius: '6px',
    margin: '10px',
    padding: '15px',
    fontFamily: 'sans-serif',
    backgroundColor: '#F0F0ED',
    fontSize: '1.2rem',
    textAlign: 'center',
    alignItem: 'center',
  },
  link: {
    textDecoration: 'none',
    color: 'black',
  },
};

const handleDelete = (candidate, admin, deleteAdminCandidate) => {
  Swal.fire({
    title: `Delete candidate "${candidate.name}" ?`,
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete!',
  }).then((result) => {
    if (result.value) {
      Swal.fire(
        'Deleted!',
        `Candidate "${candidate.name}" has been deleted.`,
        'success'
      );
      deleteAdminCandidate(admin, candidate);
      history.push('/candidates');
    }
  });
};

const RenderCandidates = ({ candidates, admin, deleteAdminCandidate }) => {
  return candidates.map((candidate) => {
    return (
      <div key={candidate.email}>
        <Link
          to={{
            pathname: '/admin/candidate/jobs',
            state: {
              candidate,
            },
          }}
          style={styles.link}
        >
          <Row style={styles.candidate}>
            <Col md={2}>{candidate.name}</Col>
            <Col md={4}>{candidate.skills}</Col>
            <Col md={4}>{candidate.email}</Col>
            <Col md={2}>
              <Button
                variant="danger"
                onClick={() =>
                  handleDelete(candidate, admin, deleteAdminCandidate)
                }
              >
                Delete
              </Button>
            </Col>
          </Row>
        </Link>
      </div>
    );
  });
};

export default RenderCandidates;
