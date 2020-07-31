import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';
import history from './history';
import { googleAnalyticsId } from './config';

import LandingPage from './containers/LandingPage/';
import Login from './containers/Login/';
import Signup from './containers/Signup/';
import RecruiterDashboard from './containers/RecruiterDashboard/';
import PostJob from './containers/PostJob/';
import JobCandidates from './containers/JobCandidates/';
import CandidateDashboard from './containers/CandidateDashboard/';
import CandidateJobs from './containers/CandidateJobs/';
import AdminLogin from './containers/AdminLogin/';
import AdminDashboard from './containers/AdminDashboard/';
import Jobs from './containers/Jobs/';
import Candidates from './containers/Candidates/';
import Recruiters from './containers/Recruiters/';
import AdminCandidateJobs from './containers/AdminCandidateJobs/';
import NotFound from './containers/ErrorPages/NotFound';

function initializeAnalytics() {
	ReactGA.initialize(googleAnalyticsId);
	ReactGA.pageview('/');
}

const App = () => {
	initializeAnalytics();

	return (
		<div className='ui container'>
			<Router history={history}>
				<div>
					<Switch>
						<Route path='/' exact component={LandingPage} />
						<Route path='/signup' exact component={Signup} />
						<Route path='/login' exact component={Login} />

						<Route path='/recruiter/dashboard' component={RecruiterDashboard} />
						<Route path='/post/job' component={PostJob} />
						<Route path='/job/candidates' component={JobCandidates} />

						<Route path='/candidate/dashboard' component={CandidateDashboard} />
						<Route path='/candidate/jobs' component={CandidateJobs} />

						<Route path='/admin/login' component={AdminLogin} />
						<Route path='/admin/dashboard' component={AdminDashboard} />
						<Route path='/jobs' component={Jobs} />
						<Route path='/candidates' component={Candidates} />
						<Route path='/recruiters' component={Recruiters} />
						<Route
							path='/admin/candidate/jobs'
							component={AdminCandidateJobs}
						/>

						<Route component={NotFound} />
					</Switch>
				</div>
			</Router>
		</div>
	);
};

export default App;
