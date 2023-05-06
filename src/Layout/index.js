import React from "react";
import Grid from "@mui/material/Grid";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Rootlayout = () => {
  return (
    <div>
      <Grid container>
        <Grid item xs={1}>
          <Sidebar />
        </Grid>
        <Grid item xs={11}>
          <Outlet />
        </Grid>
      </Grid>
    </div>
  );
};

export default Rootlayout;
