import { ZONES_AVL } from '../actions/types';

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {

  switch (action.type) {
    case ZONES_AVL:
      return action.payload;
    default:
      return state;
  }
}
