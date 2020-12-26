import {
  LOG_OUT,
  FETCH_AVAILABLE_JOBS,
  APPLY_TO_JOB,
  DELETE_RECRUITER_JOB,
} from '../common/constants';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_AVAILABLE_JOBS:
      return action.payload.data;

    case APPLY_TO_JOB:
      if (state.length) {
        let newState = [];
        for (let i = 0; i < state.length; i++) {
          const job = state[i];
          if (job.uuid !== action.payload.job.uuid) {
            newState.push(job);
          }
        }
        return newState;
      }
      return state;

    case DELETE_RECRUITER_JOB:
      let newState = [];
      for (let i = 0; i < state.length; i++) {
        const job = state[i];
        if (job.uuid !== action.payload.uuid) {
          newState.push(job);
        }
      }
      return newState;

    case LOG_OUT:
      return [];

    default:
      return state;
  }
};
