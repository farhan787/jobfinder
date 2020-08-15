import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import Jobs from './Jobs';
import Candidates from './Candidates';
import Recruiters from './Recruiters';
import LoggedInUser from './LoggedInUser';
import AppliedJobs from './AppliedJobs';
import AvailableJobs from './AvailableJobs';
import JobCandidates from './JobCandidates';
import PostedJobs from './PostedJobs';
import AdminCandidateJobs from './AdminCandidateJobs';

export default combineReducers({
	form: formReducer,
	loggedInUser: LoggedInUser,
	candidates: Candidates,
	recruiters: Recruiters,
	jobs: Jobs,
	appliedJobs: AppliedJobs,
	availableJobs: AvailableJobs,
	jobCandidates: JobCandidates,
	postedJobs: PostedJobs,
	adminCandidateJobs: AdminCandidateJobs,
});
