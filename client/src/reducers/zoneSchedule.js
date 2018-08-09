import { STATUS_CHANGE, STATUS_ERROR } from '../actions/types';

const INITIAL_STATE = {
  authenticated: '',
  errorMessage: '',
  zoneSchedule: [],
  schedule: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case  STATUS_CHANGE:
      return { ...state, zoneSchedule: action.payload};
    case STATUS_ERROR:
      return { ...state, errorMessage: action.payload };  
    default:
      return state;
  }
}
