import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';

const styles = {
	recruiter: {
		borderRadius: '6px',
		margin: '10px',
		padding: '15px',
		fontFamily: 'sans-serif',
		backgroundColor: '#F0F0ED',
		fontSize: '1.2rem',
		textAlign: 'center',
		alignItem: 'center',
	},
};

const handleDelete = (recruiter, admin, deleteAdminRecruiter) => {
	Swal.fire({
		title: `Delete recruiter "${recruiter.name}" ?`,
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
				`recruiter "${recruiter.name}" has been deleted.`,
				'success'
			);
			deleteAdminRecruiter(admin, recruiter);
		}
	});
};

const RenderRecruiters = ({ recruiters, admin, deleteAdminRecruiter }) => {
	return recruiters.map((recruiter) => {
		return (
			<div key={recruiter.email}>
				<Row style={styles.recruiter}>
					<Col md={2}>{recruiter.name}</Col>
					<Col md={4}>{recruiter.skills}</Col>
					<Col md={4}>{recruiter.email}</Col>
					<Col md={2}>
						<Button
							variant='danger'
							onClick={() =>
								handleDelete(recruiter, admin, deleteAdminRecruiter)
							}
						>
							Delete
						</Button>
					</Col>
				</Row>
			</div>
		);
	});
};

export default RenderRecruiters;
