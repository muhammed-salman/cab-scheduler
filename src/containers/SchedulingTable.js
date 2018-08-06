import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Input from '../components/Input';
import Cell from './Cell';

class SchedulingTable extends Component {
  constructor(props){
		super(props);
		this.state={
      startDate: '',
      endDate: '',
    };
    // this.getNextWeek= this.getNextWeek.bind(this);
	}



  componentDidMount(){
    // this.getNextWeek();
  }

  render(){
    const {heading, dropdown} = this.props;
    let el;
    if(heading)
      el = <Input heading={heading}/>;
    else if(dropdown)
      el = <Input dropdown={dropdown}/>;
    return (
      <div className="schedule-container">
        {this.props.startDate}-{this.props.endDate}

        {el}
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
            <tr>
              <td>07:45am</td>
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
            </tr>
            <tr>
              <td>08:45am</td>
            </tr>
          </tbody>
        </table>
      </div>

    );
  }
}

export default SchedulingTable;
