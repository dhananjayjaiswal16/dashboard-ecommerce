import React from "react";
import "./topbar.css";
import { ArrowRight } from "@material-ui/icons";
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logout } from '../../redux/userSlice';
import { Link } from 'react-router-dom'
export default function Topbar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    localStorage.clear();
    dispatch(logout());
    history.push('/login');
  }

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo"><Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>DJ.</Link></span>
        </div>
        <div className="topRight" onClick={logoutHandler}>
          <p style={{ cursor: 'pointer' }}>Logout</p>
          <ArrowRight />
        </div>
      </div>
    </div>
  );
}
