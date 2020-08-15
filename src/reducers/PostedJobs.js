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
