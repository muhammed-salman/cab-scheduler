import { UPDATE_SCHEDULE, UPDATE_ERROR } from '../actions/types';

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_SCHEDULE:
      return action.payload;
    case UPDATE_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}
