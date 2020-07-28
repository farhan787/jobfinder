export default (state = {}, action) => {
	switch (action.type) {
		case 'LOG_IN':
			return {
				authToken: action.payload.data.authToken,
				userType: action.payload.userType,
			};

		default:
			return state;
	}
};
