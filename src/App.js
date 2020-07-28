import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from './history';

import LandingPage from './containers/LandingPage';
import Login from './containers/Login';
import Signup from './containers/Signup';
import RecruiterPortal from './containers/RecruiterPortal';
import PostJob from './containers/PostJob';
import JobCandidates from './containers/JobCandidates';
import CandidatePortal from './containers/CandidatePortal';
import CandidateJobs from './containers/CandidateJobs';
import AdminPortal from './containers/AdminPortal';
import Jobs from './containers/Jobs';
import Candidates from './containers/Candidates';
import Recruiters from './containers/Recruiters';

const App = () => {
	return (
		<div className='ui container'>
			<Router history={history}>
				<div>
					<Route path='/' exact component={LandingPage} />
					<Route path='/signup' exact component={Signup} />
					<Route path='/login' exact component={Login} />

					<Route path='/recruiter/portal' component={RecruiterPortal} />
					<Route path='/post/job' component={PostJob} />
					<Route path='/job/candidates' component={JobCandidates} />

					<Route path='/candidate/portal' component={CandidatePortal} />
					<Route path='/candidate/jobs' component={CandidateJobs} />

					<Route path='/admin/portal' component={AdminPortal} />
					<Route path='/jobs' component={Jobs} />
					<Route path='/candidates' component={Candidates} />
					<Route path='/recruiters' component={Recruiters} />
				</div>
			</Router>
		</div>
	);
};

export default App;
