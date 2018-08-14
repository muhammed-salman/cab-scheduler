import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import {fetchZoneSlots, setZone} from '../actions/index';

class Input extends Component {
  constructor(props){
    super(props);
		this.onChange=this.onChange.bind(this);
  }

  onChange(event){
    let zone = event.target.value;
    if(zone!=""){
      this.props.setZone(zone);
      let startDate = moment(this.props.startDate,'Do MMM, YYYY').format('YYYY-MM-DD');
      this.props.fetchZoneSlots(zone,startDate);
    }
  }

  createOptions = () => {
    let options = [];
    let dropdown = this.props.dropdown;
    options.push(<option key="" value="">------</option>);
    for (let i = 0; i < dropdown.length; i++) {
      options.push(<option value={dropdown[i]} key={i}>{dropdown[i]}</option>);
    }
    return options;
  }

  render(){

    if(this.props.heading){
      return (
        <h4>
          {this.props.heading}
        </h4>
      );
    }
    else if(this.props.dropdown){
      return (
        <div>
          <select onChange={this.onChange}>
            {this.createOptions()}
          </select>
        </div>
      );
    }
  }
}

function mapStateToProps(state){
	return state;
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({fetchZoneSlots, setZone},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Input);
