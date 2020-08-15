import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';

const styles = {
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
	link: {
		textDecoration: 'none',
		color: 'black',
	},
};

const handleDelete = (job, admin, deleteAdminJob) => {
	Swal.fire({
		title: `Delete job with title "${job.title}" ?`,
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
				`Job with title "${job.title}" has been deleted.`,
				'success'
			);
			deleteAdminJob(admin, job);
		}
	});
};

const RenderJobs = ({ jobs, admin, deleteAdminJob }) => {
	return jobs.map((job, index) => {
		return (
			<div key={index}>
				<Row style={styles.job}>
					<Col md={2}>{job.title}</Col>
					<Col md={6}>{job.description}</Col>
					<Col md={2}>{job.location}</Col>
					<Col md={2}>
						<Button
							variant='danger'
							onClick={() => {
								handleDelete(job, admin, deleteAdminJob);
							}}
						>
							Delete
						</Button>
					</Col>
				</Row>
			</div>
		);
	});
};

export default RenderJobs;
