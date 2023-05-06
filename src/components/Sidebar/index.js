import React from "react";
import Sidebaricons from "./Sidebaricons";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import "./style.css";
import { Loginusers } from "../../features/Slice/LoginSlice";
import { getAuth, signOut } from "firebase/auth";
import Popup from "../Modal";

const Sidebar = () => {
  const users = useSelector((user) => user.login.loggedIn);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("users");
        dispatch(Loginusers(null));
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <div className="sidebar">
        <div className="sidebar_wrapper">
          <div className="profile_details">
            <div className="profile_picture" onClick={handleOpen}>
              <picture>
                <img src={users.photoURL} alt="" />
              </picture>
              <div className="profile_overlay">
                <AiOutlineCloudUpload />
              </div>
            </div>
            <div className="username">
              <h4>{users.displayName}</h4>
            </div>
          </div>

          <div className="others_page">
            <Sidebaricons />
          </div>
          <div className="logout" onClick={handleLogout}>
            <BiLogOut />
          </div>
        </div>
      </div>
      <Popup open={open} setOpen={setOpen} />
    </>
  );
};

export default Sidebar;
