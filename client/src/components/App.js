import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import axios from 'axios';
import _ from 'lodash';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Header from './Header';
import Indicator from './Indicator';
import SchedulingTable from '../containers/SchedulingTable';
import {fetchZones, getNextWeek, fetchUserSlots} from '../actions/index';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      auth: this.props.auth,
      startDate: this.props.startDate,
      endDate: this.props.endDate,
      schedule: this.props.schedule,
      zoneSchedule: this.props.zoneSchedule,
      zones: this.props.zones
    };
  }

  componentWillMount(){
    this.props.fetchZones();
    this.props.getNextWeek();
  }


  componentDidMount() {
      // this.props.fetchUserSlots(this.props.auth.authenticated.email, this.props.startDate);
  }

  componentDidUpdate(prevProps) {
      if(JSON.stringify(this.props.startDate)!=JSON.stringify(prevProps.startDate))
      {
        this.props.fetchUserSlots(this.props.auth.authenticated.email, moment(this.props.startDate,'Do MMM, YYYY').format('YYYY-MM-DD'));
      }
  }
  render(){
    // const { startDate: {startDate}, endDate: {endDate}} = this.props;
    console.log('APP props',this.props);
    if(! _.isEmpty(this.props.zones)){

      return (
        <div>
          <Header startDate={this.props.startDate} endDate={this.props.endDate}/>

          <Indicator/>

          <SchedulingTable
            startDate={this.props.startDate} endDate={this.props.endDate}
            dropdown={this.props.zones}
            zoneSchedule={this.props.zoneSchedule}
            email={this.props.auth.authenticated.email}
            type="zoneSch"
            descText="Map"
            isLink="yes"
          />

          <SchedulingTable
            startDate={this.props.startDate} endDate={this.props.endDate}
            schedule={this.props.schedule}
            email={this.props.auth.authenticated.email}
            type="userSch"
            heading="Your Schedule Across Zones"
            descText="Click the timeslot to view your delivery zone!"
            isLink="no"
          />

        </div>

      );
    }
    else {
      return <div>Loading...</div>;
    }
  }
}

function mapStateToProps(state){
	return state;
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchZones, getNextWeek, fetchUserSlots},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
