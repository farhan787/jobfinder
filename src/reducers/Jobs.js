import {
	POST_JOB,
	FETCH_ADMIN_JOBS,
	DELETE_ADMIN_JOB,
	LOG_OUT,
} from '../common/constants';

export default (state = [], action) => {
	switch (action.type) {
		case POST_JOB:
			return [...state, action.payload.data];

		case FETCH_ADMIN_JOBS:
			return action.payload.data;

		case DELETE_ADMIN_JOB:
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
