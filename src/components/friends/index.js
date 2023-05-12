import React, { useEffect, useState } from "react";
import "./style.css";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { useSelector, useDispatch } from "react-redux";
import { activeChat } from "../../features/Slice/activeSingleSlice";

const Friends = () => {
  let [frnlist, setFrndlist] = useState([]);
  const user = useSelector((users) => users.login.loggedIn);
  const dispatch = useDispatch();
  const db = getDatabase();

  useEffect(() => {
    const starCountRef = ref(db, "friends");
    onValue(starCountRef, (snapshot) => {
      let frndArr = [];
      snapshot.forEach((item) => {
        if (
          user.uid == item.val().reciverid ||
          user.uid == item.val().senderid
        ) {
          frndArr.push({ ...item.val(), id: item.key });
        }
      });
      setFrndlist(frndArr);
    });
  }, []);

  // block functionality
  const handleBlock = (item) => {
    if (user.uid == item.senderid) {
      set(push(ref(db, "block")), {
        block: item.recivername,
        blockid: item.reciverid,
        blockedby: item.sendername,
        blockedbyid: item.senderid,
      }).then(() => {
        remove(ref(db, "friends/" + item.id));
      });
    } else {
      set(push(ref(db, "block")), {
        block: item.sendername,
        blockid: item.senderid,
        blockedby: item.recivername,
        blockedbyid: item.reciverid,
      }).then(() => {
        remove(ref(db, "friends/" + item.id));
      });
    }
  };

  // activesinglefrnds
  const handleActiveSingle = (item) => {
    if (item.reciverid == user.uid) {
      dispatch(
        activeChat({
          status: "single",
          id: item.senderid,
          name: item.sendername,
        })
      );
      // localStorage.setItem("activeSingle", JSON.stringify(item));
    } else {
      dispatch(
        activeChat({
          status: "single",
          id: item.reciverid,
          name: item.recivername,
        })
      );
    }
  };

  console.log(frnlist);
  return (
    <>
      <div className="friends">
        <div className="friends_header">
          <h4>Friends</h4>
        </div>
        {frnlist.map((item, i) => (
          <div
            className="firends_wrapper"
            key={i}
            onClick={() => handleActiveSingle(item)}
          >
            <div className="friends_image"></div>
            <div className="friends_name">
              <h4>
                {user.uid == item.senderid ? item.recivername : item.sendername}
              </h4>
            </div>
            <div className="friends_btn">
              <button type="button" onClick={() => handleBlock(item)}>
                Block
              </button>
              <button type="button">Unfriend</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Friends;
