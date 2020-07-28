export default (state = [], action) => {
	switch (action.type) {
		case 'FETCH_JOB_CANDIDATES':
			return action.payload.data;

		default:
			return state;
	}
};
