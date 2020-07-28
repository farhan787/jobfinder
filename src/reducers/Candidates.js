export default (state = [], action) => {
	switch (action.type) {
		case 'FETCH_ADMIN_CANDIDATES':
			return action.payload.data;

		case 'DELETE_ADMIN_CANDIDATE':
			return state.filter(
				(candidate) => candidate.uuid !== action.payload.uuid
			);

		case 'LOG_OUT':
			return [];

		default:
			return state;
	}
};
