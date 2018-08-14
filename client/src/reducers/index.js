import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {USER_LOGOUT} from '../actions/types';
import auth from './auth';
import zoneSchedule from './zoneSchedule';
import schedule from './schedule';
import startDate from './startdate';
import endDate from './enddate';
import zones from './zone';
import zone from './setZone';


const appReducer = combineReducers({
  auth,
  startDate,
  endDate,
  zone,
  zones,
  zoneSchedule,
  schedule,
  form: formReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }
  return appReducer(state, action);
}


export default rootReducer;
