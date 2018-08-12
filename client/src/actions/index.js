import axios from 'axios';
import moment from 'moment';
import { AUTH_USER, AUTH_ERROR, ZONE_CHANGE, ZONE_ERROR, UPDATE_SCHEDULE, UPDATE_ERROR, ZONES_AVL, START_DATE, END_DATE } from './types';

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

  var zoneSchedule=[], promises=[], temp=[],i,j;
  try {

    for(i=0;i<7;i++){

      const response = await axios.post(
        'http://localhost:3090/zoneslots',
        {name, date: startDate}
      );

      promises.push(response);

      startDate= moment(startDate,'YYYY-MM-DD').add(1,'day').format('YYYY-MM-DD');
    }

    axios.all(promises).then(function(results) {
      results.forEach(function(response) {
          temp.push(response.data);
      });
    });
    console.log(temp);
    // for(i=0;i<14;i++)
    // {
    //   for(j=0;j<7;j++){
    //     console.log(temp[j][i]);
    //   }
    // }
    // console.log(zoneSchedule);

    dispatch({ type: ZONE_CHANGE, payload: zoneSchedule });
  } catch (e) {
    dispatch({ type: ZONE_ERROR, payload: 'Zone information cannot be fetch' });
  }
};

export const fetchZones = () => async dispatch => {
  try {
    const response = await axios.post('http://localhost:3090/zonelist',{});
    var zones = _.map(response.data, function(zone){
                       return zone.name;});
    dispatch({ type: ZONES_AVL, payload: zones });
  } catch (error) {
    console.error(error);
  }
};

export const getNextWeek = () => dispatch => {
    var date = new Date();
    var curr_date =new Date();
    var day = curr_date.getDay();
    // console.log(day);
    var diff = curr_date.getDate() - day + (day == 0 ? -6:1); // 0 for sunday
    var week_start_tstmp = curr_date.setDate(diff);
    var week_start = new Date(week_start_tstmp);
    var week_start_date =moment(week_start).add(7, 'days').format("Do MMM, YYYY");
    var week_end  = new Date(week_start_tstmp);  // first day of week
    week_end = new Date (week_end.setDate(week_end.getDate() + 6));
    var week_end_date =moment(week_end).add(7, 'days').format("Do MMM, YYYY");

    dispatch({ type: START_DATE, payload: week_start_date });
    dispatch({ type: END_DATE, payload: week_end_date });
};
