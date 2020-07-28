import request from '../apis';
import history from '../history';
import { LOG_IN, SIGN_UP } from './types';
import { users } from '../config';

export const signUp = (formValues, userType) => async (dispatch) => {
	const response = await request.post(`/${userType}s/signup`, formValues);
	dispatch({
		type: SIGN_UP,
		payload: response.data,
	});
	history.push('/login');
};

export const logIn = (formValues, userType) => async (dispatch) => {
	const response = await request.post(`/${userType}s/login`, formValues);
	if (response) response.data.userType = userType;
	dispatch({
		type: LOG_IN,
		payload: response.data,
	});

	if (userType === users.candidate.type) {
		history.push('/candidate/portal');
	} else if (userType === users.recruiter.type) {
		history.push('/recruiter/portal');
	} else if (userType === users.admin.type) {
		history.push('/admin/portal');
	}
};
