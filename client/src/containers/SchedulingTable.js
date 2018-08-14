import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import _ from 'lodash';
import mongoose from 'mongoose';
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
      zones: this.props.zones,
      type: this.props.type,
      email: this.props.email
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
      let userid = localStorage.getItem('userid');
      if(this.props.type=='zoneSch'){

        const {zoneSchedule} = this.props;

        if(!_.isEmpty(zoneSchedule)){
          //create rows
          for (let i = 0; i < 14; i++) {
            let children = [];
            //create cells
            for (let j = 0; j < 8; j++) {
              if(j==0)
              children.push(<td>{time}</td>);
              else{
                const {status, date, _id, id, startTime, endTime, user, waitlist} = this.props.zoneSchedule[i][j-1];

                let displayStatus = (userid==user)?status:(status=="SA"?(_.includes(waitlist,userid)?"WL":"AWL"):status);

                const {startDate, email} = this.props;
                children.push(
                  <Cell
                    status={displayStatus}
                    startDate={startDate}
                    date={date}
                    slotId={_id}
                    slotSerial={id}
                    startTime={startTime}
                    endTime={endTime}
                    user={user}
                    email={email}
                  />
                );
              }
            }
            //create rows and add columns
            table.push(<tr>{children}</tr>);
            time=moment(time,'hh:mma').add(1,'h').format('hh:mma');
            table.push(<tr><td>{time}</td></tr>);
          }

        }

      }
      else if(this.props.type=="userSch"){
        let k=0;
        let date= moment(this.props.startDate)
        if(!_.isEmpty(this.props.schedule)){
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
                  status={this.props.schedule[k].status}
                  startDate={this.props.startDate}
                  date={this.props.schedule[k].date}
                  slotId={this.props.schedule[k]._id}
                  slotSerial={this.props.schedule[k].id}
                  startTime={this.props.schedule[k].startTime}
                  endTime={this.props.schedule[k].endTime}
                  user={this.props.schedule[k].user}
                  email={this.props.email}
                />
              );
            }
            //create rows and add columns
            table.push(<tr>{children}</tr>);
            time=moment(time,'hh:mma').add(1,'h').format('hh:mma');
            table.push(<tr><td>{time}</td></tr>);
          }
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
