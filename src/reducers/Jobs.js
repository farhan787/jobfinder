export default (state = [], action) => {
	switch (action.type) {
		case 'POST_JOB':
			return [...state, action.payload.data];

		case 'FETCH_ADMIN_JOBS':
			return action.payload.data;

		case 'DELETE_ADMIN_JOB':
			return state.filter((job) => job.uuid !== action.payload.uuid);

		case 'LOG_OUT':
			return [];

		default:
			return state;
	}
};
