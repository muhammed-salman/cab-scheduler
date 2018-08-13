import { ZONE_CHANGE, ZONE_ERROR } from '../actions/types';

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case  ZONE_CHANGE:
      return action.payload;
    case ZONE_ERROR:
      return { ...state, errorMessage: action.payload.errorMessage };
    default:
      return state;
  }
}
