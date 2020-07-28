import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';

const styles = {
	row: { marginTop: '40px' },
};

const LandingPage = () => {
	return (
		<Container>
			<Row style={styles.row}>
				<Col>
					<Link to='/signup'>
						<Button>Signup</Button>
					</Link>
				</Col>
				<Col>
					<Link to='/login'>
						<Button>Login</Button>
					</Link>
				</Col>
			</Row>
			<Row style={styles.row}>
				<Col>
					<h2>Landing Page</h2>
				</Col>
			</Row>
		</Container>
	);
};

export default LandingPage;
