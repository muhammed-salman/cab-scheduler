import { ZONE_CHANGE, ZONE_ERROR } from '../actions/types';

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case  ZONE_CHANGE:
      console.log(action.payload);
      return { ...state, zoneSchedule: action.payload.zoneSchedule};
    case ZONE_ERROR:
      return { ...state, errorMessage: action.payload.errorMessage };
    default:
      return state;
  }
}
