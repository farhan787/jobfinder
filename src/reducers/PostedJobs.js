export default (state = [], action) => {
	switch (action.type) {
		case 'FETCH_POSTED_JOBS':
			return action.payload.data;

		case 'DELETE_RECRUITER_JOB':
			return state.filter((job) => job.uuid !== action.payload.uuid);

		default:
			return state;
	}
};
