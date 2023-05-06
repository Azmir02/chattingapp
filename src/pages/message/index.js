import React from "react";
import "./style.css";
import { Grid } from "@mui/material";
import Msggrp from "../../components/msggrp";
import Friends from "../../components/friends";
import Chatting from "../../components/chatting";
const Message = () => {
  return (
    <>
      <div>
        <Grid container justifyContent="space-between" marginTop={2}>
          <Grid item xs={4} className="msg_items">
            <Msggrp />
            <Friends />
          </Grid>
          <Grid item xs={7}>
            <Chatting />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Message;
