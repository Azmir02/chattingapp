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
import { useSelector } from "react-redux";

const Friendrequest = () => {
  const user = useSelector((users) => users.login.loggedIn);
  const [frndreq, setFrndreq] = useState([]);
  const db = getDatabase();
  // Show friendrequest
  useEffect(() => {
    const starCountRef = ref(db, "friendrequest");
    onValue(starCountRef, (snapshot) => {
      let reqArr = [];
      snapshot.forEach((item) => {
        if (item.val().reciverid == user.uid) {
          reqArr.push({ ...item.val(), id: item.key });
        }
      });
      setFrndreq(reqArr);
    });
  }, []);

  // acceptrequest
  const handleAccept = (data) => {
    set(push(ref(db, "friends")), {
      ...data,
    }).then(() => {
      remove(ref(db, "friendrequest/" + data.id));
    });
  };
  return (
    <>
      <div className="friendrequest">
        <div className="friendrequest_header">
          <h4>Friend request</h4>
        </div>
        {frndreq.map((item, i) => (
          <div className="friendrequest_wrapper" key={i}>
            <div className="friendreq_image"></div>
            <div className="friendreq_name">
              <h4>{item.sendername}</h4>
            </div>
            <div className="friendreq_btn">
              <button type="button" onClick={() => handleAccept(item)}>
                Accept
              </button>
              <button type="button">Reject</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Friendrequest;
