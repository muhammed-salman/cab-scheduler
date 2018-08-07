import React from 'react';

const Header = (props) => {
  return(
    <div className="header--top">
      <div>
        <span>{props.startDate}</span> - <span>{props.endDate}</span>
      </div>
      <div>
        Cab Scheduler App
      </div>
    </div>
  );
};
export default Header;
