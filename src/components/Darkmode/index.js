import React from "react";
import "./style.css";
import Switch from "@mui/material/Switch";
import { useDispatch, useSelector } from "react-redux";
import { Thememode } from "../../features/Slice/themeSlice";

const Darkmode = () => {
  const theme = useSelector((state) => state.themeChange.DarkMode);
  const dispatch = useDispatch();
  const handleTheme = (e) => {
    if (e.target.checked) {
      dispatch(Thememode(true));
      localStorage.setItem("mode", true);
    } else {
      dispatch(Thememode(false));
      localStorage.removeItem("mode", false);
    }
  };
  return (
    <>
      <div className="themes-part">
        <Switch onChange={handleTheme} checked={theme} />
      </div>
    </>
  );
};

export default Darkmode;
