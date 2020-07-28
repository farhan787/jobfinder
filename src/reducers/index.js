import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import Candidates from './Candidates';
import Jobs from './Jobs';
import Recruiters from './Recruiters';
import LoggedInUser from './LoggedInUser';

export default combineReducers({
	form: formReducer,
	loggedInUser: LoggedInUser,
	candidates: Candidates,
	recruiters: Recruiters,
	jobs: Jobs,
});
