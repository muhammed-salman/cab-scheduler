import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Header from './Header';
import Indicator from './Indicator';
import SchedulingTable from '../containers/SchedulingTable';
class App extends Component {
  constructor(props){
    super(props);
    this.startDate="";
    this.endDate="";
  }

  getNextWeek(){
      var date = new Date();
      var curr_date =new Date();
      var day = curr_date.getDay();
      // console.log(day);
      var diff = curr_date.getDate() - day + (day == 0 ? -6:1); // 0 for sunday
      var week_start_tstmp = curr_date.setDate(diff);
      var week_start = new Date(week_start_tstmp).add;
      var week_start_date =moment(week_start).add(7-(day-1), 'days').format("Do MMM, YYYY");
      var week_end  = new Date(week_start_tstmp);  // first day of week
      week_end = new Date (week_end.setDate(week_end.getDate() + 6));
      var week_end_date =moment(week_end).add(7, 'days').format("Do MMM, YYYY");
      this.startDate = week_start_date;
      this.endDate = week_end_date;
  }

  render(){
    this.getNextWeek();
    return (
      <div>
        <Header startDate={this.startDate} endDate={this.endDate}/>

        <Indicator/>

        <SchedulingTable
          startDate={this.startDate} endDate={this.endDate}
          dropdown={['Mumbai','Navi Mumbai','Thane']}
          descText="Map"
          isLink="yes"
        />

        <SchedulingTable
          startDate={this.startDate} endDate={this.endDate}
          heading="Your Schedule Across Zones"
          descText="Click the timeslot to view your delivery zone!"
          isLink="no"
        />

      </div>

    );
  }
}

export default App;
