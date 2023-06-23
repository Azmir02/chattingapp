import React from "react";
import "./style.css";
import { useSelector } from "react-redux";
import Accountforms from "./Accountforms";
import Darkmode from "../../components/Darkmode";

const Accountinfo = () => {
  const users = useSelector((user) => user.login.loggedIn);
  return (
    <div className="main-account-info">
      <div className="theme">
        <Darkmode />
      </div>
      <div className="account_info">
        <div className="account_info_box">
          <div className="profile_pictures">
            <img src={users.photoURL} loading="lazy" alt="phopto" />
          </div>
          <div className="account-form-box">
            <Accountforms />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accountinfo;
