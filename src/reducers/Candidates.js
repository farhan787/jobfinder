import {
	LOG_OUT,
	FETCH_ADMIN_CANDIDATES,
	DELETE_ADMIN_CANDIDATE,
} from '../common/constants';

export default (state = [], action) => {
	switch (action.type) {
		case FETCH_ADMIN_CANDIDATES:
			return action.payload.data;

		case DELETE_ADMIN_CANDIDATE:
			let newState = [];
			for (let i = 0; i < state.length; i++) {
				const candidate = state[i];
				if (candidate.uuid !== action.payload.uuid) {
					newState.push(candidate);
				}
			}
			return newState;

		case LOG_OUT:
			return [];

		default:
			return state;
	}
};
