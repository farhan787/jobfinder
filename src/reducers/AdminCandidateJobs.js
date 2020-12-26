import { FETCH_ADMIN_CANDIDATE_JOBS, LOG_OUT } from '../common/constants';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_ADMIN_CANDIDATE_JOBS:
      return action.payload.data;

    case LOG_OUT:
      return [];

    default:
      return state;
  }
};
