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

const Signup = () => {
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
						<Form.Group controlId='formBasicName'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter your name'
								required={true}
							/>
						</Form.Group>

						<Form.Group controlId='formBasicEmail'>
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type='email'
								placeholder='Enter email'
								required={true}
							/>
							<Form.Text className='text-muted'>
								We'll never share your email with anyone else.
							</Form.Text>
						</Form.Group>

						<Form.Group controlId='formBasicPhone'>
							<Form.Label>Phone</Form.Label>
							<Form.Control type='text' placeholder='Enter phone number' />
						</Form.Group>

						<Form.Group controlId='formBasicPassword'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								minLength={6}
								type='password'
								placeholder='Password'
								required={true}
							/>
						</Form.Group>

						<Form.Group controlId='formBasicSkills'>
							<Form.Label>Skills</Form.Label>
							<Form.Control
								type='text'
								placeholder='Skills (if you are a candidate)'
							/>
						</Form.Group>

						{['radio'].map((type) => (
							<div key={`inline-${type}`} className='mb-3'>
								<Form.Check
									inline
									label='Candidate'
									name='userRole'
									type={type}
									id={`inline-${type}-2`}
									required={true}
								/>
								<Form.Check
									inline
									label='Recruiter'
									name='userRole'
									type={type}
									id={`inline-${type}-3`}
									required={true}
								/>
							</div>
						))}

						<Button variant='primary' type='submit'>
							Sign up
						</Button>
					</Form>
					<Link to='/login'>
						<small>Already have an account?</small>
					</Link>
				</Col>{' '}
			</Row>
		</Container>
	);
};

export default Signup;
