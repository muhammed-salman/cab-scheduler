import axios from 'axios';
import moment from 'moment';
import { AUTH_USER, AUTH_ERROR, ZONE_CHANGE, ZONE_ERROR, UPDATE_SCHEDULE, UPDATE_ERROR } from './types';

export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      'http://localhost:3090/signup',
      formProps
    );

    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem('token', response.data.token);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
  }
};

export const signin = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      'http://localhost:3090/signin',
      formProps
    );

    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem('token', response.data.token);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
  }
};

export const signout = () => {
  localStorage.removeItem('token');

  return {
    type: AUTH_USER,
    payload: ''
  };
};

export const fetchZoneSlots = (name, startDate) => async dispatch => {
  var zoneSchedule=[], temp=[],i,j;
  try {
    for(i=0;i<7;i++){
      startDate = moment(startDate).add(i,day).format('YYYY-MM-DD');

      console.log(startDate);

      const response = await axios.post(
        'http://localhost:3090/zoneslots',
        {name, date: startDate}
      );

      console.log(response);

      for(j=0;j<14;j++){
        temp[i][j]=response[j];
      }
    }

    for(i=0;i<14;i++)
    {
      for(j=0;j<7;j++){
        zoneSchedule[i][j] = temp[j][i];
      }
    }

    dispatch({ type: ZONE_CHANGE, payload: zoneSchedule });
  } catch (e) {
    dispatch({ type: ZONE_ERROR, payload: 'Zone information cannot be fetch' });
  }
};
