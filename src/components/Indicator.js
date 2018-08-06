import React from 'react';

const Indicator = (props) => {
  return(
    <div className="indicator">
      <ul>
        <li>
          <div className="status-box" data-type="AWL"></div>
          <div>Available for Waitlist <strong>(AWL)</strong></div>
        </li>
        <li>
          <div className="status-box" data-type="WL"></div>
          <div>Waitlisted <strong>(WL)</strong></div>
        </li>
        <li>
          <div className="status-box" data-type="SA"></div>
          <div>Shift Assigned <strong>(SA)</strong></div>
        </li>
        <li>
          <div className="status-box" data-type="AG"></div>
          <div>Available for Grabs <strong>(AG)</strong></div>
        </li>
      </ul>
    </div>
  );
};
export default Indicator;
