import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Container, Row, Col, Image } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';

import './styles.css';

import { connect } from 'react-redux';
import { users } from '../../config';
import history from '../../history';

const styles = {
	navbar: {
		color: 'white',
	},
};

class LandingPage extends Component {
	componentDidMount() {
		const user = this.props.loggedInUser;
		if (user) {
			if (user.userType === users.admin.type) {
				history.push('/admin/dashboard');
			} else if (user.userType === users.candidate.type) {
				history.push('/candidate/dashboard');
			} else if (user.userType === users.recruiter.type) {
				history.push('/recruiter/dashboard');
			}
		}
	}

	render() {
		return (
			<div>
				<Navbar>
					<Navbar.Brand>
						<Link style={styles.navbar} to='/'>
							Job Finder
						</Link>
					</Navbar.Brand>
					<Navbar.Toggle />
					<Navbar.Collapse className='justify-content-end'>
						<Navbar.Text>
							<Link style={styles.navbar} to='/signup'>
								Sign Up
							</Link>
						</Navbar.Text>
						<Navbar.Text>
							<Link style={styles.navbar} to='/login'>
								Log in
							</Link>
						</Navbar.Text>
					</Navbar.Collapse>
				</Navbar>

				<Container>
					<Jumbotron>
						<h2>Welcome to Job Finder</h2>
						<p>We help people like you to find their Dream Job:)</p>
						<button className='ui button primary'>Learn More</button>
					</Jumbotron>
					<Row className='show-grid text-center'>
						<Col xs={12} sm={6} lg={4} className='person-wrapper'>
							<Image
								src={require('../../assets/person-1.jpg')}
								roundedCircle
								className='profile-pic'
							/>
							<h3>Frank</h3>
							<p>
								That's a crooked tree. We'll send him to Washington. These
								little son of a guns hide in your brush and you just have to
								push them out.
							</p>
						</Col>
						<Col xs={12} sm={6} lg={4} className='person-wrapper'>
							<Image
								src={require('../../assets/person-2.jpg')}
								roundedCircle
								className='profile-pic'
							/>
							<h3>Vanessa</h3>
							<p>
								That's a crooked tree. We'll send him to Washington. These
								little son of a guns hide in your brush and you just have to
								push them out.
							</p>
						</Col>
						<Col xs={12} sm={6} lg={4} className='person-wrapper'>
							<Image
								src={require('../../assets/person-3.jpg')}
								roundedCircle
								className='profile-pic'
							/>
							<h3>Riff</h3>
							<p>
								That's a crooked tree. We'll send him to Washington. These
								little son of a guns hide in your brush and you just have to
								push them out.
							</p>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loggedInUser: state.loggedInUser,
	};
};

export default connect(mapStateToProps)(LandingPage);
