export default (state = [], action) => {
	switch (action.type) {
		case 'FETCH_AVAILABLE_JOBS':
			return action.payload.data;

		case 'APPLY_TO_JOB':
			if (state.length) {
				return state.filter((job) => job.uuid !== action.payload.job.uuid);
			}
			return state;

		case 'DELETE_RECRUITER_JOB':
			return state.filter((job) => job.uuid !== action.payload.uuid);

		case 'LOG_OUT':
			return [];

		default:
			return state;
	}
};
