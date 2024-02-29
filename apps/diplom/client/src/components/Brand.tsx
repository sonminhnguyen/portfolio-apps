import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.jpg';

const Brand = props => {
  return (
      <Link to="/">
        <img src={logo} alt="kstubot-logo" />
        {/* <span style={{ marginLeft: 14 }}>KSTU-BOT</span> */}
      </Link>
  );
};

export default Brand;
