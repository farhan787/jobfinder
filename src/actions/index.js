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

export const postJob = (formValues, recruiter) => async (dispatch) => {
	const response = await request.post(`/jobs`, formValues, {
		headers: {
			authToken: recruiter.authToken,
		},
	});
	dispatch({
		type: 'POST_JOB',
		payload: response.data,
	});
	history.push('/recruiter/portal');
};

export const fetchPostedJobs = (recruiter) => async (dispatch) => {
	const response = await request.get('/recruiters/jobs', {
		headers: {
			authToken: recruiter.authToken,
		},
	});
	dispatch({
		type: 'FETCH_POSTED_JOBS',
		payload: response.data,
	});
};

export const fetchAvailableJobs = (candidate) => async (dispatch) => {
	const response = await request.get('/candidates/jobs', {
		headers: {
			authToken: candidate.authToken,
		},
	});
	dispatch({
		type: 'FETCH_AVAILABLE_JOBS',
		payload: response.data,
	});
};

export const applyToJob = (candidate, job) => async (dispatch) => {
	await request.post(
		`/jobs/apply/${job.uuid}`,
		{},
		{
			headers: {
				authToken: candidate.authToken,
			},
		}
	);
	dispatch({
		type: 'APPLY_TO_JOB',
		payload: { job },
	});
};

export const fetchAppliedJobs = (candidate) => async (dispatch) => {
	const response = await request.get(`/candidates/applied/jobs`, {
		headers: {
			authToken: candidate.authToken,
		},
	});
	dispatch({
		type: 'FETCH_APPLIED_JOBS',
		payload: response.data,
	});
};

export const fetchJobCandidates = (recruiter, job) => async (dispatch) => {
	const response = await request.get(`/candidates/${job.uuid}`, {
		headers: {
			authToken: recruiter.authToken,
		},
	});
	dispatch({
		type: 'FETCH_JOB_CANDIDATES',
		payload: response.data,
	});
};
