import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import history from '../../history';

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

const handleDelete = (job, recruiter, deleteRecruiterJob) => {
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
			deleteRecruiterJob(recruiter, job);
			history.push('/recruiter/dashboard');
		}
	});
};

const RenderPostedJobs = ({ jobs, recruiter, deleteRecruiterJob }) => {
	return jobs.map((job, index) => {
		return (
			<div key={index}>
				<Link
					to={{
						pathname: '/job/candidates',
						state: {
							job,
						},
					}}
					style={styles.link}
				>
					<Row style={styles.job}>
						<Col md={2}>{job.title}</Col>
						<Col md={6}>{job.description}</Col>
						<Col md={2}>{job.location}</Col>
						<Col md={2}>
							<Button
								variant='danger'
								onClick={() => {
									handleDelete(job, recruiter, deleteRecruiterJob);
								}}
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

export default RenderPostedJobs;
