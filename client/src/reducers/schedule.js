import { UPDATE_SCHEDULE, UPDATE_ERROR } from '../actions/types';

const INITIAL_STATE = {
  schedule: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_SCHEDULE:
      return { ...state, schedule: action.payload.schedule };
    case UPDATE_ERROR:
      return { ...state, errorMessage: action.payload.errorMessage };
    default:
      return state;
  }
}
