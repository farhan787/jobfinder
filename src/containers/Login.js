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

const loginHandler = (event) => {
	// event.preventDefault();
	console.log(event);
};

const Login = () => {
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
						<Form.Group controlId='formBasicEmail'>
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type='email'
								placeholder='Enter email'
								required={true}
							/>
						</Form.Group>

						<Form.Group controlId='formBasicPassword'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type='password'
								placeholder='Password'
								required={true}
							/>
						</Form.Group>

						{['radio'].map((type) => (
							<div key={`inline-${type}`} className='mb-3'>
								<Form.Check
									inline
									label='Admin'
									name='userRole'
									type={type}
									id={`inline-${type}-1`}
									required={true}
								/>
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

						<Button onClick={loginHandler} variant='primary' type='submit'>
							Log in
						</Button>
					</Form>
				</Col>{' '}
			</Row>
		</Container>
	);
};

export default Login;
