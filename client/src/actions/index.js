import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';
import { AUTH_USER, AUTH_ERROR, USER_LOGOUT, USER_WAITLIST, USER_WAITLIST_ERROR, ZONE_SELECTED, ZONE_CHANGE, ZONE_ERROR, UPDATE_SCHEDULE, UPDATE_SLOT, UPDATE_ERROR, ZONES_AVL, START_DATE, END_DATE } from './types';

export const signup = (formProps, callback) => async dispatch => {
  const {email} = formProps;
  try {
    const response = await axios.post(
      'http://localhost:3090/signup',
      formProps
    );

    dispatch({ type: AUTH_USER, payload: {token: response.data.token, email} });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('email', email);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
  }
};

export const signin = (formProps, callback) => async dispatch => {
  const {email} = formProps;
  try {
    const response = await axios.post(
      'http://localhost:3090/signin',
      formProps
    );

    const user= await axios.post(
      'http://localhost:3090/userinfo',
      {email}
    );
    dispatch({ type: AUTH_USER, payload: {token: response.data.token, email} });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('email', email);
    localStorage.setItem('userid', user.data._id);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
  }
};

export const signout = () => async dispatch => {
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('userid');
    dispatch({ type: AUTH_USER, payload: ''});
    dispatch({ type: USER_LOGOUT, payload: '' });
  }
    catch (e) {
      dispatch({ type: AUTH_ERROR, payload: 'Not able to sign out' });
    }
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

    await axios.all(promises).then(function(results) {
      results.forEach(function(response) {
          temp.push(response.data);
      });
    });

    for(i=0;i<14;i++)
    {
      var zone=[];
      for(j=0;j<7;j++){
        zone[j]=temp[j][i];
      }
      zoneSchedule.push(zone);
    }

    dispatch({ type: ZONE_CHANGE, payload: zoneSchedule });
  } catch (e) {
    dispatch({ type: ZONE_ERROR, payload: 'Zone information cannot be fetch' });
  }
};

export const fetchZones = () => async dispatch => {
  try {
    const response = await axios.post('http://localhost:3090/zonelist',{});
    // var zones = _.map(response.data, function(zone){
    //                    return zone.name;});
    dispatch({ type: ZONES_AVL, payload: response.data });
  } catch (error) {
    console.error(error);
  }
};

export const setZone = (name) => async dispatch => {
  try {
    const response = await axios.post('http://localhost:3090/zoneinfo',{name});

    dispatch({ type: ZONE_SELECTED, payload: response.data });
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

export const fetchUserSlots = (email, startDate) => async dispatch => {

  var userSchedule=[], promises=[], temp=[],i,j;
  try {
    const user= await axios.post(
      'http://localhost:3090/userinfo',
      {email}
    );

    let id = user.data._id;

    for(i=0;i<7;i++){

      const response = await axios.post(
        'http://localhost:3090/userslots',
        {id, date: startDate}
      );

      promises.push(response);

      startDate= moment(startDate,'YYYY-MM-DD').add(1,'day').format('YYYY-MM-DD');
    }

    await axios.all(promises).then(function(results) {

      results.forEach(function(response) {
          temp.push(response.data);
      });
    });

    for(i=0;i<7;i++){
      temp[i].forEach((slot)=>{
        userSchedule.push(slot);
      });
    }
    userSchedule = _.sortBy(userSchedule, ['id', 'date']);


    dispatch({ type: UPDATE_SCHEDULE, payload: userSchedule });
  } catch (e) {
    dispatch({ type: UPDATE_ERROR, payload: 'User Slot information cannot be fetch' });
  }
};

export const reserveSlot = (email, id) => async dispatch => {

  try {
    const user= await axios.post(
      'http://localhost:3090/userinfo',
      {email}
    );

    let _id = user.data._id;

    const response = await axios.post(
      'http://localhost:3090/bookslot',
      {id, user: _id, status: "SA"}
    );

    dispatch({ type: UPDATE_SLOT, payload: response.data });
  } catch (e) {
    dispatch({ type: UPDATE_ERROR, payload: 'User Slot information cannot be updated' });
  }
};

export const getUserWaitList = (startDate) => async dispatch => {

  var userWaitList=[], promises=[], temp=[],i,j;
  try {

    let user = localStorage.getItem('userid');

    for(i=0;i<7;i++){

      const response = await axios.post(
        'http://localhost:3090/userwaitlist',
        {user, date: startDate}
      );

      promises.push(response);

      startDate= moment(startDate,'YYYY-MM-DD').add(1,'day').format('YYYY-MM-DD');
    }

    await axios.all(promises).then(function(results) {

      results.forEach(function(response) {
          temp.push(response.data);
      });
    });

    for(i=0;i<7;i++){
      temp[i].forEach((slot)=>{
        userWaitList.push(slot);
      });
    }
    userWaitList = _.sortBy(userWaitList, ['id', 'date']);


    dispatch({ type: USER_WAITLIST, payload: userWaitList });
  } catch (e) {
    dispatch({ type: USER_WAITLIST_ERROR, payload: 'User Waitlist Slot information cannot be fetch' });
  }
};

export const putToWaitList = (email, id) => async dispatch => {

  try {
    const user= await axios.post(
      'http://localhost:3090/userinfo',
      {email}
    );

    let _id = user.data._id;

    const response = await axios.post(
      'http://localhost:3090/addtowaitlist',
      {id, user: _id}
    );

    dispatch({ type: UPDATE_SLOT, payload: response.data });
  } catch (e) {
    dispatch({ type: UPDATE_ERROR, payload: 'User Slot information cannot be updated' });
  }
};
