import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';
import {reserveSlot, fetchZoneSlots, fetchUserSlots, putToWaitList} from '../actions/index';


class Cell extends Component {

  constructor(props){
    super(props);
		this.onClick=this.onClick.bind(this);
  }

  onClick(event){
    let startDate = moment(this.props.startDate,'Do MMM, YYYY').format('YYYY-MM-DD');
    if(this.props.status=="AG")
    {
      this.props.reserveSlot(this.props.email,this.props.slotId);
    }
    else if (this.props.status=="AWL") {
      this.props.putToWaitList(this.props.email,this.props.slotId);
    }

    if(this.props.status =="AG" || this.props.status =="AWL"){
      
      this.props.fetchZoneSlots(this.props.zone.name,startDate);
      this.props.fetchUserSlots(this.props.email,startDate);
    }
    else{
      alert("This Shift is already present in your schedule");
    }
	}

  render(){
    // console.log("Cell Props: ", this.props,"Cell State",this.state);
    return (
      <td
        data-type={this.props.status}
        rowSpan="2"
        onClick={this.onClick}
        onMouseOver={this.onHover}
        data-tip
        data-for={this.props.slotId}
        >
      <ReactTooltip id={this.props.slotId} place="top" type="info" effect="float">
        <p>
          Date: {this.props.date}
        </p>
        <p>
          Time: {this.props.startTime}-{this.props.endTime}
        </p>
        <p>
          Status: {this.props.status}
        </p>
      </ReactTooltip>
      </td>

    );
  }
}

function mapStateToProps(state){
	return state;
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({reserveSlot, fetchZoneSlots, fetchUserSlots, putToWaitList},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Cell);
