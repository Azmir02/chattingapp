import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import { FaComment } from "react-icons/fa";
import { RxGear } from "react-icons/rx";
import { Link, NavLink } from "react-router-dom";

const Sidebaricons = () => {
  return (
    <div className="icons">
      <NavLink className="sidebar_icon" to="/">
        <AiOutlineHome />
      </NavLink>
      <NavLink className="sidebar_icon" to="/message">
        <FaComment />
      </NavLink>
      <div className="sidebar_icon">
        <IoMdNotifications />
      </div>
      <div className="sidebar_icon">
        <RxGear />
      </div>
    </div>
  );
};

export default Sidebaricons;
