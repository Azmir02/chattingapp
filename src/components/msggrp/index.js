import React, { useEffect, useState } from "react";
import "./style.css";
import { getDatabase, onValue, ref } from "firebase/database";
import { useDispatch } from "react-redux";
import { activeChat } from "../../features/Slice/activeSingleSlice";

const Msggrp = () => {
  const [msgGrp, setMsgGrp] = useState([]);
  const dispatch = useDispatch();
  const db = getDatabase();
  useEffect(() => {
    const starCountRef = ref(db, "groups");
    onValue(starCountRef, (snapshot) => {
      let grpArr = [];
      snapshot.forEach((item) => {
        grpArr.push({ ...item.val(), id: item.key });
      });
      setMsgGrp(grpArr);
    });
  }, []);
  console.log(msgGrp);

  // active grp chat
  const handleActiveGroup = (item) => {
    dispatch(
      activeChat({
        status: "group",
        id: item.id,
        name: item.groupname,
        adminid: item.adminid,
      })
    );
  };
  return (
    <>
      <div className="msggrps">
        <div className="msggrps_header">
          <h4>All Groups</h4>
        </div>
        {msgGrp.map((item, i) => (
          <div
            className="msggrps_wrapper"
            key={i}
            onClick={() => handleActiveGroup(item)}
          >
            <div className="msggrps_image"></div>
            <div className="msggrps_name">
              <h4>{item.groupname}</h4>
              <p>{item.grouptag}</p>
            </div>
            <button type="button">Message</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Msggrp;
