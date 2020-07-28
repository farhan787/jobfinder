import {
	FETCH_ADMIN_RECRUITERS,
	DELETE_ADMIN_RECRUITER,
	LOG_OUT,
} from '../common/constants';

export default (state = [], action) => {
	switch (action.type) {
		case FETCH_ADMIN_RECRUITERS:
			return action.payload.data;

		case DELETE_ADMIN_RECRUITER:
			return state.filter(
				(recruiter) => recruiter.uuid !== action.payload.uuid
			);

		case LOG_OUT:
			return [];

		default:
			return state;
	}
};
