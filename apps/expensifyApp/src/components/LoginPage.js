import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';
import bg from "../images/bg.jpg"

export const LoginPage = ({ startLogin }) => (
  <div className="box-layout" style={{backgroundImage : `url(${bg})`}}>
  {/* <div className="box-layout" style={{backgroundImage : "url(/images/bg.png)"}}> */}
    <div className="box-layout__box">
      <h1 className="box-layout__title">Expensify</h1>
      <p>It's time to get your expenses under control.</p>
      <button className="button" onClick={startLogin}>Login with Google</button>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
