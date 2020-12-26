import request from '../apis';
import history from '../history';
import {
  LOG_IN,
  SIGN_UP,
  LOG_OUT,
  POST_JOB,
  FETCH_POSTED_JOBS,
  FETCH_AVAILABLE_JOBS,
  APPLY_TO_JOB,
  FETCH_APPLIED_JOBS,
  FETCH_JOB_CANDIDATES,
  DELETE_RECRUITER_JOB,
  FETCH_ADMIN_JOBS,
  DELETE_ADMIN_JOB,
  FETCH_ADMIN_CANDIDATES,
  DELETE_ADMIN_CANDIDATE,
  FETCH_ADMIN_RECRUITERS,
  DELETE_ADMIN_RECRUITER,
  FETCH_ADMIN_CANDIDATE_JOBS,
} from '../common/constants';

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
    history.push('/candidate/dashboard');
  } else if (userType === users.recruiter.type) {
    history.push('/recruiter/dashboard');
  } else if (userType === users.admin.type) {
    history.push('/admin/dashboard');
  }
};

export const logOut = () => (dispatch) => {
  localStorage.removeItem('state');
  dispatch({
    type: LOG_OUT,
  });
  history.push('/');
};

export const postJob = (formValues, recruiter) => async (dispatch) => {
  const response = await request.post(`/jobs`, formValues, {
    headers: {
      authToken: recruiter.authToken,
    },
  });
  dispatch({
    type: POST_JOB,
    payload: response.data,
  });
  history.push('/recruiter/dashboard');
};

export const fetchPostedJobs = (recruiter) => async (dispatch) => {
  const response = await request.get('/recruiters/jobs', {
    headers: {
      authToken: recruiter.authToken,
    },
  });
  dispatch({
    type: FETCH_POSTED_JOBS,
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
    type: FETCH_AVAILABLE_JOBS,
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
    type: APPLY_TO_JOB,
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
    type: FETCH_APPLIED_JOBS,
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
    type: FETCH_JOB_CANDIDATES,
    payload: response.data,
  });
};

export const fetchAdminCandidateJobs = (admin, candidate) => async (
  dispatch
) => {
  const response = await request.get(`/candidates/${candidate.uuid}/jobs`, {
    headers: {
      authToken: admin.authToken,
    },
  });
  dispatch({
    type: FETCH_ADMIN_CANDIDATE_JOBS,
    payload: response.data,
  });
};

export const deleteRecruiterJob = (recruiter, job) => async (dispatch) => {
  await request.delete(`/jobs/${job.uuid}`, {
    headers: {
      authToken: recruiter.authToken,
    },
  });

  dispatch({
    type: DELETE_RECRUITER_JOB,
    payload: job,
  });
};

export const fetchAdminJobs = (admin) => async (dispatch) => {
  const response = await request.get('/jobs', {
    headers: { authToken: admin.authToken },
  });

  dispatch({
    type: FETCH_ADMIN_JOBS,
    payload: response.data,
  });
};

export const deleteAdminJob = (admin, job) => async (dispatch) => {
  await request.delete(`/jobs/${job.uuid}`, {
    headers: {
      authToken: admin.authToken,
    },
  });

  dispatch({
    type: DELETE_ADMIN_JOB,
    payload: job,
  });
};

export const fetchAdminCandidates = (admin) => async (dispatch) => {
  const response = await request.get('/candidates', {
    headers: { authToken: admin.authToken },
  });
  dispatch({
    type: FETCH_ADMIN_CANDIDATES,
    payload: response.data,
  });
};

export const deleteAdminCandidate = (admin, candidate) => async (dispatch) => {
  await request.delete(`/candidates/${candidate.uuid}`, {
    headers: {
      authToken: admin.authToken,
    },
  });

  dispatch({
    type: DELETE_ADMIN_CANDIDATE,
    payload: candidate,
  });
};

export const fetchAdminRecruiters = (admin) => async (dispatch) => {
  const response = await request.get('/recruiters', {
    headers: { authToken: admin.authToken },
  });
  dispatch({
    type: FETCH_ADMIN_RECRUITERS,
    payload: response.data,
  });
};

export const deleteAdminRecruiter = (admin, recruiter) => async (dispatch) => {
  await request.delete(`/recruiters/${recruiter.uuid}`, {
    headers: {
      authToken: admin.authToken,
    },
  });

  dispatch({
    type: DELETE_ADMIN_RECRUITER,
    payload: recruiter,
  });
};
