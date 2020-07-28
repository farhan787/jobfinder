export default (state = [], action) => {
	switch (action.type) {
		case 'FETCH_ADMIN_RECRUITERS':
			return action.payload.data;

		case 'DELETE_ADMIN_RECRUITER':
			return state.filter(
				(recruiter) => recruiter.uuid !== action.payload.uuid
			);

		default:
			return state;
	}
};
