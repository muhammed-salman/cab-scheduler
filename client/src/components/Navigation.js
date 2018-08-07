import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Navigation extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <div>
          <Link to="/signout">Sign Out</Link>
          <Link to="/scheduler">Scheduler</Link>
        </div>
      );
    } else {
      return (
        <span>
          <Link to="/signup">Sign Up</Link>
          <Link to="/signin">Sign In</Link>
        </span>
      );
    }
  }

  render() {
    return (
      <div className="navigator">
        <Link to="/"><h1>Cab Scheduler</h1></Link>
        {this.renderLinks()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Navigation);
