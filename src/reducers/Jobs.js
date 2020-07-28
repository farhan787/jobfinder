export default (state = [], action) => {
	switch (action.type) {
		case 'POST_JOB':
			return [...state, action.payload.data];

		default:
			return state;
	}
};
