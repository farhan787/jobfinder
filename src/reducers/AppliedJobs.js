import {
	APPLY_TO_JOB,
	DELETE_RECRUITER_JOB,
	FETCH_APPLIED_JOBS,
	LOG_OUT,
} from '../common/constants';

export default (state = [], action) => {
	switch (action.type) {
		case APPLY_TO_JOB:
			return [action.payload.job];

		case FETCH_APPLIED_JOBS:
			return action.payload.data;

		case DELETE_RECRUITER_JOB:
			let newState = [];
			for (let i = 0; i < state.length; i++) {
				const job = state[i];
				if (job.uuid !== action.payload.uuid) {
					newState.push(job);
				}
			}
			return newState;

		case LOG_OUT:
			return [];

		default:
			return state;
	}
};
