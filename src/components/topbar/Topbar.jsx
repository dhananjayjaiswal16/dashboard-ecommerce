import React from "react";
import "./topbar.css";
import { ArrowRight } from "@material-ui/icons";
import { useHistory } from 'react-router-dom';
export default function Topbar() {
  const history = useHistory();
  const logoutHandler = () => {
    localStorage.clear();
    history.push('/login');
  }

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">DJ.</span>
        </div>
        <div className="topRight" onClick={logoutHandler}>
          <p style={{ cursor: 'pointer' }}>Logout</p>
          <ArrowRight />
        </div>
      </div>
    </div>
  );
}
