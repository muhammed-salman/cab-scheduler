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
    this.onClick = this.onClick.bind(this);
	}

  onClick(event){
    alert('You Just Clicked');
  }

  componentDidMount(){
    // this.getNextWeek();
  }

  generateZoneSchedule(userid){
      let table = [];
      let time="08:00am";
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

              let waitUser=_.map(waitlist,'user');
              // console.log("Schedule Table",waitUser);
              let displayStatus = (_.isEqual(userid,user))?status:(status=="SA"?(_.includes(waitUser,userid)?"WL":"AWL"):status);

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
                  type={this.props.type}
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
      return table;
  }

  generateUserSchedule(userid){
    let table = [];
    let time="08:00am";
    let k=0, w=0;

    const {schedule, zones, userWaitList} = this.props;

    if(!_.isEmpty(schedule) && !_.isEmpty(zones) && !_.isEmpty(userWaitList)){
      //create rows
      for (let i = 0; i < 14; i++) {
        let slotDate= moment(this.props.startDate,'Do MMM, YYYY').format('YYYY-MM-DD');
        let children = [];
        //create cells
        for (let j = 0; j < 8; j++) {
          if(j==0)
            children.push(<td>{time}</td>);
          else{
            // console.log('slotDate:',slotDate);
            let waitUser=false;
            let {status, date, _id, id, startTime, endTime, user, zone} = this.props.schedule[k];

            if(_.isEqual(date,slotDate)&&_.isEqual(startTime,time)){
              if(k<this.props.schedule.length-1)
                k++;
                zones.forEach((obj) =>{
                  if(_.isEqual(obj._id,zone)){
                    zone=obj.name;
                  }
                });
                //if you have the wait slot at same time and date of reserved slot then skip it on status display
                if( _.isEqual(userWaitList[w].date,slotDate)
                  && _.isEqual(userWaitList[w].startTime,time))
                    w++;
            }
            else {
              // let {status, date, _id, id, startTime, endTime, user, zone} = this.props.userWaitList[w];

              if( _.isEqual(userWaitList[w].date,slotDate)
                && _.isEqual(userWaitList[w].startTime,time))
              {
                waitUser=true;
                status = userWaitList[w].status;
                date=userWaitList[w].date;
                _id=userWaitList[w]._id;
                id=userWaitList[w].id;
                startTime=userWaitList[w].startTime;
                endTime=userWaitList[w].endTime;
                zone = userWaitList[w].zone;
                user=null;
                zones.forEach((obj) =>{
                  if(_.isEqual(obj._id,zone)){
                    zone=obj.name;
                  }
                });

                if(w<userWaitList.length-1)
                  w++;
              }
              else{
                date=slotDate;
                startTime=time;
                endTime=moment(startTime,'hh:mma').add(1,'h').format('hh:mma');
                user=null;
                _id=startTime+date;
                id=i;
                zone=null;
              }
            }

            // let waitUser = _.map(waitlist,'user');
            // console.log("Schedule Table",waitUser);
            let displayStatus = (_.isEqual(userid,user))?status:(status=="SA"?(waitUser?"WL":"AWL"):status);

            const {startDate, email} = this.props;
            // console.log(id+"-"+date+"-"+startTime+"-"+_id+"-"+zone+"--"+slotDate);
            children.push(
              <Cell
                key={j}
                status={displayStatus}
                startDate={startDate}
                date={date}
                slotId={_id}
                slotSerial={id}
                startTime={startTime}
                endTime={endTime}
                user={user}
                email={email}
                slotZone={zone}
                type={this.props.type}
              />
            );
            // console.log("-----Cell Pushed-------");
            slotDate = moment(slotDate,'YYYY-MM-DD').add(1,'day').format('YYYY-MM-DD');
          }
        }
        //create rows and add columns
        table.push(<tr>{children}</tr>);
        time=moment(time,'hh:mma').add(1,'h').format('hh:mma');
        table.push(<tr><td>{time}</td></tr>);
      }
    }
    return table;
  }

  generateRows = () => {
    let table=[];
      let userid = localStorage.getItem('userid');
      if(this.props.type=='zoneSch'){
          table=this.generateZoneSchedule(userid);
      }
      else if(this.props.type=="userSch"){
          table=this.generateUserSchedule(userid);
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
