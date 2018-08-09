import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import zoneSchedule from './zoneSchedule';
import schedule from './schedule';

export default combineReducers({
  auth,
  zoneSchedule,
  schedule,
  form: formReducer
});
