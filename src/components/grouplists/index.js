import React, { useEffect, useState } from "react";
import "./style.css";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useSelector } from "react-redux";
import Alert from "@mui/material/Alert";

const Grouplist = () => {
  const [open, setOpen] = React.useState(false);
  const user = useSelector((users) => users.login.loggedIn);
  const [randmgrp, setRandmgrp] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [groupname, setGroupname] = useState("");
  const [groutag, setGrouptag] = useState("");
  const db = getDatabase();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleCreate = () => {
    set(push(ref(db, "groups")), {
      groupname: groupname,
      grouptag: groutag,
      adminname: user.displayName,
      adminid: user.uid,
    }).then(() => {
      setOpen(false);
    });
  };

  const handleJoingrp = (item) => {
    set(push(ref(db, "groupjoinrequest")), {
      groupid: item.id,
      groupname: item.groupname,
      grouptag: item.grouptag,
      adminid: item.adminid,
      adminname: item.adminname,
      userid: user.uid,
      username: user.displayName,
    });
  };

  useEffect(() => {
    const starCountRef = ref(db, "groups");
    onValue(starCountRef, (snapshot) => {
      let groupArr = [];
      snapshot.forEach((item) => {
        if (user.uid != item.val().adminid) {
          groupArr.push({ ...item.val(), id: item.key });
        }
      });
      setRandmgrp(groupArr);
    });
  }, []);
  return (
    <div className="grouplist">
      <div className="grouplist_header">
        <h4>Group Lists</h4>
        <div className="groups_creation">
          <Button variant="contain" onClick={handleOpen}>
            Create Group
          </Button>
        </div>
      </div>
      {randmgrp.length == 0 ? (
        <Alert margin severity="error">
          No groups created yet
        </Alert>
      ) : (
        randmgrp.map((item) => (
          <div className="group-item-wrapper">
            <div className="group-images"></div>
            <div className="groups-name">
              <span>Admin: {item.adminname}</span>
              <h5>{item.groupname}</h5>
              <span>{item.grouptag}</span>
            </div>
            <div className="groups-list-btn">
              <button onClick={() => handleJoingrp(item)} type="button">
                Join
              </button>
            </div>
          </div>
        ))
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create New Group
          </Typography>
          <TextField
            margin="normal"
            id="outlined-basic"
            label="Group Name"
            variant="outlined"
            onChange={(e) => setGroupname(e.target.value)}
            fullWidth
          />
          <TextField
            margin="normal"
            id="outlined-basic"
            label="Group Tagline"
            variant="outlined"
            onChange={(e) => setGrouptag(e.target.value)}
            fullWidth
          />
          <Button
            className="create_button"
            variant="contain"
            onClick={handleCreate}
          >
            Create Your Group
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Grouplist;
