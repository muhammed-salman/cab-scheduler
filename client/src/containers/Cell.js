import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';


class Cell extends Component {

  constructor(props){
    super(props);
    this.state={
      date: this.props.date,
      slotId: this.props.slotId,
      slotSerial: this.props.slotSerial,
      status: this.props.status,
      startTime: this.props.startTime,
      endTime: this.props.endTime,
      user: this.props.user
    };

		this.onClick=this.onClick.bind(this);
		this.onHover=this.onHover.bind(this);
  }

  onClick(event){
    alert('You Clicked');
	}

  onHover(event){

  }

  //props updated change state
  static getDerivedStateFromProps(props, state) {
    if (props.slotId !== state.slotId || props.status !== state.props) {
      return {
          date: props.date,
          slotId: props.slotId,
          slotSerial: props.slotSerial,
          status: props.status,
          startTime: props.startTime,
          endTime: props.endTime,
          user: props.user
        };
      }
      return null;
  }

  render(){
    // console.log("Cell Props: ", this.props,"Cell State",this.state);
    return (
      <td
        data-type={this.state.status}
        rowSpan="2"
        onClick={this.onClick}
        onMouseOver={this.onHover}
        >
      </td>
    );
  }
}

export default Cell;
