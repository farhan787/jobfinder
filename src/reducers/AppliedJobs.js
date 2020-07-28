export default (state = [], action) => {
	switch (action.type) {
		case 'APPLY_TO_JOB':
			return [action.payload.job];

		case 'FETCH_APPLIED_JOBS':
			return action.payload.data;

		case 'DELETE_RECRUITER_JOB':
			return state.filter((job) => job.uuid !== action.payload.uuid);

		default:
			return state;
	}
};
