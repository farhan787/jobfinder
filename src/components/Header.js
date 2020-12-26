import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        JobFinder
      </Link>

      <div className="right menu">
        <Link to="/signup">Signup</Link>
      </div>

      <div className="right menu">
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Header;
