import React from 'react';
import { Button, Container, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const styles = {
	homeLink: {
		textDecoration: 'none',
	},
	headerRow: {
		marginTop: '30px',
		marginBottom: '30px',
	},
};

const PostJob = () => {
	return (
		<Container>
			<Row style={styles.headerRow}>
				<Col>
					<Link to='/' style={styles.homeLink}>
						<h1>Job Finder</h1>
					</Link>
				</Col>
			</Row>

			<Row>
				<Col>
					<Form>
						<Form.Group controlId='formBasicTitle'>
							<Form.Label>Title</Form.Label>
							<Form.Control
								type='text'
								placeholder='Job title'
								required={true}
							/>
						</Form.Group>

						<Form.Group controlId='formBasicDescription'>
							<Form.Label>Description</Form.Label>
							<Form.Control type='text' placeholder='Job description' />
						</Form.Group>

						<Form.Group controlId='formBasicLocation'>
							<Form.Label>Location</Form.Label>
							<Form.Control type='text' placeholder='Job location' />
						</Form.Group>

						<Button variant='primary' type='submit'>
							Post Job
						</Button>
					</Form>
				</Col>{' '}
			</Row>
		</Container>
	);
};

export default PostJob;
