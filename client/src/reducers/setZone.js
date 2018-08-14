import { ZONE_SELECTED } from '../actions/types';

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {

  switch (action.type) {
    case ZONE_SELECTED:
      return action.payload;
    default:
      return state;
  }
}
