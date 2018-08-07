import React,{Component} from 'react';
import ReactDOM from 'react-dom';

class Input extends Component {
  render(){
    // const element;
    if(this.props.heading){
      // console.log(this.props.heading);
      return (
        <h4>
          {this.props.heading}
        </h4>
      );
    }
    else if(this.props.dropdown){
      let dropdown = this.props.dropdown;
      let htmlText="<select>";
      for(var i=0;i<dropdown.length;i++){
        htmlText += `<option value=${i}>${dropdown[i]}</option>`;
      }
      htmlText +="</select>";

      return (<div dangerouslySetInnerHTML={{ __html: htmlText }} />);
    }
  }
}
export default Input;
