import { USER_WAITLIST, USER_WAITLIST_ERROR } from '../actions/types';

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_WAITLIST:
      return action.payload;
    case USER_WAITLIST_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}
