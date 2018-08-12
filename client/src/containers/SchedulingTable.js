import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Input from '../components/Input';
import Cell from './Cell';
import requireAuth from '../components/requireAuth';

class SchedulingTable extends Component {
  constructor(props){
		super(props);
		this.state={
      startDate: this.props.startDate,
      endDate: this.props.endDate
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    // this.getNextWeek= this.getNextWeek.bind(this);
	}

  onChange(event){
    alert('You Changed Zone');
	}

  onClick(event){
    alert('You Just Clicked');
  }

  componentDidMount(){
    // this.getNextWeek();
  }

  render(){
    const {heading, dropdown, descText, isLink} = this.props;
    let el,textEl;
    // console.log(this.state);
    if(heading)
      el = <Input heading={heading}/>;
    else if(dropdown){
      el = <Input dropdown={dropdown}
            onChange = {this.onChange}
            onClick = {this.onClick}
          />;

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

export default requireAuth(SchedulingTable);
