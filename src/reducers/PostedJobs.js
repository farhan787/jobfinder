export default (state = [], action) => {
	switch (action.type) {
		case 'FETCH_POSTED_JOBS':
			return action.payload.data;

		default:
			return state;
	}
};
