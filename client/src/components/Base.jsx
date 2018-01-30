import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import AuthUser from '../utils/AuthUser';


const Base = ({ children }) => (
  <div>
    <nav className="navbar navbar-default">
      <div className="container-fluid">
       <div className="navbar-header">
          <a className="navbar-brand" href="#">Crud App</a>
        </div>
        {AuthUser.isUserAuthenticated() ? (
            <ul className="nav navbar-nav  pull-right">
              <li><Link to="/pages">Pages</Link></li>
              <li><Link to="/newpage">Add new page</Link></li>
              <li><Link to="/logout">Log out</Link></li>
            </ul>
          ) : (
            <ul className="nav navbar-nav pull-right">
              <li><Link to="/login">Log in</Link></li>
              <li><Link to="/signup">Sign up</Link></li>
            </ul>
          )}
      </div>
    </nav>



    { /* child component will be rendered here */ }
    
    {children}

    { /* footer */ }
    <nav className="navbar navbar-default navbar-fixed-bottom">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Footer</a>
      </div>
    </nav>
  </div>
);

export default Base;