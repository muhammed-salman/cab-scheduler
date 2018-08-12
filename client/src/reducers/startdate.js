import { START_DATE } from '../actions/types';

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {

  switch (action.type) {
    case START_DATE:
      return action.payload;
    default:
      return state;
  }
}
