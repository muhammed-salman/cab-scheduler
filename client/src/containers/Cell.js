import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import axios from 'axios';
import _ from 'lodash';
import ReactTooltip from 'react-tooltip';
import {reserveSlot, fetchZoneSlots, fetchUserSlots, putToWaitList, getUserWaitList} from '../actions/index';


class Cell extends Component {

  constructor(props){
    super(props);
		this.onClick=this.onClick.bind(this);
  }

  async interZoneSlotClash(date){
    let id = localStorage.getItem("userid");
    try {
      // console.log('inside interZoneSlotClash');
      const slot = await axios.post(
        'http://localhost:3090/userslotbydatetime',
        {id,startTime: this.props.startTime,date}
      );
      // console.log('slot',slot);
      // console.log(_.isEmpty([]),_.isEmpty(slot.data));
      if(_.isEmpty(slot.data))
        return false;
      else {
        return true;
      }
    }
    catch(e){
      console.log("Unable to check slot clash.");
    }
  }

  async interUserSlotClash(zone,startTime,date){
    try {
      let id = localStorage.getItem("userid");
      console.log('inside interUserSlotClash',zone,startTime,date);
      const slot = await axios.post(
        'http://localhost:3090/slotbydatetime',
        {name: zone,startTime,date}
      );
      // console.log('slot',slot);
      // console.log(_.isEmpty([]),_.isEmpty(slot.data));
      if(_.includes(slot.data,id))
        return true;
      else
        return false;

    }
    catch(e){
      console.log("Unable to check inter user slot clash.");
    }
  }

  async onClick(event){
    if(this.props.type=='zoneSch'){
      let startDate = moment(this.props.startDate,'Do MMM, YYYY').format('YYYY-MM-DD');
      let clash =  await this.interZoneSlotClash(this.props.date);
      let usersClash = await this.interUserSlotClash(this.props.zone.name,this.props.startTime,this.props.date);

      // console.log('clash',clash);
      if(!clash){
        if(!usersClash){
          if(this.props.status=="AG")
          {
            this.props.reserveSlot(this.props.email,this.props.slotId);
          }
          else if (this.props.status=="AWL") {
            this.props.putToWaitList(this.props.email,this.props.slotId);
          }
          if(this.props.status =="AG" || this.props.status =="AWL"){

            this.props.fetchZoneSlots(this.props.zone.name,startDate);
            this.props.fetchUserSlots(this.props.email,startDate);
            this.props.getUserWaitList(startDate);
          }
          else{
            alert("This Shift is already present in your schedule");
          }
        }
        else{
          alert("Another User has booked this slot. We are putting you on waitlist");
          this.props.putToWaitList(this.props.email,this.props.slotId);
          this.props.fetchZoneSlots(this.props.zone.name,startDate);
          this.props.fetchUserSlots(this.props.email,startDate);
          this.props.getUserWaitList(startDate);
        }

      }
      else{
        alert("You cannot reserve this slot. You already reserved a slot for the same time and date");
      }
    }
    else if (this.props.type=='userSch') {
      let msg;
      if(this.props.status=="SA")
        msg=`Your cab is scheduled on ${this.props.date} at ${this.props.startTime} for ${this.props.slotZone}`;
      else if (this.props.status=="WL") {
        msg=`Your cab is on waiting status on ${this.props.date} at ${this.props.startTime} for ${this.props.slotZone}`;
      }
      else{
        msg = 'Currently no shift is assigned at this slot';
      }
      alert(msg);
    }
	}

  render(){
    // console.log("Cell Props: ", this.props,"Cell State",this.state);
    let zone=(!_.isEmpty(this.props.slotZone))?this.props.slotZone:"";
    return (
      <td
        data-type={this.props.status}
        rowSpan="2"
        onClick={this.onClick}
        data-tip
        data-for={this.props.slotId}
        >
      <ReactTooltip id={this.props.slotId} place="top" type="info" effect="float">
        <p>
          Date: {this.props.date}
        </p>
        <p>
          Time: {this.props.startTime}-{this.props.endTime}
        </p>
        <p>
          Status: {this.props.status}
        </p>
        <p>
          <strong>{zone}</strong>
        </p>
      </ReactTooltip>
      </td>

    );
  }
}

function mapStateToProps(state){
	return state;
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({reserveSlot, fetchZoneSlots, fetchUserSlots, putToWaitList, getUserWaitList},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Cell);
