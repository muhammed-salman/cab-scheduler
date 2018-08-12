import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import zoneSchedule from './zoneSchedule';
import schedule from './schedule';
import startDate from './startdate';
import endDate from './enddate';
import zones from './zone';


export default combineReducers({
  auth,
  startDate,
  endDate,
  zones,
  zoneSchedule,
  schedule,
  form: formReducer
});
