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

const Block = () => {
  const [blockUser, setBlockUser] = useState([]);
  const user = useSelector((users) => users.login.loggedIn);
  const db = getDatabase();
  useEffect(() => {
    const starCountRef = ref(db, "block");
    onValue(starCountRef, (snapshot) => {
      let blockArr = [];
      snapshot.forEach((item) => {
        if (item.val().blockedbyid == user.uid) {
          blockArr.push({
            id: item.key,
            block: item.val().block,
            blockid: item.val().blockid,
          });
        } else {
          blockArr.push({
            id: item.key,
            blockedby: item.val().blockedby,
            blockedbyid: item.val().blockedbyid,
          });
        }
      });
      setBlockUser(blockArr);
    });
  }, []);
  const handleUnblock = (item) => {
    set(push(ref(db, "friends")), {
      sendername: item.block,
      senderid: item.blockid,
      reciverid: user.uid,
      recivername: user.displayName,
    }).then(() => {
      remove(ref(db, "block/" + item.id));
    });
  };
  return (
    <>
      <div className="block">
        <div className="block_header">
          <h4>Block</h4>
        </div>
        {blockUser.map((item, i) => (
          <div className="blocked_wrapper" key={i}>
            <div className="blocked_image"></div>
            <div className="blocked_name">
              <h4>{item.block}</h4>
              <h4>{item.blockedby}</h4>
            </div>
            {!item.blockedbyid && (
              <div className="blocked_btn">
                <button type="button" onClick={() => handleUnblock(item)}>
                  Unblock
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Block;
