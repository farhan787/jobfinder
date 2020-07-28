import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from './history';

import LandingPage from './containers/LandingPage/';
import Login from './containers/Login/';
import Signup from './containers/Signup/';
import RecruiterDashboard from './containers/RecruiterDashboard/';
import PostJob from './containers/PostJob/';
import JobCandidates from './containers/JobCandidates/';
import CandidateDashboard from './containers/CandidateDashboard/';
import CandidateJobs from './containers/CandidateJobs/';
import AdminDashboard from './containers/AdminDashboard/';
import Jobs from './containers/Jobs/';
import Candidates from './containers/Candidates/';
import Recruiters from './containers/Recruiters/';

const App = () => {
	return (
		<div className='ui container'>
			<Router history={history}>
				<div>
					<Route path='/' exact component={LandingPage} />
					<Route path='/signup' exact component={Signup} />
					<Route path='/login' exact component={Login} />

					<Route path='/recruiter/dashboard' component={RecruiterDashboard} />
					<Route path='/post/job' component={PostJob} />
					<Route path='/job/candidates' component={JobCandidates} />

					<Route path='/candidate/dashboard' component={CandidateDashboard} />
					<Route path='/candidate/jobs' component={CandidateJobs} />

					<Route path='/admin/dashboard' component={AdminDashboard} />
					<Route path='/jobs' component={Jobs} />
					<Route path='/candidates' component={Candidates} />
					<Route path='/recruiters' component={Recruiters} />
				</div>
			</Router>
		</div>
	);
};

export default App;
