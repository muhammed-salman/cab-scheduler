import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';


class Cell extends Component {

  constructor(props){
    super(props);
    this.state={
      currentDate: moment(new Date()).format("Do MMM, YYYY"),
      slotNumber: '',
      currentday: moment(new Date()).format("ddd"),
      status: 'AWL',
    };

		this.onClick=this.onClick.bind(this);
		this.onHover=this.onHover.bind(this);
  }

  onClick(event){
    alert('You Clicked');
	}

  onHover(event){

  }

  render(){
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
