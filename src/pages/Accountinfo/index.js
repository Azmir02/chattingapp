import React from "react";
import "./style.css";
import { useSelector } from "react-redux";
import Accountforms from "./Accountforms";

const Accountinfo = () => {
  const users = useSelector((user) => user.login.loggedIn);
  return (
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
  );
};

export default Accountinfo;
