import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import _ from 'lodash';
import Input from '../components/Input';
import Cell from './Cell';
import requireAuth from '../components/requireAuth';

class SchedulingTable extends Component {
  constructor(props){
		super(props);
		this.state={
      startDate: this.props.startDate,
      endDate: this.props.endDate,
      zoneSchedule: this.props.zoneSchedule,
      schedule: this.props.schedule,
      zones: this.props.zones
    };
    this.onClick = this.onClick.bind(this);
	}

  onClick(event){
    alert('You Just Clicked');
  }

  componentDidMount(){
    // this.getNextWeek();
  }

  generateRows = () => {
      let table = [];
      let time="08:00am";
      if(!_.isEmpty(this.props.zoneSchedule)){
        //create rows
        for (let i = 0; i < 14; i++) {
          let children = [];
          //create cells
          for (let j = 0; j < 8; j++) {
            if(j==0)
            children.push(<td>{time}</td>);
            else
            children.push(
              <Cell
                status={this.props.zoneSchedule[i][j-1].status}
                date={this.props.zoneSchedule[i][j-1].date}
                slotId={this.props.zoneSchedule[i][j-1]._id}
                slotSerial={this.props.zoneSchedule[i][j-1].id}
                startTime={this.props.zoneSchedule[i][j-1].startTime}
                endTime={this.props.zoneSchedule[i][j-1].endTime}
                user={this.props.zoneSchedule[i][j-1].user}
              />
            );
          }
          //create rows and add columns
          table.push(<tr>{children}</tr>);
          time=moment(time,'hh:mma').add(1,'h').format('hh:mma');
          table.push(<tr>{time}</tr>);
        }

      }
      return table;
  }

  render(){
    const {heading, dropdown, descText, isLink} = this.props;
    let el,textEl;

    // console.log(this.state);
    if(heading)
      el = <Input heading={heading}/>;
    else if(dropdown){
      el = <Input dropdown={dropdown}/>;

    }

    if(isLink.valueOf() === "yes".valueOf())
      textEl = <a href="#">{descText}</a>;
    else if(isLink.valueOf() === "no".valueOf())
      textEl = <span>{descText}</span>;


    return (
      <div className="schedule-container">
        {this.props.startDate}-{this.props.endDate}

        {el}

        {textEl}

        <table>
          <thead>
            <tr>
              <th></th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
              <th>Sun</th>
            </tr>
          </thead>
          <tbody>
            {this.generateRows()}
          </tbody>
        </table>
      </div>

    );
  }
}

export default requireAuth(SchedulingTable);
