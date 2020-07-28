import {
	FETCH_POSTED_JOBS,
	DELETE_RECRUITER_JOB,
	LOG_OUT,
} from '../common/constants';

export default (state = [], action) => {
	switch (action.type) {
		case FETCH_POSTED_JOBS:
			return action.payload.data;

		case DELETE_RECRUITER_JOB:
			return state.filter((job) => job.uuid !== action.payload.uuid);

		case LOG_OUT:
			return [];

		default:
			return state;
	}
};
