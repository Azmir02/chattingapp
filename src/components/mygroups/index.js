import React, { useEffect, useState } from "react";
import "./style.css";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { useSelector } from "react-redux";
import Alert from "@mui/material/Alert";

const Mygroups = () => {
  const [mygrplist, setMygrplist] = useState([]);
  const [grpreqlist, setGrpreqlist] = useState([]);
  const [grpmmbr, setGrpmmbr] = useState([]);
  const [show, setShow] = useState(false);
  const [member, setMember] = useState(false);
  const user = useSelector((users) => users.login.loggedIn);
  const db = getDatabase();

  useEffect(() => {
    const starCountRef = ref(db, "groups");
    onValue(starCountRef, (snapshot) => {
      let groupArr = [];
      snapshot.forEach((item) => {
        if (user.uid == item.val().adminid) {
          groupArr.push({ ...item.val(), id: item.key });
        }
      });
      setMygrplist(groupArr);
    });
  }, []);

  console.log(mygrplist);

  const handleReqShow = (gitem) => {
    setShow(true);
    const starCountRef = ref(db, "groupjoinrequest");
    onValue(starCountRef, (snapshot) => {
      let groupreqArr = [];
      snapshot.forEach((item) => {
        if (user.uid == item.val().adminid && item.val().groupid == gitem.id) {
          groupreqArr.push({ ...item.val(), id: item.key });
        }
      });
      setGrpreqlist(groupreqArr);
    });
  };

  const handleAccept = (item) => {
    set(push(ref(db, "groupmembers")), {
      adminid: item.adminid,
      groupid: item.groupid,
      userid: item.userid,
      adminname: item.adminname,
      username: item.username,
      groupname: item.groupname,
    }).then(() => {
      remove(ref(db, "groupjoinrequest/" + item.id));
    });
  };

  const handleMembershow = (grpmember) => {
    console.log(grpmember);
    setMember(true);
    const starCountRef = ref(db, "groupmembers");
    onValue(starCountRef, (snapshot) => {
      let mmbrArr = [];
      snapshot.forEach((item) => {
        if (
          user.uid == grpmember.adminid &&
          grpmember.id == item.val().groupid
        ) {
          mmbrArr.push({ ...item.val(), id: item.key });
        }
      });
      setGrpmmbr(mmbrArr);
    });
  };
  return (
    <>
      <div className="my-groups">
        <div className="mygroups_header">
          <h4>My Groups</h4>
        </div>
        {show && (
          <button onClick={() => setShow(false)} type="button">
            Go back
          </button>
        )}
        {member && (
          <button onClick={() => setMember(false)} type="button">
            Go back
          </button>
        )}
        {mygrplist.length == 0 ? (
          <Alert margin severity="error">
            No groups created yet
          </Alert>
        ) : show ? (
          grpreqlist.length == 0 ? (
            <Alert margin severity="error">
              No Request Show
            </Alert>
          ) : (
            grpreqlist.map((item, i) => (
              <div className="mygrp_wrapper" key={i}>
                <div className="mygrp_image"></div>
                <div className="mygrp_name">
                  <h4>{item.username}</h4>
                </div>
                <div className="mygrp_btn">
                  <button type="button">Reject</button>
                  <button type="button" onClick={() => handleAccept(item)}>
                    Accept
                  </button>
                </div>
              </div>
            ))
          )
        ) : member ? (
          grpmmbr.map((item, i) => (
            <div className="mygrp_wrapper" key={i}>
              <div className="mygrp_image"></div>
              <div className="mygrp_name">
                <h4>{item.username}</h4>
              </div>
            </div>
          ))
        ) : (
          mygrplist.map((item, i) => (
            <div className="mygrp_wrapper" key={i}>
              <div className="mygrp_image"></div>
              <div className="mygrp_name">
                <span>Admin: {item.adminname}</span>
                <h4>{item.groupname}</h4>
                <span>{item.grouptag}</span>
              </div>
              <div className="mygrp_btn">
                <button type="button" onClick={() => handleMembershow(item)}>
                  Info
                </button>
                <button type="button" onClick={() => handleReqShow(item)}>
                  Reqeust
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Mygroups;
