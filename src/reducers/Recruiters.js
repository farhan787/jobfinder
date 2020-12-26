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
      let newState = [];
      for (let i = 0; i < state.length; i++) {
        const recruiter = state[i];
        if (recruiter.uuid !== action.payload.uuid) {
          newState.push(recruiter);
        }
      }
      return newState;

    case LOG_OUT:
      return [];

    default:
      return state;
  }
};
