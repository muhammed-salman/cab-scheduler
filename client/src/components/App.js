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
import {fetchZones, getNextWeek} from '../actions/index';

class App extends Component {
  constructor(props){
    super(props);

  }

  componentWillMount(){
    this.props.fetchZones();
    this.props.getNextWeek();
    // this.getNextWeek();
  }

  render(){
    // const { startDate: {startDate}, endDate: {endDate}} = this.props;
    console.log(this.props);
    if(! _.isEmpty(this.props.zones)){

      return (
        <div>
          <Header startDate={this.props.startDate} endDate={this.props.endDate}/>

          <Indicator/>

          <SchedulingTable
            startDate={this.props.startDate} endDate={this.props.endDate}
            dropdown={this.props.zones}
            descText="Map"
            isLink="yes"
          />

          <SchedulingTable
            startDate={this.props.startDate} endDate={this.props.endDate}
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
	return bindActionCreators({fetchZones, getNextWeek},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
